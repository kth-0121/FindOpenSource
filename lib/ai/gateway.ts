import { buildSystemPrompt } from "./prompt";

/**
 * Minimal client for the FindOSS AI query-understanding gateway. The app
 * only ever talks to ONE endpoint (AI_QUERY_ENDPOINT) -- an OpenAI-compatible
 * `/v1/chat/completions` endpoint (see docs/ai-search.md). This is the
 * standard interface virtually every LLM gateway (OmniRoute, OpenRouter,
 * LiteLLM, ...) already speaks, so FindOSS never needs a purpose-built
 * wrapper service -- just point AI_QUERY_ENDPOINT + AI_QUERY_MODEL at one.
 * This module never sees a provider name or upstream API key: only
 * AI_QUERY_ENDPOINT, AI_QUERY_MODEL, an optional bearer token via
 * AI_QUERY_ENDPOINT_TOKEN, and a request timeout.
 */

export interface GatewayRequest {
  query: string;
  locale: string;
}

const DEFAULT_TIMEOUT_MS = 1500;

export function getTimeoutMs(): number {
  const raw = process.env.AI_QUERY_TIMEOUT_MS;
  const parsed = raw ? Number(raw) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_TIMEOUT_MS;
}

export function isAIQueryEnabled(): boolean {
  return (
    process.env.AI_QUERY_ENABLED === "true" &&
    Boolean(process.env.AI_QUERY_ENDPOINT) &&
    Boolean(process.env.AI_QUERY_MODEL)
  );
}

/**
 * Best-effort extraction of a JSON object from a chat completion's text
 * content -- models occasionally wrap JSON in a markdown code fence despite
 * being told not to.
 */
function extractJson(content: string): unknown | null {
  const fenced = content.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced ? fenced[1] : content;
  try {
    return JSON.parse(candidate.trim());
  } catch {
    return null;
  }
}

/**
 * `message.content` is a plain string on most OpenAI-compatible gateways,
 * but some (e.g. OmniRoute routing through certain models) return content
 * blocks instead: `[{type: "text", text: "..."}, ...]`. Normalize both to
 * a single string.
 */
function extractContentText(content: unknown): string | null {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    const text = content
      .filter((block): block is { type: string; text: string } => typeof block?.text === "string")
      .map((block) => block.text)
      .join("");
    return text || null;
  }
  return null;
}

/**
 * Calls AI_QUERY_ENDPOINT (an OpenAI-compatible chat completions endpoint)
 * with the query-understanding system prompt, and returns the parsed JSON
 * object from the model's response content, or null on any failure
 * (network error, non-2xx, timeout, non-JSON content). Never throws --
 * callers always have a keyword-search fallback available and should never
 * need a try/catch around this.
 */
export async function callGateway(request: GatewayRequest): Promise<unknown | null> {
  const endpoint = process.env.AI_QUERY_ENDPOINT;
  const model = process.env.AI_QUERY_MODEL;
  if (!endpoint || !model) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), getTimeoutMs());

  try {
    const token = process.env.AI_QUERY_ENDPOINT_TOKEN;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        model,
        temperature: 0,
        // Generous headroom: some gateway-routed models emit hidden
        // reasoning tokens that count against this budget before the
        // actual JSON content, even though callers never see the reasoning.
        max_tokens: 4096,
        messages: [
          { role: "system", content: buildSystemPrompt() },
          { role: "user", content: `Locale: ${request.locale}\nQuery: ${request.query}` },
        ],
      }),
      signal: controller.signal,
    });

    if (!response.ok) return null;
    const body = await response.json();
    const content = extractContentText(body?.choices?.[0]?.message?.content);
    if (!content) return null;

    return extractJson(content);
  } catch {
    // Network error, abort/timeout, or invalid JSON -- all treated the same:
    // no AI result this time, caller falls back to keyword search.
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

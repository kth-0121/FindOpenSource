/** Replaces `{placeholder}` tokens in a dictionary template string with values. */
export function formatMessage(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

/** Picks the singular/plural template based on count, then formats it. */
export function formatCount(
  count: number,
  templates: { one: string; other: string },
  values: Record<string, string | number> = {},
): string {
  const template = count === 1 ? templates.one : templates.other;
  return formatMessage(template, { count, ...values });
}

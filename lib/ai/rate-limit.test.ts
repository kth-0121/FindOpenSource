import assert from "node:assert/strict";
import { test } from "node:test";
import { isRateLimited } from "./rate-limit";

test("allows requests under the limit", () => {
  const key = `rl-under-${Math.random()}`;
  for (let i = 0; i < 20; i++) {
    assert.equal(isRateLimited(key), false);
  }
});

test("blocks requests once the window limit is exceeded", () => {
  const key = `rl-over-${Math.random()}`;
  for (let i = 0; i < 20; i++) isRateLimited(key);
  assert.equal(isRateLimited(key), true);
});

test("different keys have independent windows", () => {
  const a = `rl-a-${Math.random()}`;
  const b = `rl-b-${Math.random()}`;
  for (let i = 0; i < 20; i++) isRateLimited(a);
  assert.equal(isRateLimited(a), true);
  assert.equal(isRateLimited(b), false);
});

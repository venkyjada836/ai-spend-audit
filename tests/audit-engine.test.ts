import { describe, expect, test } from "vitest";

import { generateAudit } from "../lib/audit-engine";

describe("generateAudit", () => {
  test("returns savings for ChatGPT downgrade", () => {
    const result = generateAudit({
      tool: "chatgpt",
      monthlySpend: 40,
      seats: 2,
    });

    expect(result.savings).toBe(20);
  });

  test("returns savings for Cursor downgrade", () => {
    const result = generateAudit({
      tool: "cursor",
      monthlySpend: 100,
      seats: 2,
    });

    expect(result.savings).toBe(80);
  });

  test("returns optimized message when no savings", () => {
    const result = generateAudit({
      tool: "chatgpt",
      monthlySpend: 20,
      seats: 5,
    });

    expect(result.savings).toBe(0);
  });
});
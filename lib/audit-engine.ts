type AuditInput = {
  tool: string;
  monthlySpend: number;
  seats: number;
};

export function generateAudit(data: AuditInput) {
  let recommendation = "Your current setup looks optimized.";
  let savings = 0;

  // ChatGPT logic
  if (data.tool === "chatgpt") {
    if (data.seats <= 2 && data.monthlySpend > 20) {
      recommendation =
        "Downgrade to ChatGPT Plus for small teams.";

      savings = data.monthlySpend - 20;
    }
  }

  // Cursor logic
  else if (data.tool === "cursor") {
    if (data.seats <= 3 && data.monthlySpend > 20) {
      recommendation =
        "Switch from Cursor Business to Cursor Pro.";

      savings = data.monthlySpend - 20;
    }
  }

  // Copilot logic
  else if (data.tool === "copilot") {
    if (data.seats <= 2 && data.monthlySpend > 10) {
      recommendation =
        "Use GitHub Copilot Individual instead of Business.";

      savings = data.monthlySpend - 10;
    }
  }

  // Claude logic
  else if (data.tool === "claude") {
    if (data.monthlySpend > 100) {
      recommendation =
        "Consider Anthropic credits or Claude Pro for lower usage teams.";

      savings = Math.floor(data.monthlySpend * 0.25);
    }
  }

  // Gemini logic
  else if (data.tool === "gemini") {
    if (data.monthlySpend > 30) {
      recommendation =
        "Gemini Pro may cover your current workload.";

      savings = data.monthlySpend - 30;
    }
  }

  return {
    recommendation,
    savings: savings > 0 ? savings : 0,
  };
}
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { generateAudit } from "@/lib/audit-engine";
import { supabase } from "@/lib/supabase";

export default function AuditPage() {
  const router = useRouter();

  const [tool, setTool] = useState("");
  const [monthlySpend, setMonthlySpend] = useState("");
  const [seats, setSeats] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [useCase, setUseCase] = useState("");

  const [summary, setSummary] = useState("");

  const [result, setResult] = useState<{
    recommendation: string;
    savings: number;
  } | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("audit-form");

    if (savedData) {
      const parsed = JSON.parse(savedData);

      setTool(parsed.tool || "");
      setMonthlySpend(parsed.monthlySpend || "");
      setSeats(parsed.seats || "");
      setTeamSize(parsed.teamSize || "");
      setUseCase(parsed.useCase || "");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "audit-form",
      JSON.stringify({
        tool,
        monthlySpend,
        seats,
        teamSize,
        useCase,
      })
    );
  }, [tool, monthlySpend, seats, teamSize, useCase]);

  async function handleAudit() {
    const audit = generateAudit({
      tool,
      monthlySpend: Number(monthlySpend),
      seats: Number(seats),
    });

    setResult(audit);

    const { data } = await supabase
      .from("audits")
      .insert([
        {
          tool,
          monthly_spend: Number(monthlySpend),
          seats: Number(seats),
          savings: audit.savings,
          recommendation: audit.recommendation,
        },
      ])
      .select()
      .single();

    try {
      const generatedSummary = `
Your team could save approximately $${audit.savings} per month by optimizing your ${tool} usage.

Based on your current spend and seat count, we identified opportunities to reduce unnecessary costs while maintaining similar productivity and AI capabilities.

Recommended action: ${audit.recommendation}
      `;

      setSummary(generatedSummary);
    } catch (error) {
      setSummary(
        "We analyzed your AI stack and found optimization opportunities that could reduce your monthly AI spending."
      );
    }

    if (data?.id) {
      router.push(`/results/${data.id}`);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-2xl bg-zinc-950 border-zinc-700 text-white">
        <CardContent className="p-8 space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-3 text-white">
              AI Spend Audit
            </h1>

            <p className="text-zinc-300 text-lg">
              Discover unnecessary AI spending and optimize your AI stack.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-sm mb-2 block text-zinc-200">
                AI Tool
              </label>

              <Select onValueChange={setTool} value={tool}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tool" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="chatgpt">
                    ChatGPT
                  </SelectItem>

                  <SelectItem value="claude">
                    Claude
                  </SelectItem>

                  <SelectItem value="cursor">
                    Cursor
                  </SelectItem>

                  <SelectItem value="copilot">
                    GitHub Copilot
                  </SelectItem>

                  <SelectItem value="gemini">
                    Gemini
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm mb-2 block text-zinc-200">
                Monthly Spend ($)
              </label>

              <Input
                type="number"
                placeholder="200"
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm mb-2 block text-zinc-200">
                Number of Seats
              </label>

              <Input
                type="number"
                placeholder="5"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm mb-2 block text-zinc-200">
                Team Size
              </label>

              <Input
                type="number"
                placeholder="10"
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm mb-2 block text-zinc-200">
                Primary Use Case
              </label>

              <Select onValueChange={setUseCase} value={useCase}>
                <SelectTrigger>
                  <SelectValue placeholder="Select use case" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="coding">
                    Coding
                  </SelectItem>

                  <SelectItem value="writing">
                    Writing
                  </SelectItem>

                  <SelectItem value="research">
                    Research
                  </SelectItem>

                  <SelectItem value="data">
                    Data Analysis
                  </SelectItem>

                  <SelectItem value="mixed">
                    Mixed Usage
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full text-lg py-6"
              onClick={handleAudit}
            >
              Generate Audit
            </Button>
          </div>

          {result && (
            <div className="bg-zinc-900 rounded-xl p-6 mt-6 space-y-4 border border-zinc-700">
              <h2 className="text-3xl font-bold text-white">
                Audit Result
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black rounded-lg p-4 border border-zinc-800">
                  <p className="text-zinc-400 text-sm">
                    Monthly Savings
                  </p>

                  <h3 className="text-4xl font-bold text-green-400 mt-2">
                    ${result.savings}
                  </h3>
                </div>

                <div className="bg-black rounded-lg p-4 border border-zinc-800">
                  <p className="text-zinc-400 text-sm">
                    Annual Savings
                  </p>

                  <h3 className="text-4xl font-bold text-green-400 mt-2">
                    ${result.savings * 12}
                  </h3>
                </div>
              </div>

              <div className="bg-black rounded-lg p-4 border border-zinc-800">
                <p className="text-zinc-400 text-sm mb-2">
                  Recommendation
                </p>

                <p className="font-semibold text-lg text-white">
                  {result.recommendation}
                </p>
              </div>

              <div className="bg-black rounded-lg p-4 border border-zinc-800">
                <p className="text-zinc-400 text-sm mb-2">
                  AI Summary
                </p>

                <p className="text-zinc-200 leading-7 whitespace-pre-line">
                  {summary}
                </p>
              </div>

              {result.savings > 100 && (
                <div className="bg-green-500/10 border border-green-500 rounded-lg p-4">
                  <p className="text-green-400 font-medium">
                    You may qualify for additional savings through Credex AI credits.
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
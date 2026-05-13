"use client";

import { useState } from "react";

import { supabase } from "@/lib/supabase";

type Props = {
  params: {
    id: string;
  };
};

export default function ResultPage({ params }: Props) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleLeadSubmit() {
    await supabase.from("leads").insert([
      {
        email,
        company,
        role,
      },
    ]);

    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-700 rounded-2xl p-8 space-y-6">
        <h1 className="text-4xl font-bold">
          Shared Audit Result
        </h1>

        <div className="bg-black rounded-xl p-6 border border-zinc-800">
          <p className="text-zinc-400 text-sm">
            Audit ID
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {params.id}
          </h2>
        </div>

        <div className="bg-black rounded-xl p-6 border border-zinc-800 space-y-4">
          <h2 className="text-2xl font-bold">
            Get Full Optimization Report
          </h2>

          <input
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3"
            placeholder="Work Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <input
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <button
            onClick={handleLeadSubmit}
            className="w-full bg-white text-black rounded-lg p-3 font-semibold"
          >
            Unlock Full Report
          </button>

          {submitted && (
            <div className="bg-green-500/10 border border-green-500 rounded-lg p-4">
              <p className="text-green-400">
                Report request submitted successfully.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
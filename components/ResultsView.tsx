"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ALL_QUESTIONS } from "@/content/questions";
import { scoreDiagnostic, studyPlan, type DomainScore } from "@/lib/scoring";
import { loadDiagnostic } from "@/lib/storage";

function bandColor(band: DomainScore["band"]) {
  if (band === "weak") return "bg-rose-100 text-rose-800 border-rose-200";
  if (band === "ok") return "bg-amber-100 text-amber-900 border-amber-200";
  return "bg-emerald-100 text-emerald-800 border-emerald-200";
}

export function ResultsView() {
  const [ready, setReady] = useState(false);
  const [missing, setMissing] = useState(false);
  const [overall, setOverall] = useState(0);
  const [overallCorrect, setOverallCorrect] = useState(0);
  const [overallTotal, setOverallTotal] = useState(0);
  const [domains, setDomains] = useState<DomainScore[]>([]);
  const [plan, setPlan] = useState<DomainScore[]>([]);

  const byId = useMemo(() => new Map(ALL_QUESTIONS.map((q) => [q.id, q])), []);

  useEffect(() => {
    const state = loadDiagnostic();
    if (!state || !state.completedAt) {
      setMissing(true);
      setReady(true);
      return;
    }
    const scored = scoreDiagnostic(state.answers, byId);
    setOverall(scored.overall);
    setOverallCorrect(scored.overallCorrect);
    setOverallTotal(scored.overallTotal);
    setDomains(scored.domains);
    setPlan(studyPlan(scored.domains));
    setReady(true);
  }, [byId]);

  if (!ready) return <p className="p-8 text-slate-600">Scoring…</p>;

  if (missing) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">No completed diagnostic found</h1>
        <p className="mt-2 text-slate-600">Start the free 100-question diagnostic first.</p>
        <Link
          href="/diagnostic"
          className="mt-6 inline-block rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white"
        >
          Start diagnostic
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900">Diagnostic results</h1>
      <p className="mt-2 text-slate-600">
        Overall: <span className="font-semibold text-slate-900">{overall}%</span> ({overallCorrect}/
        {overallTotal}). Not affiliated with PTCB.
      </p>

      <div className="mt-8 space-y-3">
        {domains.map((d) => (
          <div key={d.domain} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-semibold text-slate-900">{d.label}</h2>
                <p className="text-sm text-slate-600">
                  {d.correct}/{d.total} correct · blueprint weight {d.weight}%
                </p>
              </div>
              <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase ${bandColor(d.band)}`}>
                {d.band} · {d.percent}%
              </span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-brand-600" style={{ width: `${d.percent}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold">Study plan (weight × weakness)</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          {plan.map((d, i) => (
            <li key={d.domain}>
              <span className="font-semibold">{d.label}</span>
              {i === 0 ? " (top priority)" : ""}: {d.percent}% now · weight {d.weight}%
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 rounded-xl bg-brand-900 p-6 text-white">
        <h2 className="text-xl font-bold">Unlock full PassPTCE</h2>
        <p className="mt-2 text-brand-100">
          Weak-area drills, browse by domain, and mock mode with paid-only extras. $129 / 90 days or
          $39/mo.
        </p>
        <Link
          href="/pricing"
          className="mt-4 inline-block rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand-900"
        >
          Unlock study access
        </Link>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ALL_QUESTIONS,
  getPaidQuestions,
  getQuestionsByDomain,
} from "@/content/questions";
import type { DomainId, Question } from "@/content/questions/types";
import { DOMAIN_LABELS } from "@/content/questions/types";
import { isUnlockedClient, setUnlockedClient } from "@/lib/access";
import { loadDiagnostic } from "@/lib/storage";
import { scoreDiagnostic, studyPlan } from "@/lib/scoring";

type Mode = "weak" | "browse" | "mock";

export function StudyShell() {
  const params = useSearchParams();
  const [unlocked, setUnlocked] = useState(false);
  const [mode, setMode] = useState<Mode>("weak");
  const [domain, setDomain] = useState<DomainId>("medications");
  const [queue, setQueue] = useState<Question[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [weakDomain, setWeakDomain] = useState<DomainId | null>(null);

  useEffect(() => {
    setUnlocked(isUnlockedClient() || params.get("demo") === "1");
    const state = loadDiagnostic();
    if (state?.completedAt) {
      const byId = new Map(ALL_QUESTIONS.map((q) => [q.id, q]));
      const scored = scoreDiagnostic(state.answers, byId);
      const plan = studyPlan(scored.domains);
      if (plan[0]) setWeakDomain(plan[0].domain);
    }
  }, [params]);

  const pool = useMemo(() => {
    if (mode === "browse") {
      return getQuestionsByDomain(domain, { includePaid: true });
    }
    if (mode === "mock") {
      return [...getPaidQuestions()].sort(() => Math.random() - 0.5).slice(0, 25);
    }
    const d = weakDomain || "medications";
    return getQuestionsByDomain(d, { includePaid: true });
  }, [mode, domain, weakDomain]);

  useEffect(() => {
    setQueue(pool);
    setIdx(0);
    setSelected(null);
    setRevealed(false);
  }, [pool]);

  if (!unlocked) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Study area is locked</h1>
        <p className="mt-2 text-slate-600">
          Complete the free diagnostic, then unlock on the pricing page. For MVP testing, use demo
          unlock or <code>?demo=1</code>.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/pricing" className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white">
            Go to pricing
          </Link>
          <button
            type="button"
            onClick={() => {
              setUnlockedClient(true);
              setUnlocked(true);
            }}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm"
          >
            Demo unlock
          </button>
        </div>
      </div>
    );
  }

  const q = queue[idx];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Study</h1>
        <button
          type="button"
          onClick={() => {
            setUnlockedClient(false);
            setUnlocked(false);
          }}
          className="text-xs text-slate-500 underline"
        >
          Lock again
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {(
          [
            ["weak", "Weak-area quiz"],
            ["browse", "Browse by domain"],
            ["mock", "Mock mode (25)"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setMode(id)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium ${
              mode === id ? "bg-brand-700 text-white" : "bg-white border border-slate-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === "browse" && (
        <div className="mt-3 flex flex-wrap gap-2">
          {(Object.keys(DOMAIN_LABELS) as DomainId[]).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDomain(d)}
              className={`rounded px-2 py-1 text-xs ${
                domain === d ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
              }`}
            >
              {DOMAIN_LABELS[d]}
            </button>
          ))}
        </div>
      )}

      {mode === "weak" && (
        <p className="mt-3 text-sm text-slate-600">
          Focusing on: {DOMAIN_LABELS[weakDomain || "medications"]}
          {!weakDomain && " (complete a diagnostic for personalized weak-area targeting)"}
        </p>
      )}

      {!q ? (
        <p className="mt-8 text-slate-600">No questions in this pool.</p>
      ) : (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-medium uppercase text-slate-500">
            {idx + 1}/{queue.length} · {DOMAIN_LABELS[q.domain]}
            {q.paidOnly ? " · paid" : ""}
          </p>
          <h2 className="mt-2 text-lg font-semibold">{q.stem}</h2>
          <ul className="mt-4 space-y-2">
            {q.choices.map((c, i) => {
              let cls = "border-slate-200";
              if (revealed && i === q.correctIndex) cls = "border-emerald-500 bg-emerald-50";
              else if (revealed && selected === i && i !== q.correctIndex)
                cls = "border-rose-400 bg-rose-50";
              else if (selected === i) cls = "border-brand-500 bg-brand-50";
              return (
                <li key={i}>
                  <button
                    type="button"
                    disabled={revealed}
                    onClick={() => setSelected(i)}
                    className={`w-full rounded-lg border px-3 py-2 text-left text-sm ${cls}`}
                  >
                    {String.fromCharCode(65 + i)}. {c}
                  </button>
                </li>
              );
            })}
          </ul>
          {revealed && (
            <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
              <span className="font-semibold">Rationale: </span>
              {q.rationale}
            </p>
          )}
          <div className="mt-4 flex gap-2">
            {!revealed ? (
              <button
                type="button"
                disabled={selected === null}
                onClick={() => setRevealed(true)}
                className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
              >
                Check
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIdx((i) => Math.min(queue.length - 1, i + 1));
                  setSelected(null);
                  setRevealed(false);
                }}
                className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white"
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
      <p className="mt-6 text-xs text-slate-500">PassPTCE is not affiliated with PTCB. Original items only.</p>
    </div>
  );
}

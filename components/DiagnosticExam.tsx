"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Question } from "@/content/questions/types";
import { DIAGNOSTIC_TIME_MINUTES, DOMAIN_LABELS } from "@/content/questions/types";
import {
  clearDiagnostic,
  loadDiagnostic,
  saveDiagnostic,
  type DiagnosticState,
} from "@/lib/storage";

type Props = { questions: Question[] };

export function DiagnosticExam({ questions }: Props) {
  const router = useRouter();
  const byId = useMemo(() => new Map(questions.map((q) => [q.id, q])), [questions]);
  const [state, setState] = useState<DiagnosticState | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const existing = loadDiagnostic();
    if (existing && existing.questionIds.length === questions.length) {
      setState(existing);
      return;
    }
    const fresh: DiagnosticState = {
      questionIds: questions.map((q) => q.id),
      answers: questions.map((q) => ({
        questionId: q.id,
        choiceIndex: null,
        domain: q.domain,
      })),
      currentIndex: 0,
      startedAt: Date.now(),
      timerEnabled: true,
      timeLimitSec: DIAGNOSTIC_TIME_MINUTES * 60,
    };
    saveDiagnostic(fresh);
    setState(fresh);
  }, [questions]);

  useEffect(() => {
    if (!state?.timerEnabled || state.completedAt) return;
    const tick = () => {
      const elapsed = Math.floor((Date.now() - state.startedAt) / 1000);
      const left = Math.max(0, state.timeLimitSec - elapsed);
      setRemaining(left);
      if (left <= 0) {
        const done = { ...state, completedAt: Date.now() };
        saveDiagnostic(done);
        router.push("/diagnostic/results");
      }
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [state, router]);

  if (!state) {
    return <p className="p-8 text-slate-600">Loading diagnostic…</p>;
  }

  const qid = state.questionIds[state.currentIndex];
  const q = byId.get(qid)!;
  const answer = state.answers[state.currentIndex];

  function persist(next: DiagnosticState) {
    setState(next);
    saveDiagnostic(next);
  }

  function selectChoice(idx: number) {
    const answers = state!.answers.map((a, i) =>
      i === state!.currentIndex ? { ...a, choiceIndex: idx } : a
    );
    persist({ ...state!, answers });
  }

  function go(delta: number) {
    const nextIndex = Math.min(
      state!.questionIds.length - 1,
      Math.max(0, state!.currentIndex + delta)
    );
    persist({ ...state!, currentIndex: nextIndex });
  }

  function finish() {
    const done = { ...state!, completedAt: Date.now() };
    saveDiagnostic(done);
    router.push("/diagnostic/results");
  }

  function restart() {
    clearDiagnostic();
    window.location.href = "/diagnostic";
  }

  function toggleTimer() {
    persist({ ...state!, timerEnabled: !state!.timerEnabled });
  }

  const answered = state.answers.filter((a) => a.choiceIndex !== null).length;
  const mm = remaining !== null ? Math.floor(remaining / 60) : DIAGNOSTIC_TIME_MINUTES;
  const ss = remaining !== null ? remaining % 60 : 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Question {state.currentIndex + 1} of {state.questionIds.length}
          </p>
          <p className="text-xs text-slate-500">
            {DOMAIN_LABELS[q.domain]} · Answered {answered}/{state.questionIds.length}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <button
            type="button"
            onClick={toggleTimer}
            className="rounded border border-slate-300 px-2 py-1 hover:bg-slate-100"
          >
            Timer {state.timerEnabled ? "on" : "off"}
          </button>
          {state.timerEnabled && (
            <span className="font-mono tabular-nums text-slate-800">
              {String(mm).padStart(2, "0")}:{String(ss).padStart(2, "0")}
            </span>
          )}
        </div>
      </div>

      <div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full bg-brand-600 transition-all"
          style={{ width: `${((state.currentIndex + 1) / state.questionIds.length) * 100}%` }}
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-lg font-semibold text-slate-900">{q.stem}</h1>
        <ul className="mt-5 space-y-2">
          {q.choices.map((choice, idx) => {
            const selected = answer.choiceIndex === idx;
            return (
              <li key={idx}>
                <button
                  type="button"
                  onClick={() => selectChoice(idx)}
                  className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition ${
                    selected
                      ? "border-brand-600 bg-brand-50 ring-2 ring-brand-200"
                      : "border-slate-200 hover:border-brand-300 hover:bg-slate-50"
                  }`}
                >
                  <span className="mr-2 font-semibold text-slate-500">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  {choice}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={state.currentIndex === 0}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm disabled:opacity-40"
        >
          Previous
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={restart}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-600"
          >
            Restart
          </button>
          {state.currentIndex < state.questionIds.length - 1 ? (
            <button
              type="button"
              onClick={() => go(1)}
              className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={finish}
              className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Submit diagnostic
            </button>
          )}
        </div>
      </div>
      <p className="mt-4 text-xs text-slate-500">
        Progress is saved in this browser (localStorage). Not affiliated with PTCB.
      </p>
    </div>
  );
}

import type { DomainId, Question } from "./types";
import { DIAGNOSTIC_COUNTS } from "./types";
import { MEDICATIONS_QUESTIONS } from "./medications";
import { FEDERAL_QUESTIONS } from "./federal-requirements";
import { SAFETY_QUESTIONS } from "./patient-safety";
import { ORDER_QUESTIONS } from "./order-entry";

export * from "./types";

export const ALL_QUESTIONS: Question[] = [
  ...MEDICATIONS_QUESTIONS,
  ...FEDERAL_QUESTIONS,
  ...SAFETY_QUESTIONS,
  ...ORDER_QUESTIONS,
];

export function getDiagnosticPool(): Question[] {
  return ALL_QUESTIONS.filter((q) => !q.paidOnly);
}

export function getPaidQuestions(): Question[] {
  return ALL_QUESTIONS.filter((q) => q.paidOnly);
}

export function getQuestionsByDomain(domain: DomainId, opts?: { includePaid?: boolean; paidOnly?: boolean }): Question[] {
  return ALL_QUESTIONS.filter((q) => {
    if (q.domain !== domain) return false;
    if (opts?.paidOnly) return !!q.paidOnly;
    if (opts?.includePaid) return true;
    return !q.paidOnly;
  });
}

/** Build a 100-question diagnostic matching EXAM_BLUEPRINT counts (stable shuffle by seed). */
export function buildDiagnosticSet(seed = 42): Question[] {
  const pool = getDiagnosticPool();
  const result: Question[] = [];
  for (const [domain, count] of Object.entries(DIAGNOSTIC_COUNTS) as [DomainId, number][]) {
    const domainQs = pool.filter((q) => q.domain === domain);
    if (domainQs.length < count) {
      throw new Error(`Not enough diagnostic questions for ${domain}: have ${domainQs.length}, need ${count}`);
    }
    result.push(...seededShuffle(domainQs, seed + domain.length).slice(0, count));
  }
  return seededShuffle(result, seed);
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed >>> 0;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

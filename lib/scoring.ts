import type { DomainId, Question } from "@/content/questions/types";
import { DIAGNOSTIC_COUNTS, DOMAIN_LABELS } from "@/content/questions/types";
import type { DiagnosticAnswer } from "@/lib/storage";

export type Band = "weak" | "ok" | "strong";

export type DomainScore = {
  domain: DomainId;
  label: string;
  correct: number;
  total: number;
  percent: number;
  band: Band;
  weight: number;
};

export function bandForPercent(pct: number): Band {
  if (pct < 60) return "weak";
  if (pct < 80) return "ok";
  return "strong";
}

export function scoreDiagnostic(
  answers: DiagnosticAnswer[],
  questionsById: Map<string, Question>
): { overall: number; overallCorrect: number; overallTotal: number; domains: DomainScore[] } {
  const domains = (Object.keys(DIAGNOSTIC_COUNTS) as DomainId[]).map((domain) => {
    const subset = answers.filter((a) => a.domain === domain);
    let correct = 0;
    for (const a of subset) {
      const q = questionsById.get(a.questionId);
      if (q && a.choiceIndex === q.correctIndex) correct += 1;
    }
    const total = subset.length || DIAGNOSTIC_COUNTS[domain];
    const percent = total ? Math.round((correct / total) * 100) : 0;
    return {
      domain,
      label: DOMAIN_LABELS[domain],
      correct,
      total,
      percent,
      band: bandForPercent(percent),
      weight: DIAGNOSTIC_COUNTS[domain],
    };
  });

  const overallCorrect = domains.reduce((s, d) => s + d.correct, 0);
  const overallTotal = domains.reduce((s, d) => s + d.total, 0);
  const overall = overallTotal ? Math.round((overallCorrect / overallTotal) * 100) : 0;
  return { overall, overallCorrect, overallTotal, domains };
}

/** Priority = blueprint weight × weakness (100 - percent). */
export function studyPlan(domains: DomainScore[]): DomainScore[] {
  return [...domains].sort((a, b) => {
    const scoreA = a.weight * (100 - a.percent);
    const scoreB = b.weight * (100 - b.percent);
    return scoreB - scoreA;
  });
}

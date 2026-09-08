import type { DomainId } from "@/content/questions/types";

export const DIAGNOSTIC_KEY = "passptce_diagnostic_v1";

export type DiagnosticAnswer = {
  questionId: string;
  choiceIndex: number | null;
  domain: DomainId;
};

export type DiagnosticState = {
  questionIds: string[];
  answers: DiagnosticAnswer[];
  currentIndex: number;
  startedAt: number;
  timerEnabled: boolean;
  timeLimitSec: number;
  completedAt?: number;
};

export function loadDiagnostic(): DiagnosticState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(DIAGNOSTIC_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DiagnosticState;
  } catch {
    return null;
  }
}

export function saveDiagnostic(state: DiagnosticState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DIAGNOSTIC_KEY, JSON.stringify(state));
}

export function clearDiagnostic(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(DIAGNOSTIC_KEY);
}

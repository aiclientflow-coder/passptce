/** Client-side free-tier tutor message budget (localStorage). */

export const TUTOR_USAGE_KEY = "passptce_tutor_usage_v1";
export const FREE_TUTOR_MESSAGES_PER_DAY = 5;

export type TutorUsage = {
  /** YYYY-MM-DD in local time */
  day: string;
  count: number;
};

function todayLocal(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function readTutorUsage(): TutorUsage {
  if (typeof window === "undefined") return { day: todayLocal(), count: 0 };
  try {
    const raw = window.localStorage.getItem(TUTOR_USAGE_KEY);
    if (!raw) return { day: todayLocal(), count: 0 };
    const parsed = JSON.parse(raw) as TutorUsage;
    if (parsed.day !== todayLocal()) return { day: todayLocal(), count: 0 };
    return { day: parsed.day, count: Number(parsed.count) || 0 };
  } catch {
    return { day: todayLocal(), count: 0 };
  }
}

export function writeTutorUsage(usage: TutorUsage): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TUTOR_USAGE_KEY, JSON.stringify(usage));
}

export function remainingFreeMessages(): number {
  const u = readTutorUsage();
  return Math.max(0, FREE_TUTOR_MESSAGES_PER_DAY - u.count);
}

/** Returns false if free user is out of quota. Unlocked users always true. */
export function consumeTutorMessage(unlocked: boolean): { allowed: boolean; remaining: number } {
  if (unlocked) {
    return { allowed: true, remaining: Infinity };
  }
  const u = readTutorUsage();
  if (u.count >= FREE_TUTOR_MESSAGES_PER_DAY) {
    return { allowed: false, remaining: 0 };
  }
  const next = { day: u.day || todayLocal(), count: u.count + 1 };
  writeTutorUsage(next);
  return {
    allowed: true,
    remaining: Math.max(0, FREE_TUTOR_MESSAGES_PER_DAY - next.count),
  };
}

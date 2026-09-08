export const UNLOCK_KEY = "passptce_unlocked";

export function isUnlockedClient(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (new URLSearchParams(window.location.search).get("demo") === "1") {
      return true;
    }
    return window.localStorage.getItem(UNLOCK_KEY) === "1";
  } catch {
    return false;
  }
}

export function setUnlockedClient(value: boolean): void {
  if (typeof window === "undefined") return;
  if (value) window.localStorage.setItem(UNLOCK_KEY, "1");
  else window.localStorage.removeItem(UNLOCK_KEY);
}

export function stripeConfigured(): boolean {
  return Boolean(
    process.env.STRIPE_SECRET_KEY &&
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY &&
      (process.env.STRIPE_PRICE_90DAY || process.env.STRIPE_PRICE_MONTHLY)
  );
}

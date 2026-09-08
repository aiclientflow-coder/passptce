import Stripe from "stripe";

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

export type PlanId = "90day" | "monthly";

export function priceIdForPlan(plan: PlanId): string | null {
  if (plan === "90day") return process.env.STRIPE_PRICE_90DAY || null;
  return process.env.STRIPE_PRICE_MONTHLY || null;
}

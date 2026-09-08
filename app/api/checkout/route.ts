import { NextRequest, NextResponse } from "next/server";
import { getStripe, priceIdForPlan, type PlanId } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Checkout coming soon. Stripe is not configured." },
      { status: 503 }
    );
  }

  const body = (await req.json().catch(() => ({}))) as { plan?: PlanId };
  const plan: PlanId = body.plan === "monthly" ? "monthly" : "90day";
  const price = priceIdForPlan(plan);
  if (!price) {
    return NextResponse.json(
      { error: "Checkout coming soon. Price IDs missing." },
      { status: 503 }
    );
  }

  const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const session = await stripe.checkout.sessions.create({
    mode: plan === "monthly" ? "subscription" : "payment",
    line_items: [{ price, quantity: 1 }],
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/pricing`,
  });

  return NextResponse.json({ url: session.url });
}

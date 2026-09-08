"use client";

import { useState } from "react";
import { setUnlockedClient } from "@/lib/access";
import { useRouter } from "next/navigation";

type Props = { stripeReady: boolean };

export function PricingClient({ stripeReady }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function checkout(plan: "90day" | "monthly") {
    setBusy(plan);
    setMessage(null);
    try {
      if (!stripeReady) {
        setMessage("Checkout coming soon. Stripe keys are not configured on this deploy.");
        setBusy(null);
        return;
      }
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setMessage(data.error || "Checkout coming soon.");
    } catch {
      setMessage("Checkout coming soon.");
    } finally {
      setBusy(null);
    }
  }

  function demoUnlock() {
    setUnlockedClient(true);
    router.push("/study?demo=1");
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold">Pricing</h1>
      <p className="mt-2 text-slate-600">
        Free diagnostic stays free. Unlock drills, domain browse, and mock mode.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold">90-day pass</h2>
          <p className="mt-2 text-3xl font-bold">$129</p>
          <p className="mt-1 text-sm text-slate-600">Best for a focused exam window.</p>
          <button
            type="button"
            disabled={busy !== null}
            onClick={() => checkout("90day")}
            className="mt-6 w-full rounded-lg bg-brand-700 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-50"
          >
            {busy === "90day" ? "Working…" : stripeReady ? "Checkout $129" : "Checkout coming soon"}
          </button>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold">Monthly</h2>
          <p className="mt-2 text-3xl font-bold">
            $39<span className="text-base font-medium text-slate-500">/mo</span>
          </p>
          <p className="mt-1 text-sm text-slate-600">Flexible access while you study.</p>
          <button
            type="button"
            disabled={busy !== null}
            onClick={() => checkout("monthly")}
            className="mt-6 w-full rounded-lg bg-brand-700 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-50"
          >
            {busy === "monthly" ? "Working…" : stripeReady ? "Checkout $39/mo" : "Checkout coming soon"}
          </button>
        </div>
      </div>

      {message && (
        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {message}
        </p>
      )}

      <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
        <p className="font-semibold text-slate-800">MVP testing unlock</p>
        <p className="mt-1">
          Use local unlock or <code className="rounded bg-white px-1">?demo=1</code> on /study when
          Stripe is not wired.
        </p>
        <button
          type="button"
          onClick={demoUnlock}
          className="mt-3 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-100"
        >
          Unlock for this browser (demo)
        </button>
      </div>
      <p className="mt-6 text-xs text-slate-500">PassPTCE is not affiliated with PTCB.</p>
    </div>
  );
}

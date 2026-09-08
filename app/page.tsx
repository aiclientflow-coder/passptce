import Link from "next/link";
import { Disclaimer } from "@/components/Disclaimer";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="rounded-2xl bg-gradient-to-br from-brand-800 to-brand-950 px-8 py-12 text-white shadow-lg">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-200">
          PTCE prep for people who want to pass
        </p>
        <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
          Free 100-question diagnostic. Then unlock the rest.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-brand-100">
          Built around the PTCE outline effective January 6, 2026. Exact domain weights.
          Original items only. Blunt scores. A study plan that follows your weak domains.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/diagnostic"
            className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-brand-900 shadow hover:bg-brand-50"
          >
            Start free diagnostic
          </Link>
          <Link
            href="/tutor"
            className="rounded-lg border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20"
          >
            Ask the Study Tutor
          </Link>
          <Link
            href="/pricing"
            className="rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            See pricing
          </Link>
        </div>
        <p className="mt-4 text-xs text-brand-200">
          Tutor: 5 free messages/day · unlimited when unlocked · PTCE topics only
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {[
          {
            title: "Blueprint-true",
            body: "100 questions: Medications 35, Federal Requirements 19, Patient Safety 24, Order Entry 22.",
          },
          {
            title: "Pass-oriented feedback",
            body: "Domain bands (weak / ok / strong) and a study plan ranked by weight times weakness.",
          },
          {
            title: "Original bank + tutor",
            body: "No copied PTCB or commercial wording. Study Tutor retrieves original notes & rationales only.",
          },
        ].map((card) => (
          <div key={card.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-slate-900">{card.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{card.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <Disclaimer />
      </div>
    </div>
  );
}

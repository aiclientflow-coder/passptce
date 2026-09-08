"use client";

import { useEffect } from "react";
import Link from "next/link";
import { setUnlockedClient } from "@/lib/access";

export default function SuccessPage() {
  useEffect(() => {
    setUnlockedClient(true);
  }, []);

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-emerald-800">You are unlocked</h1>
      <p className="mt-3 text-slate-600">
        Stripe success route set the local unlock flag for this MVP. Wire webhook fulfillment for
        production.
      </p>
      <Link
        href="/study"
        className="mt-6 inline-block rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white"
      >
        Go to study
      </Link>
    </div>
  );
}

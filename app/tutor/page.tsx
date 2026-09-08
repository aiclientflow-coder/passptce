import { TutorChat } from "@/components/TutorChat";
import { Disclaimer } from "@/components/Disclaimer";
import Link from "next/link";

export default function TutorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Study Tutor</h1>
        <p className="mt-2 text-sm text-slate-600">
          Pharmacy-technician PTCE topics only. Free users get 5 messages/day; unlocked or{" "}
          <Link href="/tutor?demo=1" className="text-brand-700 underline">
            demo
          </Link>{" "}
          access is unlimited.{" "}
          <span className="font-medium text-slate-800">
            Scoped to PTCE study topics. Original PassPTCE notes, not official PTCB publications.
          </span>
        </p>
      </div>
      <TutorChat variant="page" />
      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <Disclaimer />
      </div>
    </div>
  );
}

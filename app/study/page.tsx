import { Suspense } from "react";
import { StudyShell } from "@/components/StudyShell";
import { TutorChat } from "@/components/TutorChat";

export default function StudyPage() {
  return (
    <>
      <Suspense fallback={<p className="p-8 text-slate-600">Loading study…</p>}>
        <StudyShell />
      </Suspense>
      <TutorChat variant="floating" />
    </>
  );
}

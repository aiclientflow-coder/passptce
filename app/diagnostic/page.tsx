import { buildDiagnosticSet } from "@/content/questions";
import { DiagnosticExam } from "@/components/DiagnosticExam";
import { Disclaimer } from "@/components/Disclaimer";

export default function DiagnosticPage() {
  const questions = buildDiagnosticSet(2026);
  return (
    <div>
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-4">
          <h1 className="text-xl font-bold text-slate-900">Free PTCE diagnostic</h1>
          <p className="text-sm text-slate-600">
            100 questions · optional ~105 minute timer · blueprint domain mix
          </p>
          <Disclaimer className="mt-2" />
        </div>
      </div>
      <DiagnosticExam questions={questions} />
    </div>
  );
}

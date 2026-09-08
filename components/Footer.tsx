import { Disclaimer } from "@/components/Disclaimer";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-6">
        <Disclaimer />
      </div>
    </footer>
  );
}

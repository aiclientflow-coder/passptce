import Link from "next/link";

export function Nav() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-lg font-bold tracking-tight text-brand-800">
          PassPTCE
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-slate-700">
          <Link href="/diagnostic" className="hover:text-brand-700">
            Diagnostic
          </Link>
          <Link href="/study" className="hover:text-brand-700">
            Study
          </Link>
          <Link href="/pricing" className="hover:text-brand-700">
            Pricing
          </Link>
        </nav>
      </div>
    </header>
  );
}

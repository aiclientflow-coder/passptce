export function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs text-slate-500 ${className}`}>
      PassPTCE is not affiliated with PTCB. Practice items are original and for exam prep only.
      Not a guarantee of certification outcomes.
    </p>
  );
}

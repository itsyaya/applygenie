import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/dashboard" className="inline-flex items-center gap-3 text-lg font-semibold text-slate-950">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 text-white shadow-soft">
        AG
      </div>
      <span>ApplyGenie</span>
    </Link>
  );
}

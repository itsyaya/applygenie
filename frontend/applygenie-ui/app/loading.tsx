export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-16">
      <div className="flex items-center gap-3 rounded-full border border-slate-200/80 bg-white px-5 py-3 shadow-soft">
        <div className="h-3.5 w-3.5 animate-pulse rounded-full bg-indigo-500" />
        <span className="text-sm font-medium text-slate-600">Loading ApplyGenie…</span>
      </div>
    </div>
  );
}

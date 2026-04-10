import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 py-24 text-center">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-14 shadow-soft">
        <p className="text-sm uppercase tracking-[0.3em] text-indigo-500">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-950">Page not found</h1>
        <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">The page you’re looking for doesn’t exist or may have been moved. Return to the landing page and continue from there.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
          Back to home
        </Link>
      </div>
    </div>
  );
}

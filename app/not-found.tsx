import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center gap-4 px-6 py-12">
      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Not found</p>
      <h1 className="text-3xl font-bold">This route does not exist.</h1>
      <Link href="/" className="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">
        Return home
      </Link>
    </main>
  );
}

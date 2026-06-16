import type { ReactNode } from "react";

type ScreenShellProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function ScreenShell({ title, description, children }: ScreenShellProps) {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{title}</h1>
        {description ? <p className="text-slate-600">{description}</p> : null}
      </header>
      {children}
    </main>
  );
}

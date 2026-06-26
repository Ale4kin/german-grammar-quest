import type { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value?: ReactNode;
  children?: ReactNode;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
};

export function StatCard({
  label,
  value,
  children,
  className,
  labelClassName,
  valueClassName,
}: StatCardProps) {
  return (
    <div className={["quest-stat-card", className].filter(Boolean).join(" ")}>
      <p className={["text-sm text-slate-500", labelClassName].filter(Boolean).join(" ")}>
        {label}
      </p>
      {value !== undefined ? (
        <p
          className={["mt-1 text-3xl font-black text-slate-800", valueClassName]
            .filter(Boolean)
            .join(" ")}
        >
          {value}
        </p>
      ) : null}
      {children}
    </div>
  );
}

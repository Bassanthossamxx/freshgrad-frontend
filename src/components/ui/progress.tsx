import { cn } from "@/lib/utils";

type ProgressProps = { value: number; className?: string; label?: string };

/** Simple accessible progress bar (0–100). Used for readiness scores. */
export function Progress({ value, className, label }: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("bg-muted h-2 w-full overflow-hidden rounded-full", className)}
    >
      <div className="bg-primary h-full transition-all" style={{ width: `${clamped}%` }} />
    </div>
  );
}

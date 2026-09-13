export function AdSlot({ label }: { label: string }) {
  return (
    <div
      role="complementary"
      aria-label={label}
      className="my-10 flex min-h-24 items-center justify-center rounded-lg border border-dashed border-border text-xs text-muted-foreground"
    >
      {label}
    </div>
  );
}

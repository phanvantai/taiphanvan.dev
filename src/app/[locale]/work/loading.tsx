export default function Loading() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="mb-10 space-y-2">
        <div className="bg-muted h-3 w-12 animate-pulse rounded" />
        <div className="bg-muted h-9 w-32 animate-pulse rounded" />
        <div className="bg-muted/70 h-4 w-64 animate-pulse rounded" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="border-border/60 bg-card space-y-3 rounded-xl border p-5">
            <div className="flex items-center justify-between">
              <div className="bg-muted h-5 w-28 animate-pulse rounded" />
              <div className="bg-muted/60 h-4 w-20 animate-pulse rounded" />
            </div>
            <div className="bg-muted/50 h-4 w-full animate-pulse rounded" />
            <div className="bg-muted/40 h-3 w-32 animate-pulse rounded" />
          </div>
        ))}
      </div>
    </section>
  );
}

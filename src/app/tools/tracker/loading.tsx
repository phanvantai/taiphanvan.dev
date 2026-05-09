export default function Loading() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-6 space-y-2">
        <div className="bg-muted h-3 w-24 animate-pulse rounded" />
        <div className="bg-muted h-9 w-48 animate-pulse rounded" />
        <div className="bg-muted/60 h-4 w-72 animate-pulse rounded" />
      </div>
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="border-border/40 bg-card space-y-3 rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <div className="bg-muted h-4 w-32 animate-pulse rounded" />
              <div className="bg-muted/60 h-3 w-20 animate-pulse rounded" />
            </div>
            <div className="bg-muted/40 h-4 w-full animate-pulse rounded" />
            <div className="bg-muted/40 h-2 w-full animate-pulse rounded" />
          </div>
        ))}
      </div>
    </section>
  );
}

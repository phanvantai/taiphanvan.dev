export default function Loading() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="mb-10 space-y-2">
        <div className="bg-muted h-3 w-12 animate-pulse rounded" />
        <div className="bg-muted h-9 w-32 animate-pulse rounded" />
        <div className="bg-muted/70 h-4 w-64 animate-pulse rounded" />
      </div>
      <div className="divide-border/40 -my-6 divide-y">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-3 py-6">
            <div className="bg-muted/60 h-3 w-40 animate-pulse rounded" />
            <div className="bg-muted h-6 w-3/4 animate-pulse rounded" />
            <div className="bg-muted/50 h-4 w-full animate-pulse rounded" />
          </div>
        ))}
      </div>
    </section>
  );
}

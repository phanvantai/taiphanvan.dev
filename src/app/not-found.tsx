import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-xl flex-col items-start justify-center gap-6 px-4 py-16 sm:px-6">
      <p className="text-muted-foreground font-mono text-xs">404 · Not found</p>
      <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        Lạc đường rồi bro.
      </h1>
      <p className="text-muted-foreground max-w-prose text-pretty">
        Trang này không tồn tại — hoặc đã bị xóa, đổi slug, hoặc draft. Mời bro về{" "}
        <Link href="/" className="text-foreground underline-offset-4 hover:underline">
          trang chủ
        </Link>{" "}
        hoặc kéo xem{" "}
        <Link href="/blog" className="text-foreground underline-offset-4 hover:underline">
          blog
        </Link>
        .
      </p>
      <div className="flex flex-wrap gap-3 pt-2">
        <Button render={<Link href="/" />}>Về home</Button>
        <Button variant="outline" render={<Link href="/blog" />}>
          Đọc blog
        </Button>
      </div>
    </section>
  );
}

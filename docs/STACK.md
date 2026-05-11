# Stack & decisions

Quyết định stack + lý do + breaking changes vs spec gốc trong `<initial-prompt>`.

## Versions (latest stable, May 2026)

| Package | Version | Note |
| --- | --- | --- |
| Next.js | 16.2.6 | Spec gốc ghi 15; Next 16 ra 2026, App Router compatible |
| React | 19.2.6 | RSC + Server Actions |
| TypeScript | 6.0.3 | strict + `noUncheckedIndexedAccess` |
| Tailwind CSS | 4.2.4 | v4 CSS-first, OKLCH theme tokens |
| shadcn/ui | base-nova preset | Mới — dùng `@base-ui/react` thay `@radix-ui/*` |
| Prisma | 7.8.0 | Major change — driver adapter, không còn `directUrl`/`url` trong schema |
| @prisma/adapter-pg | 7.8.0 | pg driver adapter cho Prisma client |
| pg | 8.20.0 | Postgres client |
| Node | 22+ (LTS) hoặc 24/26 | Prisma 7 reject odd-numbered <24 (rejects Node 23) |
| pnpm | 11.0.8 | Qua corepack |

## Versioning policy

Default latest stable, không pin theo spec cũ. Memory: `feedback_versioning.md`. Khi major bump có breaking change, flag cho bro xem trước.

## Breaking changes vs spec gốc

### Next 15 → Next 16

- Spec ghi Next 15. Tôi dùng Next 16 vì latest stable.
- App Router compatible. `searchParams` + `params` trong page giờ là `Promise<>`.
- Turbopack default cho `pnpm dev` (faster).

### shadcn → base-nova preset

- Spec không nói preset cụ thể. shadcn mặc định 2026 = `base-nova` (dùng [Base UI](https://base-ui.com), kế nhiệm Radix).
- API khác: polymorphic via `render={<Link />}` thay `asChild={true}`.
- Variant size có thêm `xs`, `icon-xs`, `icon-sm`, `icon-lg`.

### Prisma 6 → Prisma 7

| Spec gốc (Prisma 6) | Prisma 7 |
| --- | --- |
| `datasource { url, directUrl }` trong `schema.prisma` | `url` + `directUrl` bỏ khỏi schema. Dùng `prisma.config.ts` với `datasource.url` |
| `new PrismaClient()` mặc định | Phải dùng driver adapter: `new PrismaClient({ adapter: new PrismaPg({...}) })` |
| `package.json` `prisma.seed` | Move qua `prisma.config.ts` `migrations.seed` |
| `directUrl` cho migration bypass pooler | Bỏ. Dùng riêng env `MIGRATE_DATABASE_URL` cho session pooler, set qua `prisma.config.ts` |

→ Code phải verbose hơn 1 chút (10-15 dòng) nhưng cleaner separation runtime vs migrate.

### Vercel AI SDK — KHÔNG dùng

- Spec gốc đã loại trừ — site không có chat feature.

## Database connection strategy

2-URL pattern cho Supabase prod, single-URL cho Docker local:

- `DATABASE_URL` → Transaction pooler (6543) cho app
- `MIGRATE_DATABASE_URL` → Session pooler (5432) cho migrate/seed/studio
- Fallback: nếu chỉ có `DATABASE_URL`, migrate dùng nó

Chi tiết: [DATABASE.md § 2-URL pattern](DATABASE.md#2-url-pattern).

## Auth strategy (tracker)

Không dùng auth provider (NextAuth, Clerk, Supabase Auth) vì:

- 1 user duy nhất (Tai)
- Không cần email/password recovery, social login, multi-device session
- Edge runtime cho proxy (Next 16 rename của middleware) → cần Web Crypto, không dùng được Node `crypto`

→ Custom signed-cookie HMAC-SHA256 (~80 dòng [src/lib/auth.ts](../src/lib/auth.ts)). Đủ secure cho personal tool, không phải production-grade auth system.

Chi tiết: [TRACKER.md § Auth model](TRACKER.md#auth-model).

## Linting & formatting

- ESLint 9 (10 chưa support `eslint-plugin-react@7.x` qua `eslint-config-next`)
- Prettier 3 + `prettier-plugin-tailwindcss` (sort class)
- Husky + lint-staged: tự `eslint --fix` + `prettier --write` trước commit

## Phase plans

Tất cả 5 plans đã hoàn thành. Chi tiết: [plans/README.md](../plans/README.md).

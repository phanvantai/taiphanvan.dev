# Setup guide

From-scratch setup từ clone tới chạy được dev server.

## Prerequisites

- **Node 22+** (Prisma 7 yêu cầu 20.19+ / 22.12+ / 24.0+; đây là Node 24 LTS hoặc Node 26 current đều OK)
- **pnpm** (qua `corepack enable pnpm` — Node 22+ ship sẵn corepack)
- **Docker Desktop** hoặc **OrbStack** (chỉ cần nếu chọn local Postgres; bỏ qua nếu dùng Supabase)

```bash
node --version    # v24+ hoặc v26+
pnpm --version    # 11.x
docker --version  # optional
```

## 1. Install deps

```bash
pnpm install
```

`postinstall` script tự chạy `prisma generate` để tạo `@prisma/client` types.

## 2. Pick database

Hai option, chọn 1:

### Option A — Supabase (recommended cho prod parity)

Xem [DATABASE.md § Supabase](DATABASE.md#supabase) để lấy 2 URL.

Edit [.env.local](../.env.local):

```bash
DATABASE_URL="postgresql://postgres.xxxxx:PWD@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
MIGRATE_DATABASE_URL="postgresql://postgres.xxxxx:PWD@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
```

### Option B — Local Docker Postgres

```bash
pnpm db:up
```

`docker-compose.yml` spin up Postgres 17 trên port `5433` (host) → `5432` (container).

`.env.local` đã có sẵn:

```bash
DATABASE_URL="postgresql://taiphanvan:dev@localhost:5433/taiphanvan_dev"
# MIGRATE_DATABASE_URL không cần — fallback sang DATABASE_URL
```

## 3. Apply schema

Lần đầu (Supabase fresh hoặc Docker fresh):

```bash
pnpm prisma migrate deploy
```

Apply tất cả migration trong `prisma/migrations/`. Hiện có 1 migration: `20260509143452_init`.

> Khác `pnpm db:migrate` (= `prisma migrate dev`): `dev` tạo migration mới khi schema thay đổi; `deploy` chỉ apply migration đã có.

## 4. Seed 4 starter projects

```bash
pnpm db:seed
```

Insert: Examino, PES Arena, QuickSpend, Littlemark. Re-run an toàn (idempotent — skip nếu name đã tồn tại).

## 5. Tracker auth secrets

`.env.local` cần:

```bash
TRACKER_PASSWORD="dev"   # password để vô /tools/tracker
TRACKER_COOKIE_SECRET="<32+ chars random>"
```

Generate secret mới:

```bash
openssl rand -hex 32
```

Mặc định trong `.env.local` đã có 1 secret + password = `dev`. Đổi tuỳ ý cho production.

Chi tiết: [TRACKER.md § Auth](TRACKER.md#auth).

## 6. Run dev server

```bash
pnpm dev
```

Mở `http://localhost:3000`:

- `/` — homepage placeholder
- `/tools/tracker` — auto redirect sang login → nhập `TRACKER_PASSWORD` → vô tracker

## 7. Verify everything

```bash
pnpm typecheck   # tsc --noEmit
pnpm lint        # ESLint
pnpm build       # production build
```

3 lệnh này phải pass trước mỗi PR / push.

## Troubleshooting

**`Prisma only supports Node.js versions 20.19+, 22.12+, 24.0+`**

→ Node 23.x là current/odd, không LTS. Upgrade lên 24 LTS hoặc 26+: `brew upgrade node`. Sau khi upgrade, re-run `corepack enable pnpm`.

**`Connection url is empty`** khi chạy `prisma migrate`

→ `prisma.config.ts` không đọc được env. Check `.env.local` có dòng `DATABASE_URL=` hoặc `MIGRATE_DATABASE_URL=` không, đường dẫn URL đúng format không (escape special chars trong password).

**Login thành công nhưng vẫn ở login page**

→ Đã fix bằng hard navigation trong [_login-form.tsx](../src/app/tools/tracker/login/_login-form.tsx). Nếu reproduced lại, check cookie `tracker_auth` đã set httpOnly, sameSite=lax chưa.

**`Connection refused localhost:5433`**

→ Container chưa lên. Chạy `pnpm db:up` lại + `docker compose ps` xem status.

**Build fail với `Missing DATABASE_URL`**

→ [lib/db.ts](../src/lib/db.ts) đã handle empty URL gracefully — không throw lúc build. Nếu vẫn fail, check Prisma client đã generate chưa: `pnpm db:generate`.

## Git hooks

Husky + lint-staged tự chạy `eslint --fix` + `prettier --write` trước commit. Không skip bằng `--no-verify` trừ khi có lý do rõ.

## Sub-agent workflow

Dev quotidian:

1. `pnpm db:up` (nếu Docker)
2. `pnpm dev`
3. Code → HMR
4. Trước commit: hooks tự chạy
5. `git push` → Vercel auto-deploy

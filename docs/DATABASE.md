# Database

## Stack

- **Postgres 17** (Supabase prod, Docker local)
- **Prisma 7** với driver adapter [@prisma/adapter-pg](https://www.npmjs.com/package/@prisma/adapter-pg)
- Schema: [prisma/schema.prisma](../prisma/schema.prisma)
- Config: [prisma.config.ts](../prisma.config.ts) (Prisma 7 yêu cầu config file riêng — `directUrl` đã bị bỏ, `url` không còn trong schema)

## 2-URL pattern

Production-grade Supabase setup tách 2 connection string:

| Env var | Pooler | Port | Dùng cho | Đặc điểm |
| --- | --- | --- | --- | --- |
| `DATABASE_URL` | Transaction | 6543 | App runtime (Server Actions, route handlers, RSC) | Per-transaction pooling — scale tốt cho serverless. Không hỗ trợ prepared statements, LISTEN/NOTIFY, advisory locks. |
| `MIGRATE_DATABASE_URL` | Session | 5432 | `prisma migrate`, `prisma db seed`, `prisma studio` | Per-session, full Postgres feature set. |

**Tại sao tách?** Vercel serverless function spawn lambda mới mỗi request → mỗi lambda mở 1 connection. Session pool hết quota Free tier (60 connection) rất nhanh. Transaction pool dùng connection ngắn hạn, scale lên hàng trăm lambda được. Migration chạy local (1 process, ngắn hạn) thì session pool đơn giản hơn + không bị mất prepared statements.

**Fallback**: nếu `MIGRATE_DATABASE_URL` chưa set, [prisma.config.ts](../prisma.config.ts) tự fallback sang `DATABASE_URL`. Local Docker dev chỉ cần 1 URL.

## Supabase

### Tạo project

1. <https://supabase.com> → Sign in (Github OAuth)
2. **New project**:
   - Name: tuỳ ý
   - **Database password**: tạo mạnh, lưu lại — Supabase không show lại
   - **Region**: **Southeast Asia (Singapore)** (`ap-southeast-1`)
   - **Pricing**: Free
3. Đợi ~2 phút setup

### Lấy 2 URLs

Project → **Settings** (⚙️) → **Database** → **Connection string**.

**Tab "Transaction pooler"** → port `6543` → `DATABASE_URL`.

```bash
postgresql://postgres.<ref>:<PWD>@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
```

Append `?pgbouncer=true` cuối URL (hint cho Prisma client biết pool mode):

```bash
postgresql://postgres.xxxxx:RealPwd@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

**Tab "Session pooler"** → port `5432` → `MIGRATE_DATABASE_URL`.

```bash
postgresql://postgres.<ref>:<PWD>@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
```

Replace `<PWD>` bằng password đã tạo. Không cần append gì.

### Apply schema

Lần đầu (DB Supabase fresh):

```bash
pnpm prisma migrate deploy
pnpm db:seed
```

Sau này khi schema đổi (local dev):

```bash
pnpm db:migrate -- --name <migration-name>
```

`prisma migrate dev` tự create migration file + apply lên `MIGRATE_DATABASE_URL`. Commit migration files vào git để CI/Vercel apply qua `migrate deploy` lúc deploy.

## Local Docker Postgres

Optional cho dev nhanh (offline OK, reset thoải mái).

[docker-compose.yml](../docker-compose.yml):

```yaml
services:
  db:
    image: postgres:17-alpine
    ports:
      - "5433:5432"   # 5433 host (tránh clash) → 5432 container
    environment:
      POSTGRES_USER: taiphanvan
      POSTGRES_PASSWORD: dev
      POSTGRES_DB: taiphanvan_dev
```

Switch sang local: edit [.env.local](../.env.local):

```bash
DATABASE_URL="postgresql://taiphanvan:dev@localhost:5433/taiphanvan_dev"
# MIGRATE_DATABASE_URL không cần (fallback sang DATABASE_URL)
```

Commands:

```bash
pnpm db:up      # start container + wait pg_isready
pnpm db:down    # stop, giữ data
pnpm db:logs    # tail logs
pnpm db:reset   # wipe volume + migrate + seed (DESTRUCTIVE)
```

## Schema

3 model — xem [prisma/schema.prisma](../prisma/schema.prisma):

- **`SideProject`** — emoji, color, status enum (ACTIVE/PAUSED/DONE/ARCHIVED), description, notes (markdown), `lastUpdate` timestamp dùng cho stale badge.
- **`Task`** — belongs to project, `done` boolean + `doneAt` timestamp, cascade delete với project.
- **`PostView`** (Plan 02 sẽ dùng) — track view count blog.

Index:

- `SideProject @@index([status, lastUpdate])` — phục vụ filter status + sort by stale.
- `Task @@index([projectId, done])` — phục vụ list task theo project + filter done.

## Workflow khi thay đổi schema

1. Edit [prisma/schema.prisma](../prisma/schema.prisma)
2. `pnpm db:migrate -- --name <descriptive-name>` (create migration + apply local)
3. Verify migration file trong `prisma/migrations/<timestamp>_<name>/migration.sql` đúng ý
4. `pnpm typecheck` + `pnpm build` (Prisma client tự regenerate)
5. Commit cả schema + migration file
6. Deploy: Vercel chạy `prisma migrate deploy` qua build hook (Plan 04 setup) hoặc manually

## Backup

**Supabase Free tier**: daily backup, retain 1 ngày. Bro nên dump manual lâu lâu nếu data quan trọng:

```bash
pg_dump "$MIGRATE_DATABASE_URL" > backup-$(date +%Y%m%d).sql
```

(Cần postgresql client local: `brew install libpq`.)

## Common errors

**`Connection refused`**

→ Container chưa lên (Docker) hoặc IP/port sai. `docker compose ps` check status.

**`prepared statement "s0" already exists`**

→ Đập transaction pooler 6543 nhưng client thử dùng prepared statements. Đảm bảo `?pgbouncer=true` trong `DATABASE_URL`. `@prisma/adapter-pg` should handle nhưng query param là defensive depth.

**`Tenant or user not found`**

→ Sai user/password Supabase. Reset password trong Supabase Dashboard → Database settings.

**`SSL connection error`**

→ Một số version pg driver yêu cầu `?sslmode=require`. Append vào URL nếu gặp.

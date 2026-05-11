# Deploy

Site này deploy lên Vercel + custom domain `taiphanvan.dev`. DB qua Supabase Singapore. CDN của Vercel sẽ tự gần Singapore vì Vercel auto edge.

## Pre-flight checklist

- [x] Supabase project created, region **Singapore (`ap-southeast-1`)**.
- [x] Migration đã applied: `pnpm prisma migrate deploy` chạy local OK với `MIGRATE_DATABASE_URL` của Supabase.
- [x] `pnpm db:seed` chạy OK trên Supabase (4 starter projects).
- [x] `pnpm typecheck` + `pnpm lint` + `pnpm build` đều pass local.
- [x] Repo đã push lên Github (private hoặc public).

## Step 1 — Push lên Github

```bash
gh repo create taiphanvan-dev --private --source=. --remote=origin --push
```

(Hoặc tạo qua Github UI rồi `git remote add origin` + `git push -u origin main`.)

## Step 2 — Tạo Vercel project

1. Vào https://vercel.com → **Add new** → **Project**
2. Import repo `taiphanvan-dev`
3. **Framework Preset**: Next.js (auto-detect)
4. **Root Directory**: `./`
5. **Build Command**: `pnpm build` (default)
6. **Install Command**: `pnpm install`
7. **Output Directory**: `.next` (default)
8. **Node version**: 24+ (Settings → General sau khi tạo). Match `.nvmrc`.

## Step 3 — Set Environment Variables

Project → **Settings → Environment Variables**. Set cho cả Production, Preview, và Development:

| Name | Value |
| --- | --- |
| `DATABASE_URL` | Supabase Transaction pooler (port 6543) + `?pgbouncer=true` |
| `MIGRATE_DATABASE_URL` | Supabase Session pooler (port 5432) |
| `TRACKER_PASSWORD` | Password mạnh để vô tracker |
| `TRACKER_COOKIE_SECRET` | `openssl rand -hex 32` |
| `NEXT_PUBLIC_SITE_URL` | `https://taiphanvan.dev` |

> `MIGRATE_DATABASE_URL` chỉ cần ở môi trường mà bro chạy migrate — Vercel runtime không gọi tới `prisma migrate`, chỉ runtime queries. Nhưng để đó cho Preview deployments cũng OK.

## Step 4 — Trigger first deploy

Push một commit nhỏ lên `main`:

```bash
git commit --allow-empty -m "trigger first vercel deploy"
git push
```

Vercel pick up tự build. Lần đầu mất ~2 phút.

Theo dõi build log: project page → **Deployments** → click latest → **Build Logs**.

Build expectations:
- Compile Turbopack ✓
- TypeScript pass ✓
- 18 routes generated (5 SSG + 12 static + 3 dynamic + proxy)
- ESLint warnings OK, errors NOT OK

## Step 5 — Apply migration lên prod DB

Migration đã được apply local rồi (Step 0 pre-flight) — nếu DB Supabase fresh chưa có schema, chạy:

```bash
# từ máy local, với MIGRATE_DATABASE_URL trỏ về prod Supabase
pnpm prisma migrate deploy
pnpm db:seed
```

Hoặc thêm `prisma migrate deploy` vào Vercel build command:

```bash
# Build Command override:
prisma generate && prisma migrate deploy && next build
```

(Optional — nếu bro muốn auto-migrate khi deploy. Hơi nguy nếu migration phức tạp; với schema đơn giản thì OK.)

## Step 6 — Custom domain

1. Project → **Settings → Domains**
2. Add `taiphanvan.dev`
3. Add `www.taiphanvan.dev` (redirect → root)
4. Vercel show DNS records cần set:
   - `taiphanvan.dev` → **A record** `76.76.21.21`
   - `www.taiphanvan.dev` → **CNAME** `cname.vercel-dns.com`
5. Set DNS ở provider của bro (Namecheap, Cloudflare, etc.)
6. Đợi propagate (5-30 phút), Vercel auto issue SSL Let's Encrypt.

## Step 7 — Smoke test production

```bash
# Homepage
curl -sI https://taiphanvan.dev/ | head -1

# OG image
curl -sI "https://taiphanvan.dev/og?title=Hello&type=blog" | head -3

# Sitemap
curl -s https://taiphanvan.dev/sitemap.xml | head -20

# RSS
curl -s https://taiphanvan.dev/rss.xml | head -20

# Tracker auth gate (expect 307)
curl -sI https://taiphanvan.dev/tools/tracker | head -3
```

Browser:
- [ ] Theme toggle work, no FOUC.
- [ ] Cmd+K palette open + search posts + nav.
- [ ] /tools/tracker login với password env, vô được, CRUD project.
- [ ] OG preview pass tại https://www.opengraph.xyz/url/https%3A%2F%2Ftaiphanvan.dev
- [ ] JSON-LD validate tại https://validator.schema.org

## Step 8 — Vercel Analytics + Speed Insights

Auto-activate vì 2 components đã mount trong `app/layout.tsx`. Vào project → **Analytics** + **Speed Insights** tab — data flow sau lần deploy đầu.

Free tier đủ cho personal site.

## Subsequent deploys

```bash
git push origin main
```

Mỗi push lên `main` = production deploy. Mỗi push lên branch khác = preview deploy với URL riêng (`taiphanvan-dev-<hash>.vercel.app`).

## Rollback

Vercel → **Deployments** → click một deployment cũ → **Promote to Production**. Instant rollback, không cần git revert.

## Troubleshooting

**Build fail với `Missing DATABASE_URL`**

→ Env var chưa set. Settings → Environment Variables. Re-deploy.

**Tracker login redirect loop**

→ `TRACKER_COOKIE_SECRET` không set hoặc khác giữa các pod. Set 1 giá trị fix vào prod env.

**Supabase connection error trong runtime**

→ Check DATABASE_URL có `?pgbouncer=true` cuối không. Transaction pooler không support prepared statements; query param là defensive.

**RSC payload quá to**

→ Vercel cảnh báo nếu page payload > 1MB. Check `getAllPosts()` không trả full content cho list page (đã handle qua `stripContent` helper trong `lib/mdx.ts`).

**Next 16 turbopack warning về module.register**

→ Deprecation warning từ tsx, không break build. Ignore tới khi tsx 5.x.

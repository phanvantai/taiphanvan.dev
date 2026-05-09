# Side Project Tracker

Mini tool tại `/tools/tracker`. Track side project, nhắc nhở khi bỏ bê quá lâu.

## Auth model

Tracker private — chỉ Tai dùng. Không có user accounts, OAuth, multi-tenancy. Đơn giản:

- 1 password chung qua env `TRACKER_PASSWORD`
- Login → server set cookie `tracker_auth` httpOnly + signed HMAC
- Proxy (Next 16 — trước đây middleware) verify cookie trước mọi request `/tools/tracker/*` và `/api/tracker/*`

### Cookie format

```text
tracker_auth = <expiresAtMs>.<signatureHex>
```

- `expiresAtMs`: epoch ms khi cookie hết hạn (30 ngày từ login)
- `signatureHex`: `HMAC-SHA256(TRACKER_COOKIE_SECRET, expiresAtMs)` hex

Verify:

1. Parse expiresAt → check `> Date.now()`
2. Re-compute HMAC → constant-time compare hex string

Code: [src/lib/auth.ts](../src/lib/auth.ts). Web Crypto only (no Node `crypto`) → edge-compatible cho proxy + edge route handlers.

### Env vars

```bash
TRACKER_PASSWORD="<password để vô tracker>"
TRACKER_COOKIE_SECRET="<32+ chars random hex>"
```

Generate secret:

```bash
openssl rand -hex 32
```

**Đổi password / secret bao giờ:**

- Đổi password → tự đổi env, restart dev / redeploy. Cookie cũ vẫn valid (vì verify bằng secret, không liên quan password).
- Đổi secret → invalidate hết cookie hiện có → bắt buộc login lại.

## Routes

| Route | Auth | Loại | Mô tả |
| --- | --- | --- | --- |
| `/tools/tracker` | required | Server Component (dynamic) | Grid + filter + sort + edit Sheet |
| `/tools/tracker/login` | bypass | Server Component (static) | Form 1 input password |
| `/api/tracker/login` | bypass | Edge route | POST `{ password }` → set cookie hoặc 401 |
| `/api/tracker/logout` | required | Edge route | POST → clear cookie |

Proxy [src/proxy.ts](../src/proxy.ts) gate `/tools/tracker/:path*` + `/api/tracker/:path*`, skip 2 login route.

## Database

3 model — xem [DATABASE.md](DATABASE.md#schema):

- `SideProject` (1) ←→ (n) `Task`
- `lastUpdate` field tự bump mỗi lần create/update/touch/task action

## Stale badge logic

[src/app/tools/tracker/_components/stale-badge.tsx](../src/app/tools/tracker/_components/stale-badge.tsx):

- `daysSince(lastUpdate) >= 14` → đỏ — `Bỏ bê N ngày 🔥`
- `>= 7` → vàng — `Lâu rồi N ngày ⏰`
- `< 7` → xanh — `N ngày trước` hoặc `Hôm nay ✓`
- Status `PAUSED` / `DONE` / `ARCHIVED` → không show stale, hiển thị label status thay thế.

## Server Actions

[src/app/tools/tracker/_actions.ts](../src/app/tools/tracker/_actions.ts):

| Action | Hiệu ứng |
| --- | --- |
| `createProject` | Insert project mới |
| `updateProject` | Patch fields, **bump `lastUpdate`** |
| `deleteProject` | Cascade delete project + tasks |
| `touchProject` | Bump `lastUpdate = now()` (không đổi field khác) |
| `addTask` | Insert task + bump project `lastUpdate` |
| `updateTask` | Patch task (title hoặc done), bump project `lastUpdate`, set `doneAt` |
| `deleteTask` | Delete task + bump project `lastUpdate` |

Mọi action:

1. `requireAuth()` — verify cookie, redirect login nếu invalid
2. `zod.safeParse(input)` — validate
3. Mutate qua Prisma
4. `revalidatePath("/tools/tracker")` — invalidate RSC cache

Pattern return: `{ ok: true } | { ok: true, data } | { ok: false, error: string }`. Client handle error qua sonner toast.

## UI

| Component | File |
| --- | --- |
| Page (server) | [page.tsx](../src/app/tools/tracker/page.tsx) |
| Filter bar | [_components/filter-bar.tsx](../src/app/tools/tracker/_components/filter-bar.tsx) |
| Grid | [_components/project-grid.tsx](../src/app/tools/tracker/_components/project-grid.tsx) |
| Card | [_components/project-card.tsx](../src/app/tools/tracker/_components/project-card.tsx) |
| Edit Sheet | [_components/project-sheet.tsx](../src/app/tools/tracker/_components/project-sheet.tsx) |
| Task list | [_components/task-list.tsx](../src/app/tools/tracker/_components/task-list.tsx) |
| Stale badge | [_components/stale-badge.tsx](../src/app/tools/tracker/_components/stale-badge.tsx) |
| Touch button | [_components/touch-button.tsx](../src/app/tools/tracker/_components/touch-button.tsx) |
| New project | [_components/new-project-button.tsx](../src/app/tools/tracker/_components/new-project-button.tsx) |
| Logout | [_components/logout-button.tsx](../src/app/tools/tracker/_components/logout-button.tsx) |
| Markdown preview | [_components/markdown-preview.tsx](../src/app/tools/tracker/_components/markdown-preview.tsx) |

URL params:

- `?filter=all|active|paused|done|archived`
- `?sort=recent|stale`

(Filter bar dùng `<Link>` để URL-driven, ko cần state.)

## Adding a new project

UI: bấm **+ New project** ở header → fill name/emoji/color/description → tạo. Detail (notes, tasks) edit sau qua card.

Hoặc qua DB seed: edit [prisma/seed.ts](../prisma/seed.ts) → re-run `pnpm db:seed`.

## Đổi password

```bash
# .env.local
TRACKER_PASSWORD="<new password>"
```

Restart dev (`pkill -f "next dev" && pnpm dev`). Cookie cũ vẫn valid vì verify HMAC qua secret, không qua password — bro logout + login lại nếu muốn cookie với password mới (nhưng cookie thực ra không lưu password).

## Production deploy

Set ở Vercel dashboard:

```bash
DATABASE_URL = <Supabase Transaction pooler URL + ?pgbouncer=true>
MIGRATE_DATABASE_URL = <Supabase Session pooler URL>
TRACKER_PASSWORD = <password mạnh>
TRACKER_COOKIE_SECRET = <openssl rand -hex 32>
NEXT_PUBLIC_SITE_URL = https://taiphanvan.dev
```

Build hook hoặc manual: `pnpm prisma migrate deploy` để apply migration lên Supabase prod.

Plan 04 sẽ setup deploy automation — tạm thời manual.

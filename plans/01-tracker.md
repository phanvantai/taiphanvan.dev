# Plan 01 — Side Project Tracker (PRIORITY)

**Goal:** Implement đầy đủ `/tools/tracker` — DB + auth + UI hoàn chỉnh. Đây là mini tool quan trọng nhất, làm xong là có thể dùng được trên mobile.

**Reference:** `projects.jsx` (artifact bro đang dùng) — copy logic stale badge, touch button, task toggle, but UI rebuild theo dev-tool feel (GitHub Projects / Linear).

## Pre-requisites (bro làm trước)

1. Tạo Supabase project ở region **Singapore (`ap-southeast-1`)**.
2. Settings → Database → copy:
   - **Connection pooler** (port 6543, có `?pgbouncer=true`) → `DATABASE_URL`.
   - **Direct connection** (port 5432) → `DIRECT_URL`.
3. Paste vào `.env.local`. Tôi (Claude) sẽ dừng đợi bro confirm xong mới chạy `prisma migrate`.

## Deliverables

- DB `SideProject` + `Task` + `PostView` (sau dùng) với index.
- 4 project seeded: Examino, PES Arena, QuickSpend, Littlemark.
- Middleware password gate qua signed cookie HMAC, 30 ngày.
- `/tools/tracker/login` form, `/api/tracker/login` POST.
- `/tools` index liệt kê tool (1 card: Tracker).
- `/tools/tracker` UI: grid responsive, stale badge, filter status, sort, Touch button, edit dialog với tasks + notes markdown.
- Tất cả mutation qua **Server Actions** (không dùng API routes trừ login).
- Mobile responsive (1 col → 2 col → 3 col).

## Steps

### 1. Install deps

```bash
pnpm add @prisma/client
pnpm add -D prisma tsx
pnpm add zod
```

- `tsx` để chạy `prisma/seed.ts`.
- `zod` validate input Server Action.

### 2. Prisma schema

`prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

enum ProjectStatus {
  ACTIVE
  PAUSED
  DONE
  ARCHIVED
}

model SideProject {
  id          String        @id @default(cuid())
  name        String
  emoji       String?
  color       String?
  status      ProjectStatus @default(ACTIVE)
  description String?
  notes       String?       @db.Text
  lastUpdate  DateTime      @default(now())
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
  tasks       Task[]

  @@index([status, lastUpdate])
}

model Task {
  id        String      @id @default(cuid())
  projectId String
  title     String
  done      Boolean     @default(false)
  doneAt    DateTime?
  createdAt DateTime    @default(now())
  project   SideProject @relation(fields: [projectId], references: [id], onDelete: Cascade)

  @@index([projectId, done])
}

model PostView {
  slug      String   @id
  count     Int      @default(0)
  updatedAt DateTime @updatedAt
}
```

### 3. Seed (`prisma/seed.ts`)

Seed 4 project với data từ spec. Tasks ban đầu để trống.

`package.json`:

```json
"prisma": { "seed": "tsx prisma/seed.ts" },
"scripts": {
  "db:migrate": "prisma migrate dev",
  "db:seed": "prisma db seed",
  "db:studio": "prisma studio"
}
```

### 4. Prisma client singleton

`src/lib/db.ts` — pattern singleton tránh re-instantiate trong dev.

### 5. Env schema

Update `.env.example`:

```bash
DATABASE_URL=""
DIRECT_URL=""
TRACKER_PASSWORD=""
TRACKER_COOKIE_SECRET=""    # 32+ char random
NEXT_PUBLIC_SITE_URL="https://taiphanvan.dev"
```

Generate `TRACKER_COOKIE_SECRET` mẫu: `openssl rand -hex 32`.

### 6. Auth helpers

`src/lib/auth.ts`:

- `signCookie(value, secret)` — HMAC-SHA256(value).
- `createSession(secret)` — value = `expiresAt.toString()`, full = `${value}.${signature}`, expires 30 ngày.
- `verifySession(cookie, secret)` — split, verify HMAC, check expiresAt > now. Return boolean.
- Dùng `crypto.subtle` (Web Crypto, edge-compatible cho middleware).

### 7. Middleware

`middleware.ts` (root):

```ts
export const config = { matcher: ["/tools/tracker/:path*"] };
```

- Skip `/tools/tracker/login`.
- Đọc cookie `tracker_auth`, gọi `verifySession`.
- Invalid → `NextResponse.redirect(new URL("/tools/tracker/login", req.url))`.
- Valid → `NextResponse.next()`.

### 8. Login flow

- `src/app/tools/tracker/login/page.tsx` — form 1 input password (shadcn Input + Button), submit POST `/api/tracker/login`. Hiện error toast nếu sai.
- `src/app/api/tracker/login/route.ts` — POST: parse `{ password }`, so sánh `crypto.timingSafeEqual` với `TRACKER_PASSWORD`, nếu OK → `cookies().set("tracker_auth", session, { httpOnly: true, sameSite: "lax", secure: prod, maxAge: 30*86400 })`, return `{ ok: true }`. Sai → 401.
- Sau login redirect `/tools/tracker` ở client.

### 9. Server Actions

`src/app/tools/tracker/_actions.ts` (`"use server"`):

- `createProject(input)` — zod validate, insert.
- `updateProject(id, input)` — patch fields, **luôn set `lastUpdate: new Date()`**.
- `deleteProject(id)`.
- `touchProject(id)` — set `lastUpdate: new Date()`.
- `addTask(projectId, title)` — insert + bump project lastUpdate.
- `toggleTask(taskId)` — flip `done`, set `doneAt`, bump project lastUpdate.
- `updateTask(taskId, title)` — patch + bump.
- `deleteTask(taskId)` — delete + bump.
- Mỗi action gọi `revalidatePath("/tools/tracker")` cuối.
- Mỗi action check session ở đầu (helper `requireTrackerAuth()` đọc cookie + verify).

### 10. UI — `/tools/tracker/page.tsx` (Server Component)

- Fetch projects (kèm tasks count + done count) từ Prisma.
- Truyền props xuống client component grid.
- Title + description + filter/sort controls (URL search params: `?status=active&sort=stale`).

### 11. UI components

`src/app/tools/tracker/_components/`:

- **`stale-badge.tsx`** (server) — input `lastUpdate` + `status`. Logic:
  - status PAUSED/DONE/ARCHIVED → render status badge (no stale).
  - days >= 14 → red badge `Bỏ bê {N} ngày`.
  - days >= 7 → amber badge `Lâu rồi {N} ngày`.
  - else → green `✓ Active`.
- **`project-card.tsx`** (client) — emoji + name + status badge + stale badge + description short + progress `done/total` + Touch button (server action transition pending state) + click body → open edit sheet.
- **`project-grid.tsx`** (client) — wrap projects, layout grid `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`.
- **`project-form.tsx`** (client, in Sheet) — fields: name, emoji, color (color input), status (Select), description (Textarea), notes (Textarea, mono font, hint "Markdown supported"), Save / Delete.
- **`task-list.tsx`** (client, in Sheet) — list tasks với Checkbox (shadcn) + inline edit + delete; bottom: input "Add task" + Enter → addTask action.
- **`filter-bar.tsx`** (client) — All/Active/Paused/Done/Archived (link với searchParams) + sort dropdown (`Recent` / `Most stale`).
- **`new-project-button.tsx`** (client) — open sheet dạng project-form blank.

### 12. Notes markdown rendering

- Trong edit sheet hiển thị notes preview. Dùng `react-markdown` + `remark-gfm` (deps mới — **hỏi bro trước khi cài** nếu chưa OK).
- Fallback: chỉ hiển thị raw text với `whitespace-pre-wrap` cho tới khi MDX layer Plan 02 sẵn sàng.

### 13. UX details

- Toast (sonner) feedback khi action xong.
- `useTransition` cho pending state trên Touch / Save.
- Optimistic UI optional, không bắt buộc.
- Empty state: "Chưa có project. Add cái đầu tiên đi bro 🚀".
- Mobile: sheet full-screen, desktop: side sheet.

## Acceptance checklist

- [ ] Login sai → toast error, đúng → vào tracker, cookie 30 ngày.
- [ ] Logout đơn giản: clear cookie via DELETE endpoint hoặc nút trên UI (optional).
- [ ] 4 project seed hiển thị ở grid.
- [ ] Stale badge update đúng theo `lastUpdate` (test bằng cách set `lastUpdate` cũ trong DB).
- [ ] Touch button bump `lastUpdate` → badge chuyển xanh.
- [ ] Toggle task → bump project lastUpdate.
- [ ] Filter status, sort recent/stale qua URL params hoạt động.
- [ ] Mobile responsive 1 col, sheet full screen.
- [ ] `pnpm build` pass.
- [ ] Lighthouse a11y > 95 trên `/tools/tracker`.

**STOP** sau plan này → demo flow login + CRUD đầy đủ trên mobile + desktop.

# Stack & decisions

Quyết định stack và các khác biệt đáng chú ý so với spec ban đầu.

## Versions

| Package | Version | Note |
| --- | --- | --- |
| Next.js | 16.3.6 | App Router, Turbopack và async page params |
| React | 19.3.0 | RSC; `<ViewTransition>` stable, không cần flag Next |
| TypeScript | 7.0 (`tsc`) + 6.0 (API) | Strict + `noUncheckedIndexedAccess`; chạy side-by-side, xem bên dưới |
| Tailwind CSS | 4.3.3 | CSS-first config và OKLCH theme tokens |
| shadcn/ui | base-nova preset | Base UI primitives thay cho Radix |
| next-intl | 4.14.6 | Localized routes và messages |
| MDX | file-based | Blog, work và pages nằm trong `content/` |
| Node | 22+; repo pin 24 | Match local development và Vercel |
| pnpm | 11 | Package manager qua Corepack |

## Versioning policy

Ưu tiên latest stable. Khi major bump có breaking change, review migration guide và flag trước khi
nâng.

## Breaking changes vs original spec

### Next 15 → Next 16

- Page `params` và `searchParams` là `Promise<>`.
- Turbopack là default cho dev/build.
- `middleware.ts` đổi thành `proxy.ts`; site dùng proxy để redirect root locale.

### shadcn → base-nova preset

- Polymorphic components dùng `render={<Link />}` thay cho `asChild`.
- Button có thêm các size `xs`, `icon-xs`, `icon-sm`, và `icon-lg`.

### TypeScript 7 side-by-side với 6

TypeScript 7 (native Go) là `tsc` mặc định của repo, nhưng typescript-eslint chưa hỗ trợ TS 7 API
nên vẫn cần TS 6 cho ESLint và Next's type layer. Setup theo hướng dẫn chính thức của TypeScript:

- `typescript` → alias `npm:@typescript/typescript6` (bin `tsc6`) — tool nào import API JS sẽ nhận
  TS 6.
- `@typescript/native` → alias `npm:typescript@^7` (bin `tsc`) — `pnpm typecheck` chạy TS 7.

Khi typescript-eslint hỗ trợ TS 7, gộp lại thành một `typescript@^7` là xong.

### ESLint 10 — chưa nâng

`eslint-plugin-react` (dependency của `eslint-config-next`) mới hỗ trợ tới ESLint 9.x. Giữ ESLint 9
cho tới khi upstream cập nhật.

### Vercel AI SDK — không dùng

Site không có chat feature, nên không thêm AI runtime hoặc client bundle không cần thiết.

## Content architecture

Localized MDX trong `content/{vi,en}/` là source of truth. `src/lib/mdx.ts` parse frontmatter,
cache metadata/content và cung cấp dữ liệu cho Server Components. Public routes không cần dịch vụ lưu
trữ ngoài để render.

## UI style switch

`NEXT_PUBLIC_UI_STYLE` chọn một trong bốn style: `cypher-2049`, `terminal`, `neo-brutalist`, hoặc
`minimalist`. Tokens và component branches được mô tả trong `docs/design-system.md`.

## Linting and formatting

- ESLint 9 + `eslint-config-next`.
- Prettier 3 + `prettier-plugin-tailwindcss`.
- Husky + lint-staged chạy fix/check trước commit.

## Phase plans

Roadmap lịch sử nằm trong [plans/README.md](../plans/README.md). Current behavior và commands trong
README/docs luôn có độ ưu tiên cao hơn các plan lịch sử.

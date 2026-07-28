# Deploy

Site deploy lên Vercel với custom domain `taiphanvan.dev`.

## Pre-flight checklist

- [ ] `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, và `pnpm build` pass local.
- [ ] Repo đã push lên GitHub.
- [ ] Các link social và content draft đã được rà soát.

## 1. Create the Vercel project

1. Vào <https://vercel.com> → **Add new** → **Project**.
2. Import repo `taiphanvan-dev`.
3. Framework Preset: **Next.js**.
4. Root Directory: `./`.
5. Build Command: `pnpm build`.
6. Install Command: `pnpm install`.
7. Output Directory: `.next`.
8. Node version: 24 để match `.nvmrc`.

## 2. Environment variables

Set cho Production, Preview, và Development khi cần:

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://taiphanvan.dev` |
| `NEXT_PUBLIC_UI_STYLE` | `cypher-2049`, `terminal`, `neo-brutalist`, hoặc `minimalist` |

Hai biến đều có default hợp lệ trong code; khai báo rõ trên Vercel giúp cấu hình dễ nhìn hơn.

## 3. First deploy

Push lên `main`; Vercel tự install và build. Trong build log cần thấy compile, TypeScript và static
generation hoàn tất. Không chấp nhận ESLint hoặc TypeScript error.

## 4. Custom domain

1. Project → **Settings → Domains**.
2. Add `taiphanvan.dev`.
3. Add `www.taiphanvan.dev` và redirect về apex domain.
4. Set A/CNAME record theo giá trị Vercel hiển thị.
5. Đợi DNS propagate và Vercel cấp SSL.

## 5. Production smoke test

```bash
curl -sI https://taiphanvan.dev/ | head -1
curl -sI "https://taiphanvan.dev/og?title=Hello&type=blog" | head -3
curl -s https://taiphanvan.dev/sitemap.xml | head -20
curl -s https://taiphanvan.dev/rss.xml | head -20
```

Browser checklist:

- [ ] `/vi` và `/en` render đúng locale.
- [ ] Blog/work list và detail pages mở được.
- [ ] Theme toggle không FOUC.
- [ ] Cmd+K tìm bài và điều hướng được.
- [ ] OG preview và JSON-LD validation pass.

## Analytics

Vercel Analytics và Speed Insights được mount trong localized layout. Data bắt đầu xuất hiện sau khi
production có traffic.

## Subsequent deploys and rollback

- Push `main` tạo production deployment.
- Push branch khác tạo preview deployment.
- Rollback: **Deployments** → chọn deployment cũ → **Promote to Production**.

## Troubleshooting

**Build không tải được Google Fonts**

Kiểm tra outbound network/DNS của build. Ba font được tải qua `next/font/google`.

**RSC payload quá lớn**

Kiểm tra list page chỉ nhận metadata, không truyền full MDX content qua client boundary.

**Nội dung mới chưa hiện**

Kiểm tra `published`, locale directory, filename và Vercel deployment đang trỏ đúng commit.

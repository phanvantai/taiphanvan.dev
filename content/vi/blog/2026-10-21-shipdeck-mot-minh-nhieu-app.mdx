---
title: "Shipdeck: một mình, nhiều app"
description: "Nhảy qua lại giữa các product, mình cứ quên app nào đang tới đâu, còn gì phải xử lí. Nên mình build Shipdeck — một cửa sổ cho cả portfolio."
date: "2026-10-21"
tags: ["shipdeck", "macos", "ai-coding", "indie"]
published: true
featured: false
---

Mình đang chạy song song mấy product — QuickSpend, Examino, PES Arena, cộng thêm chính site này. Làm nhiều thứ thì vui, nhưng cái giá là chuyển qua chuyển lại: tuần này dí QuickSpend, tuần sau nhảy sang Examino, tới lúc quay lại thì chịu, không nhớ nổi app đang tới đâu, còn commit nào chưa ship, review nào chưa trả lời =)).

Mỗi lần quay lại là một lần khảo cổ: `git log`, mở App Store Connect, lục note cũ. Vài lần như vậy thì mình thấy không ổn, phải đổi workflow hoặc dùng tool, automation gì đó thôi. Vừa hay dạo này đang có trend build lại app từ đầu — [ArtCraft](https://getartcraft.com) build lại cả bộ app của Adobe — nên mình cũng tự build một app mới cho nhu cầu của chính mình: Shipdeck.

## Shipdeck là gì

Shipdeck là một app macOS native (SwiftUI) gom mọi product của mình vào một cửa sổ. Mỗi product gồm một hoặc nhiều component — iOS app, backend, landing page — nằm rải rác ở một hay nhiều repo.

Mở app lên, màn Overview xếp product vào 4 nhóm, kèm lý do viết rõ ràng:

- **Needs a release**: kiểu "5 commits since 2.3.0 went live".
- **In progress**: còn file chưa commit hoặc chưa push.
- **Quiet for a while**: lâu rồi không có commit nào.
- **All good**: đã ship, không còn gì treo.

Phần này chạy hoàn toàn không dùng AI. Shipdeck tự đọc git, version trong manifest, appcast của Sparkle và iTunes Lookup. Boring tech — nhanh, chắc, không tốn token.

## Claude đọc repo, mình quyết

Thêm product thì chỉ cần chọn folder. Một session Claude Code headless, read-only sẽ survey repo: tách component, tìm command build/test, service, docs, tra app trên store. Sau đó mình review từng bước, field nào AI điền thì nguồn của nó nằm ngay cạnh, một click là thấy.

Survey chạy ở chế độ `--restricted`, không có shell, file bị git-ignore và file secret như `.env` đều bị chặn — kể cả tên file non-ASCII hay nằm trong submodule.

Code đổi thì có **Sync with Code**: survey lại dựa trên các commit kể từ lần trước, list từng field thay đổi (cũ → mới), mình tick cái nào thì lưu cái đó. Toàn bộ data product nằm trong một file `products.json` trên máy, không ghi gì vào repo.

## App Store Connect ngay cạnh code

Thêm App Store Connect key (lưu trong keychain) là mỗi iOS app có tab App Store: version, review state, phased release, TestFlight build, feedback của tester, review của user. Release một version hay reply review đều làm ngay trong app, có bước confirm.

Không còn cảnh mở cả chục tab browser để biết app nào đang "Waiting for Review".

## Agent phải hỏi trước khi chạm vào Apple

Đây là phần mình khoái nhất. Mỗi product mở được session Claude Code ngay trong Shipdeck (terminal embedded bằng SwiftTerm), và session vẫn chạy khi mình chuyển sang product khác.

Mình muốn agent dùng được Shipdeck — đọc trạng thái product, xem App Store, trả lời review — nhưng không muốn nó tự ý đụng vào Apple. Nên mọi thay đổi, dù của mình hay của agent, đều đi qua một action layer. Ý tưởng này mình mượn từ ArtCraft: mọi action là một command có id cố định, nên GUI, CLI hay MCP đều gọi chung một đường. Mỗi action có một tier:

- **read**: đọc thông tin, chạy thoải mái.
- **local**: sửa data trên máy.
- **remote**: gọi ra ngoài, ví dụ reply review.
- **publish**: thứ user thấy được, ví dụ release version.
- **owner**: chỉ mình làm được.

Agent gọi Shipdeck qua Unix socket, command `shipdeck` hoặc MCP server, và bị nhốt trong đúng product của session đó. Action `remote` hay `publish` sẽ nằm chờ trong approval inbox: Allow Once, Deny kèm lý do (agent đọc được lý do), hoặc Always Allow cho riêng product đó — riêng `publish` thì lần nào cũng hỏi. Mọi lần chạy đều được ghi vào `journal.jsonl` để trace lại.

<Callout type="info">
  Bài này đang được viết trong một session Claude Code chạy bên trong Shipdeck =)).
</Callout>

## 3 ngày, từ 0.1.0 lên 0.6.3

Code do Claude Code viết — chuyện đó giờ chẳng còn gì lạ nữa. Việc của mình là product owner: nói rõ muốn gì, dùng thật hằng ngày, thấy chỗ nào lạc quẻ thì bắt sửa. Vài chỗ mình trực tiếp yêu cầu hoặc bắt lỗi:

- **Agent không được tự ý đụng Apple** → approval inbox và permission rules (0.6.0).
- **AI không được tự ghi đè data** → Sync with Code chỉ lưu field mình tick (0.6.1).
- **Người lạ cài vào phải chạy được** → kiểm tra máy chưa có Claude Code hay Command Line Tools, survey fail thì hiện rõ Claude Code in ra gì, thêm nút Send Feedback (0.6.2).
- **Ô input của Claude bị trôi khi scroll** → bật full-screen renderer của Claude Code để input luôn nằm dưới đáy (0.6.3).
- **UI lỗi vặt**: sheet Add Key bị collapse mất field, tab trên toolbar bị cắt khi chuyển product (0.4.4–0.4.5).
- **Auto-update không lên bản 0.4.0** → root cause là zsh không tách `${sha:+-f sha=$sha}` thành hai argument, GitHub từ chối update appcast. Một bug nhỏ xíu mà mất cả buổi.

Ba ngày, 21 commit, 14 bản release có auto-update qua Sparkle, signed và notarized đàng hoàng. Tốc độ này mấy năm trước mình không dám nghĩ tới.

## Tiếp theo

Shipdeck chưa mở public, mình vẫn đang làm tiếp vài tính năng:

- **Google Play** trong Overview — đa số indie mobile dev ship cả Android, thiếu cái này thì chưa gọi là "mọi product trong một chỗ".
- **Marketing**: draft post từ data thật của product (version, commit từ bản trước, release notes), mình sửa rồi tự đăng.

Sau đó mới mời 10–20 người dùng thật, sửa những gì họ vấp phải, rồi mới tính chuyện launch. Thước đo mình đặt ra không phải lượt tải, mà là một tuần sau họ còn mở app không.

Bao giờ có bản cho các bạn thử, mình sẽ viết tiếp. Còn giờ thì quay lại ship đã.

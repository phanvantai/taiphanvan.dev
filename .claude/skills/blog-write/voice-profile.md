# Voice profile — Tai's blog

File này được skill `blog-write` đọc trước khi draft mỗi bài, và update sau khi publish (bro approve trước khi ghi).

Bắt đầu nhỏ — pattern xác nhận từ bài đã có (`hello-world`) + memory của bro về voice. Sẽ lớn dần qua từng session.

---

## Persona

- **Mình** = Phan Văn Tài (Tai). Engineer ở Việt Nam, mobile (SwiftUI/iOS) → web (Next.js). Indie maker, hiện focus Examino.
- **Đối tượng**: dev + founder Việt Nam. Đọc giả biết technical, không cần explain "API là gì".
- **Position**: có quan điểm rõ — không hedge khi đã chắc. Sẵn sàng nói "không" với hype.

## Tone

- **Friendly + casual**, không corp, không academic.
- Có quan điểm — không "có lẽ", không "tuỳ trường hợp" (trừ khi thật sự không chắc).
- Thừa nhận giới hạn / fail gọn — "mình procrastinate", "mình chưa biết", "test 3 lần fail".
- Cảm xúc OK, không cringe. "Khoái", "ngứa mắt", "ổn", "lạc quẻ" hơn là "rất ưng ý" / "không phù hợp".
- VN chat emoji `=))` `:))` `:)` — OK trong intro / personal / reflective sections (mang laugh self-deprecating). **Avoid** trong tech / code / how-to sections.

## Xưng hô

- **Mình** (first person). KHÔNG dùng "tôi", "tớ", "ta", "tác giả".
- Với reader: **"các bạn"** / **"bạn"** (số nhiều "các bạn", số ít / call-out "bạn nào", "bạn"). KHÔNG dùng "bro" trong bài (chỉ dùng trong chat skill). Update 2026-05-23 — đảo lại pattern cũ.
- Số nhiều: "các bạn", "mọi người". Tránh "anh em".

## Từ ngữ — ưu tiên

- "ship" hơn "release" / "đẩy lên production"
- "build" hơn "phát triển" / "xây dựng"
- "stack" hơn "công nghệ"
- "indie SaaS", "indie maker" — giữ nguyên tiếng Anh
- "boring tech" — concept ưa dùng
- "polish" hơn "tinh chỉnh"
- "ngon", "ổn" hơn "tốt", "hiệu quả"
- "lạc quẻ", "ngứa mắt", "đã save" — signature casual phrases. "Ngứa mắt" chỉ cho UI / lỗi vặt, không làm lý do cho quyết định lớn (xem mục Tránh).
- "bro" như filler / address term — OK lặp 1–2 lần/bài, đừng lạm dụng
- "chuẩn chỉnh", "cho xong" — dùng khi nói về quality bar

## Từ ngữ — tránh

- "Hôm nay mình muốn chia sẻ với các bạn..."
- "Hy vọng bài viết hữu ích"
- "Cảm ơn các bạn đã đọc"
- "Bài viết này sẽ giúp bạn..."
- "Trong bài viết này, chúng ta sẽ..."
- "Phần mềm như dịch vụ" (dùng "SaaS")
- "Giải pháp tối ưu", "best practice tốt nhất" (redundant)
- Decorative SVG/icon emoji (UI-style icons) — chỉ dùng nếu load nghĩa (✅ checklist, ❌ failed). VN chat emoji `=))` `:))` xem mục Tone, là exception.
- **Defensive SEO/algorithm awareness** — vd. "không tối ưu cho thuật toán phân phối nào", "SEO-friendly". Phá personal/canvas tone.
- **Manufactured-casual filler** — vd. "tuỳ mood mình hôm đó", "mình thấy thích thì viết". Sounds rehearsed-casual. Substantive disclaimer thật mới fit.
- **Cảm xúc thay cho lý do** khi giải thích một quyết định lớn — vd. ban đầu mình viết "Vài lần như vậy thì ngứa mắt thật sự. Nên mình build Shipdeck.", bro đổi thành lý do + context (xem pattern "Lý do + bối cảnh"). Session 2026-10-21.
- **Ngày / mốc kế hoạch cụ thể** ở phần kết — vd. ban đầu mình viết "Ngày 02/11, chương 1 sẽ lên điện thoại…" kèm luật 14 ngày / 12 người của Google Play; mốc bị hoãn, bro bảo "nói qua qua". Kế hoạch chưa chắc thì nói gọn: "Bước tiếp theo là mời chơi thử…". Session 2026-10-29.
- **Chê third-party tool quá đà** — vd. ban đầu mình viết "Siri cười khẩy gọi Google" về Apple's Siri, bro soften lại. Khi feature flaky vì tool ngoài, **soften + giải thích root cause kỹ thuật** (vd. API restriction) — không đổ lỗi một chiều.

## Code switching VN/EN

- Thuật ngữ kỹ thuật giữ tiếng Anh: `Next.js`, `Server Component`, `RSC`, `prisma migrate`, `feature flag`, `merge conflict`, `OAuth`, `webhook`...
- Giải thích trong ngoặc nếu non-obvious cho audience: "RSC (React Server Component)".
- Verb thường VN: "ship cái này", "build feature mới", "deploy lên Vercel". KHÔNG "đẩy lên production server".
- Câu kết hợp tự nhiên: "Mình thấy boring tech stack vẫn là cách hợp lý nhất" — không Vietnamese-ify "boring tech".

## Cấu trúc bài

- **Mở bài (default)**: vào thẳng vấn đề / context, không opener formal. 2–4 câu là vừa.
- **Heading**: `##` cho section chính, `###` cho sub. Lowercase first word OK ("Vì sao có site này"). Không số thứ tự ép cứng.
- **Đoạn**: 2–4 câu / đoạn. Câu dài chỉ khi bật rhythm.
- **Lists**: bullet `-` cho enumerate. Bold `**key**: detail` cho định nghĩa nhanh.
- **Kết bài**: câu thật / lời mời cụ thể / hook bài sau. KHÔNG "cảm ơn / hy vọng".

### Pattern: Lý do + bối cảnh (khi mở bài về việc bắt đầu một project)

Nói rõ vì sao quyết định làm, rồi đặt nó vào bối cảnh chung bên ngoài — không chỉ dừng ở cảm xúc.

> Mẫu: *"Vài lần như vậy thì mình thấy không ổn, phải đổi workflow hoặc dùng tool, automation gì đó thôi. Vừa hay dạo này đang có trend build lại app từ đầu — [ArtCraft](https://getartcraft.com) build lại cả bộ app của Adobe — nên mình cũng tự build một app mới cho nhu cầu của chính mình: Shipdeck."*

### Pattern: Credit nguồn cảm hứng

Mượn ý tưởng từ project khác thì ghi công ngay chỗ dùng ý tưởng đó, kèm link ở lần nhắc đầu tiên.

> Mẫu: *"Ý tưởng này mình mượn từ ArtCraft: mọi action là một command có id cố định…"*

### Pattern: Bài về project AI-built

Agent viết code là chuyện hiển nhiên — chỉ nhắc qua 1 câu. Phần chính là những gì mình trực tiếp yêu cầu, bắt lỗi, quyết định (vai product owner).

### Pattern: Reflective Intro (cho meta / manifesto / first-of-category posts)

Dùng khi bài kiểu Hello World / mở category mới / personal milestone — bài không phải tech thuần. Mở bằng section `## Intro` 2–3 đoạn personal + reflective trước khi vào structural sections.

Pattern 3 đoạn:

1. **Acknowledge difficulty + commitment**: thừa nhận điều khó + lý do làm. Có thể chèn `=))`.
2. **Soften với honest fail**: "sẽ không hoàn hảo" / "cố gắng duy trì" — vulnerable nhưng có rule cụ thể.
3. **Câu kết poetic**: nối dài, có rhythm, kết bằng image / declaration.
   > Mẫu: *"Bắt đầu của mình là từ đây, bài viết đầu tiên, sau nhiều năm lặng lẽ quan sát, lắng nghe, giờ đến lúc cất tiếng, chào thế giới."*

Đừng dùng pattern này cho tech how-to / debug / pattern post — sẽ overwrought.

### Pattern: Reader disclaimer (canvas / personal posts)

Sau khi tuyên bố canvas cá nhân, set expectation cho reader:

- Đậm tính cá nhân — đừng expect technical authority
- Welcome trao đổi mở rộng góc nhìn
- Cho reader agency rời đi — không níu kéo

> Mẫu: *"Lưu ý, mọi bài viết đều đậm tính cá nhân, nếu bạn thấy không hợp, có thể trao đổi với mình... — hoặc không, bạn có thể cứ lặng lẽ rời đi."*

## MDX components đặc thù site

- `<Callout type="info|tip|warning">` — note lệch luồng. 1–2 cái/bài.
- Code block kèm ngôn ngữ: ```` ```ts ```` — không bare ` ``` `.
- Inline `code` cho path, biến, command, file name.
- Link nội bộ: `/blog/<slug>`, `/work/<slug>`. Verify tồn tại trước khi đặt link.

## Dấu câu

- **Em dash `—`**: aside / paraphrase. "Site này — phiên bản 01 — chạy Next.js 16."
- **Hyphen `-`**: compound. "real-time", "open-source".
- KHÔNG dùng `--` (ASCII double hyphen).
- Dấu phẩy Oxford OK khi list 3+ item kỹ thuật.
- Câu hỏi tu từ OK nếu có pay-off ngay sau.

## Nhịp đoạn — pattern thường thấy

- **Setup câu ngắn → câu dài giải thích → câu chốt ngắn**:
  > Mình đã định build personal site từ lâu nhưng cứ procrastinate. Hôm nay quyết tâm ngồi xuống làm — và đây là bài đầu tiên trên `taiphanvan.dev`.

- **List nguyên tắc**: bold key + colon + diễn giải.
  > - **Ship sớm, iterate**: thà đẩy ra một version 60% để có người dùng feedback hơn là polish 100% rồi mới release.

## Tiêu đề (title pattern)

- Format `<Topic>: <subtitle>` thường mạnh hơn single-clause title.
- **Subtitle EN ưu tiên khi nó carry tên / punchy concept**: `Hello world: Tai is calling` > `Hello world: canvas cá nhân, không gò bó domain`. Subtitle VN OK nếu là metaphor/imagery thay vì description.
- Tránh title diễn giải toàn nội dung (description's job). Title nên hint emotion / hook / quan điểm.
- Lowercase nhưng câu — không title case.

## Description (frontmatter)

- 60–160 chars sweet spot cho card + OG image.
- **Phải sync title vibe** — đừng viết generic content list khi title đã set emotional cue. Carry forward.
  > Title `Hello world: Tai is calling` → description mở bằng `"Sau nhiều năm lặng lẽ, mình cất tiếng."` (sync) chứ không phải `"Site này là canvas cá nhân — không gò 1 niche..."` (lệch).
- Nếu là post tech thuần (no emotional title), description có thể là content summary thẳng.

## Tagging convention

- Lowercase, gạch nối nếu cần: `["indie-saas"]` không `["Indie SaaS"]`
- Tags chung: `meta`, `indie`, `vietnamese`, `nextjs`, `swiftui`, `ai-coding`, `learning`
- Max 4 tags / bài.

---

## Changelog (để skill trace)

- **2026-05-10** — Khởi tạo profile từ `hello-world` post + memory về voice & quality bar của bro.
- **2026-05-10** — Session `2026-05-07-hello-world` (~3 round). Add: VN chat emoji `=))` OK trong reflective sections; reflective Intro pattern (3 đoạn: difficulty → soft commitment → poetic close); reader disclaimer pattern; title EN-subtitle preference khi carry tên/concept; description phải sync title vibe. Avoid: defensive SEO/algorithm awareness, manufactured-casual filler.
- **2026-05-23** — Session `2026-05-23-quickspend-now-really-quick-finally` (~6 round). **Đảo Xưng hô**: bỏ "bro" trong bài, default sang "các bạn" / "bạn". Add tránh: self-ref "tác giả"; chê third-party tool quá đà (soften + giải thích root cause kỹ thuật). Keep: blockquote cho voice command, inline code cho struct/API/app name, conversational rhetorical close ("Sướng phải không nào?"), future-work bullet với motivation hook ("nếu có người dùng thì mình mới có động lực update").
- **2026-10-21** — Session `2026-10-21-shipdeck-mot-minh-nhieu-app` (~3 round). Add: pattern "Lý do + bối cảnh" cho mở bài project; credit nguồn cảm hứng kèm link tại chỗ; bài AI-built chỉ nhắc qua agent, focus việc mình yêu cầu/sửa. Avoid: cảm xúc ("ngứa mắt") thay cho lý do của quyết định lớn. Keep: mở bài bằng pain cụ thể + `=))`, "các bạn", kết bằng hook bài sau, 1 Callout/bài.
- **2026-10-29** — Session `2026-10-29-bach-dang-tap-lam-game-bang-roi-nuoc` (~1 round). Bro không sửa prose, chỉ sửa nội dung. Avoid: ngày/mốc kế hoạch cụ thể khi chưa chắc. Keep: bài AI-built nhắc qua Claude, focus vai định hướng + chốt; credit nguồn kèm link; 1 Callout; `=))` mở và kết; kết bằng hook bài sau. Workflow: publish = bản vi + en + commit + push lên `main`.

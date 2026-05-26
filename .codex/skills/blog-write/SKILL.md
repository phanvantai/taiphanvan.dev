---
name: blog-write
description: Co-write a Vietnamese blog post for taiphanvan.dev in Tai's voice through a draft → edit → review loop, then publish as MDX. Use this skill whenever bro says "viết bài", "viết blog", "draft luận điểm từ dàn ý", "có dàn ý rồi viết hộ", or otherwise wants help writing a blog post for the site. Skill reads voice-profile.md before drafting and proposes updates after publishing so future drafts get closer to bro's voice over time. Trigger even if bro doesn't explicitly say "blog" — any request to "viết bài cho site" or to expand an outline into prose for personal posts on this repo qualifies.
---

# Blog Write — co-author bài blog với Tai

## Mission

Đồng hành với bro qua loop **draft → bro sửa → skill review → bro sửa → ... → OK → publish**. Skill học giọng qua từng bài để rút ngắn dần thời gian từ outline → published.

Output cuối: file MDX trong `content/blog/YYYY-MM-DD-slug.mdx` với frontmatter chuẩn của site này. Bro tự commit + push.

## Voice — luôn đọc trước khi draft

Trước khi viết bất cứ chữ nào, đọc [voice-profile.md](voice-profile.md). File đó chứa pattern bro đã chốt (từ ngữ ưa dùng, từ cấm, cấu trúc câu, nhịp đoạn). Khi draft luận điểm, áp dụng những pattern đó. Khi review, dùng nó làm tiêu chí check voice drift.

Voice profile lớn dần qua mỗi bài — đó là cơ chế "skill học" qua thời gian. Đừng bỏ bước này dù profile có vẻ đã quen.

## Workflow

### Phase 1 — Lấy dàn ý + setup

Bro sẽ đưa dàn ý ở 1 trong các format:
- Free text mô tả (vd. "viết bài về cách mình build Examino, focus vào khoảnh khắc quyết định stack")
- Bullet list các luận điểm
- Outline có heading + sub-points

Hỏi gọn nếu thiếu:
- **Tiêu đề / hint tiêu đề?** Nếu chưa rõ, propose 2–3 phương án dựa dàn ý.
- **Tags?** Tham khảo tags trong các bài cũ ở `content/blog/`. Đề xuất nếu bro chưa nói.
- **Featured?** Mặc định `false` trừ khi bro bảo featured.
- **Description (1–2 câu hook cho card + OG)?** Có thể propose sau khi draft xong nếu bro muốn để cuối.

Lưu draft đầu tiên (sau khi bro OK structure) vào `sessions/<YYYY-MM-DD>-<slug>/draft-0.md`. **`draft-0.md` là immutable** — không edit sau khi tạo. File này là baseline cho phase 5 (learning) so sánh skill draft vs final.

Ngay sau khi tạo `draft-0.md`, copy nó thành `working.md` trong cùng folder:

```bash
cp sessions/<date>-<slug>/draft-0.md sessions/<date>-<slug>/working.md
```

Hướng dẫn bro: **chỉ edit `working.md`** trong loop Phase 3. Nếu bro muốn edit trực tiếp file thay vì paste vào chat, mở `working.md` (không phải `draft-0.md`).

**Quan trọng**: chỉ lưu draft-0 sau khi bro xác nhận vào loop, đừng spam file khi đang brainstorm.

### Phase 2 — Draft luận điểm

Viết các đoạn body theo dàn ý, áp dụng voice profile. Một số nguyên tắc nền:

- **Nhịp đoạn ngắn**, mạch suy nghĩ rõ. Đoạn 2–4 câu là sweet spot. Câu dài chỉ khi bật được rhythm.
- **Code switch VN/EN** tự nhiên: thuật ngữ kỹ thuật giữ nguyên tiếng Anh (`indie SaaS`, `boring tech`, `ship`), nối chữ tiếng Việt giọng nói thường — không dịch ép thành "phần mềm như dịch vụ" v.v.
- **Em dash `—`** cho aside / paraphrase. Dấu gạch nối ngắn `-` cho compound. Đừng dùng `--`.
- **Code block** khi minh hoạ — kèm ngôn ngữ (` ```ts `). Inline `code` cho path, biến, command.
- **Callout** (`<Callout type="info|tip|warning">`) khi có lưu ý lệch luồng. Đừng spam — 1–2 cái/bài là vừa.
- **First person**: "mình" (không "tôi", không "Tài", không "ta"). Khi nói với reader: "bro" cho casual, "bạn" cho serious-ish.
- **Tone**: friendly + casual nhưng có quan điểm — không hedge ("có lẽ", "tuỳ", "tuỳ trường hợp") trừ khi bro thật sự không chắc.

Sau khi draft xong, present trong chat (không ghi file ngay) để bro vào edit.

### Phase 3 — Loop edit ↔ review

Bro edit `working.md` (hoặc paste version đã sửa trong chat). Skill **đọc `working.md`** mỗi round (KHÔNG đọc lại `draft-0.md` — đó là baseline immutable). Review theo các trục, KHÔNG rewrite cả bài:

1. **Voice drift** — chỗ nào lệch khỏi voice profile? Đề xuất câu thay (1 dòng "thay X → Y, lý do Z").
2. **Logical gap** — luận điểm nào bị nhảy bước, kết luận thiếu support, transition cứng?
3. **Tightening** — câu/đoạn nào có thể cắt mà không mất ý. Show diff (gạch chéo + bản gọn).
4. **Opportunity** — chỗ nào nên thêm callout, code block, hoặc internal link `/work/<slug>` hay `/blog/<slug>` (check tồn tại trước khi đề xuất).
5. **Title/description fit** — sau vài round, check lại tiêu đề + description còn match nội dung không.

Format review **gọn**, dùng bullet list, **đừng viết essay**. Mỗi bullet một concrete suggestion. Nếu không có gì critical, nói thẳng "ổn rồi, ship được".

Bro sửa tiếp → loop tiếp. Lặp đến khi bro nói "OK", "ship", "publish", "đẩy lên", "xong rồi" hoặc tương tự.

### Phase 4 — Publish

1. Confirm cuối: title, slug, date, tags, description, featured. Slug từ title (lowercase, dấu Việt → ASCII, space → `-`, bỏ ký tự đặc biệt).
2. Date dùng `Today's date` từ environment (system reminder ở đầu conversation), format `YYYY-MM-DD`.
3. File path: `content/blog/<date>-<slug>.mdx`.
4. Render frontmatter theo [templates/frontmatter.mdx](templates/frontmatter.mdx).
5. Source content **lấy từ `working.md`** (đó là final user-edited version), không phải `draft-0.md`.
6. Nếu bro muốn cover/banner cho bài, hand off sang skill `blog-cover` sau khi content final. `blog-write` chỉ truyền title/description/tags/body và nhận lại `cover` path để đưa vào frontmatter.
7. Ghi file. **KHÔNG commit, KHÔNG push** — bro tự làm.
8. Confirm với bro path file vừa ghi.

### Phase 5 — Learning (sau publish)

Đây là bước **bắt buộc** để skill cải thiện. Skip = mất giá trị skill.

1. So sánh `sessions/<date>-<slug>/draft-0.md` (skill's initial draft, immutable) với file MDX cuối cùng đã ghi (= `working.md` content). Diff này lộ pattern bro thật sự edit.
2. Trích pattern từ edits:
   - **Từ/cụm bro replace** (skill viết X → bro đổi Y) → "ưu tiên Y"
   - **Từ bro xoá hẳn** → "tránh"
   - **Từ bro thêm vào** mà draft không có → "ưu tiên dùng khi context phù hợp"
   - **Cấu trúc đoạn**: split / merge / reorder — note pattern
   - **Format**: thêm/bớt callout, code block, link
3. Propose updates cho voice-profile.md theo format:
   ```
   ## Đề xuất update voice-profile.md (session <date>-<slug>)

   ### Add
   - "Y" thay "X" — context: <khi nào>

   ### Avoid
   - "...": <lý do từ session này>

   ### Keep
   - <pattern đã đúng, không cần đổi>
   ```
4. Bro confirm → skill ghi vào voice-profile.md (giữ structure file). Nếu bro skip, ghi vào `voice-changelog.md` (append-only) để session sau xem lại.
5. Optional: clean up `sessions/<date>-<slug>/` nếu thư mục `sessions/` quá 10 entries (giữ 10 bài gần nhất để có thể trace lại).

## Frontmatter

Format chuẩn — xem [templates/frontmatter.mdx](templates/frontmatter.mdx). Required fields:

- `title`: trong dấu nháy kép, có thể có dấu `:` để phân category–subject
- `description`: 1–2 câu hook (60–160 chars là sweet spot cho card + OG image)
- `date`: `YYYY-MM-DD`
- `cover`: optional, format `"/blog/<slug>/cover.webp"` khi bài có cover generated/selected
- `tags`: array, lowercase, ngắn gọn (vd. `["meta", "indie"]`, không `["Indie SaaS Build"]`)
- `published`: `true` (mặc định khi publish)
- `featured`: `false` mặc định

## Anti-patterns (đừng làm)

- **Đừng viết "Hôm nay mình muốn chia sẻ với các bạn..."** hoặc bất cứ corp opener nào. Vào thẳng nội dung.
- **Đừng tag câu kiểu "Hy vọng bài viết hữu ích"** ở cuối. Kết bằng câu thật, hoặc lời mời cụ thể (vd. "Hẹn gặp lại", "Có thắc mắc thì DM", hoặc 1 câu hook cho bài tiếp).
- **Đừng dùng "chúng ta", "ta cần", "ta nên"** trừ khi thật sự inclusive. Mặc định "mình" + "bro/bạn".
- **Đừng emoji** trong bài (nếu emoji là decoration). Chỉ dùng khi nó load nghĩa (vd. ✅ trong checklist roadmap).
- **Đừng review bằng cách rewrite cả đoạn**. Bro mất ownership. Suggest từng điểm thôi.

## Notes for Claude (skill author meta)

- Voice profile sẽ "nhỏ" lúc đầu — đừng sợ, cứ áp dụng những gì có. Khi không chắc, hỏi bro 1 câu thay vì đoán.
- Loop có thể dài (5–10 round) cho bài đầu, ngắn dần (1–2 round) sau vài bài. Đó là dấu hiệu skill đang học đúng.
- Nếu bro có vẻ frustrated cùng 1 issue lặp lại → đó là red flag voice profile thiếu pattern đó. Đề xuất add ngay vào profile, đừng đợi phase 5.

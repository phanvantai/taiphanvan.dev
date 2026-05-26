---
name: blog-cover
description: Create or refresh cover images for taiphanvan.dev blog posts. Use this skill when the user asks for a blog cover, banner, thumbnail, OG-style article image, or wants to add/update the `cover` frontmatter for an MDX post in this repo. Works for existing posts in `content/blog/` and for final drafts produced by the blog-write skill.
---

# Blog Cover

## Mission

Tạo ảnh cover cho bài blog của `taiphanvan.dev` theo nội dung bài, không làm loãng giọng viết và không biến cover thành stock-art chung chung.

Output mong muốn:

- Asset WebP trong `public/blog/<slug>/cover.webp`.
- Frontmatter bài có `cover: "/blog/<slug>/cover.webp"`.
- Prompt/visual direction đủ rõ để regenerate nếu bro muốn chỉnh.

## Khi Bắt Đầu

1. Xác định bài cần cover:
   - Nếu user đưa path/slug, đọc file đó trong `content/blog/`.
   - Nếu đang publish từ `blog-write`, dùng title/description/tags/body của `working.md` hoặc file MDX final.
   - Nếu chưa rõ bài nào, hỏi 1 câu ngắn.
2. Đọc metadata và skim body để lấy:
   - core subject;
   - emotional hook;
   - 2-4 visual motifs;
   - things to avoid.
3. Đọc [references/cover-style.md](references/cover-style.md) trước khi đề xuất direction hoặc tạo ảnh.

## Workflow

### 1. Visual Direction

Đề xuất 2-3 hướng cover ngắn, mỗi hướng gồm:

- concept;
- composition;
- mood/color;
- why it fits bài.

Nếu user đã chọn rõ style/concept, bỏ bước propose và đi thẳng vào prompt.

### 2. Prompt

Viết prompt bằng tiếng Anh để image model dễ hiểu, nhưng giữ concept lấy từ bài tiếng Việt. Prompt phải có:

- subject + scene;
- composition for wide article cover;
- visual style;
- color/lighting;
- negative constraints.

Default aspect ratio: `1200x630` / `1.91:1` vì hợp article cover + OG image.

### 3. Generate

Use the image generation capability for bitmap covers. Do not hand-code SVG cover art unless bro explicitly asks for SVG/vector.

Sau khi có ảnh, lưu/copy bản gốc nếu cần trace, nhưng asset cuối trong repo phải là WebP:

```text
public/blog/<slug>/cover.webp
```

Nếu image tool trả về PNG/JPG, convert sang WebP trước khi gắn vào bài. Dùng quality khoảng `82-88` để giữ cover đẹp nhưng nhẹ. Không overwrite cover cũ nếu user chỉ đang muốn variant; dùng `cover-2.webp`, `cover-alt.webp`, v.v.

### 4. Update MDX

Chỉ update frontmatter khi user đã chọn ảnh hoặc request là "tạo cover và gắn vào bài".

Thêm field:

```yaml
cover: "/blog/<slug>/cover.webp"
```

Đặt gần `description`/`date` để dễ scan. Không rewrite body bài nếu không cần.

### 5. Review

Check nhanh:

- path tồn tại trong `public/blog/<slug>/`;
- frontmatter parse được;
- cover không duplicate một ảnh inline đã dùng với mục đích khác;
- ảnh không chứa text nhỏ khó đọc, UI giả, logo Apple/OpenAI/etc. khi bài không cần.

Nếu repo đã render cover trong UI, chạy lint/typecheck khi có edit code liên quan. Nếu chỉ thêm asset + frontmatter, không cần chạy build trừ khi user muốn.

## Handoff Với blog-write

Khi được gọi từ `blog-write`, skill này không quyết định title/description/tags. Nó chỉ dùng các dữ liệu đó để tạo cover và trả lại `cover` path cho frontmatter.

Nếu bài chưa final, ưu tiên direction có thể sống tốt dù title đổi nhẹ. Nếu bài đã final, bám sát title + description hơn.

## Anti-patterns

- Đừng dùng generic laptop/cafe/coding desk nếu bài không thật sự nói về cảnh đó.
- Đừng tạo cover có nhiều chữ trong ảnh. Title đã render ở page/OG; cover nên carry mood hoặc concept.
- Đừng nhồi quá nhiều symbol kỹ thuật vào một ảnh.
- Đừng tự ý sửa nội dung bài trong lúc làm cover.
- Đừng tự ý publish/commit/push.

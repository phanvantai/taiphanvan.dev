# Đăng bài qua MCP

Site có một MCP server tại `https://taiphanvan.dev/api/mcp`. Công cụ AI nào hỗ trợ MCP (remote,
Streamable HTTP) đều gắn vào được và đăng bài mà không cần biết gì về repo này: nó gửi tiêu đề +
Markdown, server lo slug, ngày, frontmatter, tên file rồi commit vào `content/{locale}/blog/`.
Vercel thấy commit mới trên `main` và deploy — bài lên sau khoảng hai phút.

## Cài đặt một lần

1. **Tạo token đăng bài**: `openssl rand -hex 32`. Đây là chìa khoá đăng bài lên site.
2. **Tạo GitHub token**: GitHub → Settings → Developer settings → Fine-grained tokens. Chỉ chọn repo
   `taiphanvan.dev`, quyền **Contents: Read and write**.
3. **Khai báo trên Vercel** (Settings → Environment Variables, môi trường Production), rồi redeploy:

   | Name | Value |
   | --- | --- |
   | `MCP_PUBLISH_TOKEN` | token ở bước 1 (tối thiểu 32 ký tự) |
   | `CONTENT_GITHUB_TOKEN` | token ở bước 2 |

4. **Gắn vào công cụ AI** theo một trong hai cách:
   - Có ô nhập header: URL `https://taiphanvan.dev/api/mcp`, header
     `Authorization: Bearer <MCP_PUBLISH_TOKEN>`.
   - Chỉ nhập được URL: `https://taiphanvan.dev/api/mcp/<MCP_PUBLISH_TOKEN>`. Khi đó cả URL là bí
     mật — đừng dán nó vào chỗ công khai.

Thiếu `MCP_PUBLISH_TOKEN` thì endpoint trả 503; lộ token thì đổi giá trị trên Vercel và redeploy.

## Công cụ

| Tool | Việc |
| --- | --- |
| `publish_post` | Đăng bài mới: `title`, `content` (Markdown); tuỳ chọn `description`, `tags`, `slug`, `date`, `locale`, `draft` |
| `update_post` | Sửa bài theo `slug`; `draft: true` để ẩn bài |
| `list_posts` | Liệt kê bài mới nhất, kể cả nháp |
| `get_post` | Đọc metadata + nội dung một bài |
| `delete_post` | Xoá hẳn bài (vẫn còn trong lịch sử git) |

## Quy ước

- Bài đăng qua MCP lưu thành `.md` và được compile như Markdown thuần: không JSX, không biểu thức,
  HTML thô bị bỏ. Nhờ vậy ký tự `<` hay `{` trong bài không thể làm hỏng build.
- Bài viết tay vẫn là `.mdx` và dùng được `<Callout>`, `<Image>`. Qua MCP chỉ sửa được metadata của
  các bài này, không thay được nội dung.
- Mặc định `locale` là `vi`, ngày là hôm nay theo giờ Việt Nam, mô tả lấy từ đoạn đầu bài.
- Ảnh: chỉ dùng được ảnh có URL https công khai; chưa có tool upload ảnh.

## Kiểm tra nhanh

```bash
curl -s https://taiphanvan.dev/api/mcp \
  -H "Authorization: Bearer $MCP_PUBLISH_TOKEN" \
  -H "Content-Type: application/json" -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

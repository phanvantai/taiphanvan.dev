# Voice changelog

Append-only log từ phase 5 (post-publish learning) của mỗi session. Skill ghi vào đây kể cả khi bro skip update voice-profile.md, để session sau xem lại.

Format mỗi entry:

```markdown
## YYYY-MM-DD — slug

**Round count**: N (ít round = giọng đã sát; nhiều round = pattern chưa đầy đủ)

### Pattern phát hiện
- ...

### Đã merge vào voice-profile.md
- ✅ ...
- ❌ Bro skip

### Notes
- ...
```

---

<!-- entries below -->

## 2026-05-10 — 2026-05-07-hello-world

**Round count**: 3 (initial draft → format/tightening → description+roadmap+em-dash). Bài đầu, voice profile thin → kỳ vọng giảm dần.

### Pattern phát hiện

- **Reflective Intro section pattern** cho meta/manifesto posts — bro tự thêm section `## Intro` 3 đoạn personal trước structural content. Pattern: difficulty acknowledged → soft commitment with explicit rule → poetic close.
- **VN chat emoji `=))`** mới — bro dùng giữa intro để soften self-promise. Voice profile chưa có.
- **Title EN-subtitle khi carry tên/concept** — bro replace `Hello world: canvas cá nhân, không gò bó domain` → `Hello world: Tai is calling`. EN subtitle punchier khi nó carry persona.
- **Reader disclaimer pattern** — bro thêm "đậm tính cá nhân, ... hoặc không, bạn có thể cứ lặng lẽ rời đi" sau canvas claim. Set expectation + give reader agency.
- **Description phải sync title vibe** — bro accept đề xuất sync description với "Sau nhiều năm lặng lẽ, mình cất tiếng." để khớp title.

### Anti-pattern phát hiện

- **Defensive SEO/algorithm awareness** — bro xoá "không tối ưu cho thuật toán phân phối nào". Phá personal/canvas tone.
- **Manufactured-casual filler** — bro xoá "Tuỳ mood mình hôm đó", thay bằng substantive reader disclaimer. Sounds rehearsed-casual.

### Đã merge vào voice-profile.md

- ✅ VN chat emoji rule trong Tone
- ✅ 2 anti-patterns trong "Từ ngữ — tránh"
- ✅ Reflective Intro pattern + Reader disclaimer pattern trong Cấu trúc bài
- ✅ Tiêu đề (title pattern) section mới
- ✅ Description (frontmatter) section mới

### Notes

- Workflow gap: bro edit `draft-0.md` trực tiếp → diff so sánh phải dùng chat history thay vì 2 file. Đã fix SKILL.md: Phase 3 sẽ copy `draft-0.md` thành `working.md` ngay khi enter loop, giữ `draft-0` immutable.
- Title của voice profile sẽ test session sau: kỳ vọng round count drop về 1–2.

---

## Session 2026-10-29-bach-dang-tap-lam-game-bang-roi-nuoc (~1 round, đã merge vào voice-profile.md + SKILL.md)

Bro không sửa prose, chỉ sửa nội dung: mốc chơi thử 02/11 bị hoãn.

### Đề xuất

- **Avoid**: ghi ngày / mốc kế hoạch cụ thể (vd. "Ngày 02/11 chương 1 lên điện thoại") và chi tiết thủ tục (luật 14 ngày / 12 người của Google Play) ở phần kết. Kế hoạch chưa chắc thì "nói qua qua": "Bước tiếp theo là mời chơi thử…".
- **Workflow**: "đẩy lên" = publish + commit + push lên `main`, không chỉ ghi file. Cân nhắc sửa Phase 4 của SKILL.md (hiện ghi "KHÔNG commit, KHÔNG push").

### Keep

- Bài AI-built: nhắc qua Claude, focus vai định hướng + chốt.
- Credit nguồn kèm link tại chỗ (Claude Code Game Studios).
- 1 Callout/bài, `=))` ở mở bài và kết, kết bằng hook bài sau.

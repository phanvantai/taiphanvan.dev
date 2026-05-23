---
title: "QuickSpend now really quick, finally"
description: "QuickSpend 3.0 thêm voice-first flow qua Siri + Shortcuts — chi tiêu nhanh đến mức không cần mở app. Bonus: cuộc chiến nắm tay Siri."
date: "2026-05-23"
tags: ["quickspend", "ios", "siri", "indie"]
published: true
featured: false
---

[QuickSpend](https://apps.apple.com/us/app/quickspend-instant-tracker/id6754815176) là app iOS mình build để log chi tiêu nhanh bằng câu nói tự nhiên — và phiên bản 3.0 sắp ship, cuối cùng cũng đúng cái tên `Quick`. Đặt tên `Quick` từ v1, sau hai phiên bản mới thấy hơi sai sự thật, giờ thì thấy hợp lí rồi =)).

![it's over, finally](/blog/quickspend-3/frodo-finally.jpg)

## Vấn đề: app "quick" nhưng vẫn chưa đủ quick

QuickSpend ban đầu mình build cho chính mình dùng — eat own dogfood, ít nhất để sản phầm mọi người dùng được thì mình phải dùng được và thấy ổn trước đã. Dùng vài tháng thì lộ ra một điều khá đau lòng: chính mình vẫn quên ghi chi tiêu đều đặn =)).

Lý do thì quá đơn giản, vấn đề chắc chắn ai cũng gặp, quá lười, quá vội để note lại chi tiêu.

Cuối tháng nhìn lại chart, data thưa như tóc mình sau 30 tuổi. Vậy là vấn đề không nằm ở app, nó nằm ở **bước phải mở app**. Cái cần loại bỏ chính là cái đó. Mình muốn một flow mà user chỉ cần nói "chi tiêu nhanh 50k trà sữa" là xong, không cần tap gì hết, không cần nhìn màn hình, đẹp như mơ.

## Hướng xử lý: đẩy entry point ra khỏi app

Trên iOS có hai con đường rõ ràng:

- **Nói thẳng với Siri** — kịch bản đẹp nhất, không tap gì hết, sang chảnh như quảng cáo Apple.
- **Shortcuts** — backup thực dụng cho khi Siri trở chứng. Trigger được bằng tap, widget, hoặc gọi qua Siri đều ngon.

Siri thì... vẫn ngu ngu, đôi khi mình hỏi giờ Hà Nội còn trả lời sai múi giờ =)). Nhưng Shortcuts là vũ khí mạnh thật trong hệ sinh thái Apple — một khi setup xong nó chỉ là một nút bấm. Nên mình build cả hai, dùng Shortcuts làm safety net để khi Siri drop ball thì user vẫn không bị chặn.

## Luồng mới: hai kịch bản

### Kịch bản 1 — qua Shortcut (path luôn work)

> "Hey Siri, chi tiêu nhanh."

Siri trigger shortcut → shortcut hỏi lại "nội dung gì?" → user nói câu tự nhiên (ví dụ "50k trà sữa") → loading → AI parser xử lý.

Hai nhánh tuỳ confidence của parser:

- **Confidence cao**: app lưu luôn, Siri thông báo "đã ghi", end flow. Không cần mở app, không cần nhìn màn hình, đẹp như mơ.
- **Confidence thấp**: app mở ra với UI listing transaction được parse, user confirm hoặc chỉnh trước khi lưu. App không tự tin thì cứ hỏi, hơn là lưu bừa rồi user phải vào sửa.

### Kịch bản 2 — gọi thẳng app qua Siri (path đôi khi work)

> "Hey Siri, dùng Chi tiêu nhanh để thêm chi tiêu 50k uống trà sữa."

Kịch bản đẹp: Siri hiểu intent, gọi thẳng app, app nhận text Siri đã transcribe sẵn → AI parser xử lý y hệt luồng trên. **Đỡ hẳn một bước** — user không phải đợi Siri hỏi lại "nội dung gì". Sướng phải không nào?

Đời không như là mơ. Mình test khá nhiều lần, kết quả không hề ổn định =)). Siri lúc bắt được app name, lúc nhận thành app khác, lúc thì cười khẩy gọi Google. Đây chính là lý do Shortcut variant tồn tại — nó là cái path mình tin được, khi Siri đang có hứng làm việc thì kịch bản 2 mới đẹp.

Nghe đồn với Apple Intelligence thì Siri sẽ thông minh hơn, hy vọng là vậy để kịch bản 2 ổn định hơn trong tương lai. Hiện tại thì mình chưa test được vì đang chỉ có iPhone 15, bro nào có iPhone 16 Pro hoặc 17 thử giúp mình xem Apple Intelligence có cứu được kịch bản 2 không nhé 😂.

## Mấy vấn đề khi build feature này

**Đồng bộ ngôn ngữ giữa Siri và app**. Trước đó QuickSpend tách ngôn ngữ hiển thị và ngôn ngữ transcribe — user có thể chạy UI tiếng Anh nhưng voice input tiếng Việt, kiểu menu Tây mà order Việt. Khi thêm Siri vào, separation đó vỡ — Siri chỉ nói một ngôn ngữ tại một thời điểm theo system. Mình phải bỏ tách biệt đó, gộp về một locale duy nhất. Trade-off đáng vì consistency quan trọng hơn flexibility mà chắc chỉ có mỗi mình dùng.

**Tên app khi Siri gọi**. Như đã thấy ở kịch bản 2 — Siri nhận diện app name không ổn định, đặc biệt khi user trộn Anh–Việt trong câu lệnh. Mình thử nhiều phrasing alternate, kết quả tốt nhất hiện tại vẫn là: đừng tin Siri, dùng Shortcut.

## Phần kỹ thuật (skip OK nếu không quan tâm)

<Callout type="info">
Section này dành cho ai tò mò Apple stack. Không quan trọng để dùng feature — nhảy thẳng xuống [phần tổng kết](#tổng-kết) cũng được.
</Callout>

Ba thành phần chính:

- **App Intent** — định nghĩa action mà Siri và Shortcuts có thể gọi. Mình expose một intent duy nhất `Add Expense` nhận free-form text làm parameter, để parser tự handle phần còn lại thay vì force user phải nói theo format cứng.
- **Siri capability** — declare intent vocabulary để Siri hiểu phrasings như "chi tiêu nhanh", "thêm chi tiêu". Cái này khai báo trong `AppShortcuts` để Siri biết app phục vụ domain finance/logging.
- **Shortcuts ship sẵn** — app kèm shortcut mặc định, user không cần tự build từ đầu. Có nút "Add to Shortcuts" ngay trong app để onboard một tap.

Code chi tiết để dành bài khác — bài này dài quá thì bro lại skip mất.

## Tổng kết

Sau patch 3.0, QuickSpend cuối cùng cũng đúng cái tên `Quick`:

- ✅ **Voice-first flow**: log chi tiêu không cần mở app trong happy path.
- ✅ **Shortcut safety net**: luôn có path ổn định khi Siri trở chứng.
- ✅ **AI parser auto-save** khi confidence cao — Siri thông báo, không gián đoạn flow của user.

Điểm chưa ổn:

- ❌ Kịch bản "gọi thẳng app qua Siri" còn flaky. Mình đổ lỗi cho Siri, không nhận =)).
- ❌ Chưa test được với Siri có Apple Intelligence vì chưa lên đời máy xịn hơn iPhone 15. Bro nào có iPhone 16 Pro hoặc 17 thử giúp mình, nếu Apple Intelligence cứu được kịch bản 2 thì mình sẽ rất biết ơn.

Feature này thực sự hữu ích với chính mình — ba ngày qua data trong app full hơn cả tháng trước cộng lại. Nếu bro cũng dùng QuickSpend, update lên 3.0 khi nó ship và quẩy thử. Feedback gì cứ ib mình hoặc gửi qua form feedback trong app — mình đọc hết.

Hẹn gặp lại ở bài sau.

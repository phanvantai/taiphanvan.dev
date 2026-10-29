---
title: "Bạch Đằng: tập làm game bằng rối nước"
description: "Game đầu tay của mình: trận Bạch Đằng năm 938 kể lại bằng rối nước, tranh khắc gỗ và những con nước phải canh đúng nhịp."
date: "2026-10-29"
tags: ["bach-dang", "gamedev", "godot", "ai-coding"]
published: true
featured: false
---

Mình chưa làm game bao giờ. App thì ship được mấy cái rồi, nhưng game là một thế giới khác hẳn: có kịch bản, có nhịp, có cái "game feel" mà trước giờ mình chỉ biết qua... chơi =)). Một tháng nay mình tập tành làm game đầu tay, tên là **Bạch Đằng**.

Chủ đề thì không phải nghĩ lâu. Sử Việt có những trận đánh ai cũng thuộc — bãi cọc, con nước, thuyền giặc mắc cạn — nhưng hiếm khi được kể bằng game. Còn hình ảnh thì có sẵn một thứ rất Việt Nam mà người nước ngoài nhìn là nhận ra: múa rối nước.

## Game kể chuyện trên sông Bạch Đằng

Bạch Đằng là game kể chuyện có lựa chọn. Mỗi chương là một trận trên sông Bạch Đằng: năm 938 Ngô Quyền, năm 981 Lê Hoàn, năm 1288 Trần Hưng Đạo. Hiện mình mới làm chương 1, tên ngắn gọn: **938**.

Các bạn vào vai Dương Lãng, con trai một người chài bị cả làng coi là "kẻ dẫn giặc". Lãng được Dương Đình Nghệ nhận làm con nuôi, rồi phải đọc con nước để giăng bẫy cọc cho Ngô Quyền — trong khi người cha tưởng đã chết lại đang đứng mũi hạm đội Nam Hán. Câu hỏi xuyên suốt chương: *"Làm con thì nợ ai?"*

Một lần chơi khoảng 35–45 phút, gồm 22 cảnh, 5 quyết định lớn và 7 kết cục.

## Rối nước, tranh khắc gỗ và chú Tễu

Phần mình khoái nhất là cách diễn. Nhân vật là con rối có khớp — đầu, thân, tay hai khúc — nhấp nhô như trên mặt nước, diễn trên sân khấu thủy đình. Màu lấy từ tranh khắc gỗ dân gian: giấy điệp, đỏ son, vàng hoè, chàm. Nhạc là đàn bầu, sáo trúc, trống, chiêng, điệu hò kéo lưới.

Như một buổi rối nước thật, **chú Tễu** ra mở màn và khép màn. Tễu vẽ theo lối tranh Đông Hồ, đứng ngoài truyện. Giữa các hồi, khi rèm đỏ son kéo kín, Tễu ra pha vài câu hóm hỉnh với bà con — nhưng không bao giờ đùa về cái chết hay về sử.

Game cũng theo nguyên tắc "diễn chứ không kể": cảnh tự chạy theo đoạn như xem phim, phụ đề tối đa 2 hàng, người chơi chỉ chạm ở cuối đoạn, lúc chọn và lúc tương tác. Cảnh 1 dài khoảng 3 phút mà chỉ cần 4 lần chạm.

## Lịch sử là xương sống

Làm game về sử rất dễ trượt sang một trong hai cực: bóp méo cho kịch tính, hoặc giọng tuyên truyền. Nên trước khi viết cảnh nào, mình chốt mấy luật:

- **Chính sử giữ nguyên ở mọi nhánh**: người chơi chỉ quyết định trong những khoảng trống mà sử không ghi.
- **Hư cấu có nhãn**: mỗi chi tiết gắn tầng nguồn — [CS] chính sử, [TT] thần tích, [SL] suy luận hiện đại, [HC] hư cấu.
- **Đối thủ là người thật**: phía Nam Hán có người khôn kẻ dại, có lời can đúng. Thắng một đối thủ đáng gờm thì chiến thắng mới có sức nặng.
- **Thua cũng không đổi sử**: kết cục xấu luôn khép bằng câu *"Nhưng lịch sử đã không diễn ra như thế."*

Cuối chương có màn **"Lịch sử thật"** tách bạch đâu là sử chép, đâu là game viết thêm. Có một chi tiết khá vui: Hoằng Tháo chết ở Bạch Đằng, nhưng Toàn thư, Cương mục và Tân Ngũ Đại sử mỗi bộ ghi một kiểu. Lựa chọn cuối của người chơi sẽ khớp với một trong ba cách đó.

## Canh con nước

Ngoài lựa chọn, cơ chế chính là **canh con nước**, 3 lượt: kéo vạch trên cây sào để đặt độ cao cọc, xuất thuyền mồi, phất cờ xuất kích. Mực nước chạy theo nhật triều — gần đỉnh thì chậm, rút giữa chừng thì nhanh. Lựa chọn trước đó cũng ăn vào đây: càng hiểu sông, cửa sổ thời gian càng rộng.

Mình thích nhất chỗ lòng tin biến thành cơ chế. Khi Ngô Quyền chưa tin Lãng, người cầm cờ là Tam Kha, và lá cờ phất chậm hơn cú bấm của các bạn một nhịp.

Cân bằng thì cho chạy hết 81 tổ hợp quyết định: canh nước giỏi thì phần lớn đường đi tới kết cục tốt nhất, canh trung bình thì không, và không có tổ hợp nào luôn đúng.

## Web trước, Godot sau

Bản đầu mình làm trên web — JavaScript, SVG, nhạc tổng hợp bằng Web Audio. Từ kịch bản tới đủ 22 cảnh có hoạt hình mất khoảng hai ngày, rồi mời người chơi thử ba lượt và sửa theo feedback.

Câu chuyện đứng được, nhưng điện thoại thì không: bố cục vỡ, nên bản web phải tạm chặn điện thoại. Thay vì đắp tiếp, mình coi bản web là một **bản đặc tả chạy được** và làm lại từ đầu cho iOS, Android trên Godot 4.7.

Lý do chọn Godot khá thực dụng. Hình trong game vẽ bằng code, nên engine nào cho làm mọi thứ bằng file chữ — cảnh, hoạt cảnh, dữ liệu — sẽ nhanh hơn hẳn engine nặng thao tác kéo thả trong editor.

Port 22 cảnh sang Godot chia 5 đợt, xong trong một ngày. Phần tốn công là chạy trên máy thật: con Pixel 3 cũ bị văng game ngang cảnh 9 vì rò bộ nhớ ảnh. Phải sửa rò, ẩn phần cảnh nằm dưới màn canh nước, làm shader khắc gỗ rẻ hơn và tự hạ độ nét khi tụt khung hình thì mới giữ được 60 fps.

## Claude làm, mình chốt

Code, hình vector, nhạc tổng hợp, tài liệu — gần như toàn bộ là Claude làm. Vai của mình là định hướng và chốt: tinh thần dự án, luật với lịch sử, giọng kể, chuyện gì giữ chuyện gì cắt.

Mọi thứ đi qua vòng *phân tích → sửa → chốt*, và bản chốt mới nhất là chuẩn. Kịch bản viết lại ba lần trong một ngày, phân cảnh review từng cảnh một, lời 22 cảnh viết lại theo giọng người phường rối kể tích. Chú Tễu ra giữa hồi ba lần cũng là một quyết định mình chốt sau khi cân nhắc.

<Callout type="info">
Claude không thay được chuyên gia sử và hải văn. Bản thử thì đủ, nhưng trước khi phát hành công khai, game cần người có chuyên môn duyệt lại sử và con nước.
</Callout>

Gần đây mình cài thêm [Claude Code Game Studios](https://github.com/donchitos/claude-code-game-studios) — bộ agent, skill, hook dựng sẵn quy trình của một studio game — để làm một vòng chơi mới: **hỏi người**. Ở cảnh truy kẻ nội ứng, Lãng phải hỏi từng người, nối các thẻ lời khai trong Sổ tay và bác từng lời tố bằng chứng cứ, chỉ trong 6 lượt hỏi.

## Sắp lên sân khấu

Ngày 02/11, chương 1 sẽ lên điện thoại cho những người được mời, qua TestFlight trên iOS và thử nghiệm kín trên Android. Phát hành công khai tính sau, khi đã chơi thử đủ và có người duyệt sử.

Google Play bắt tài khoản cá nhân mới chạy thử kín ít nhất 14 ngày với 12 người, nên bạn nào muốn xem buổi diễn sớm thì đăng ký ở [bachdang.taiphanvan.dev](https://bachdang.taiphanvan.dev) — giúp mình gom đủ quân =)).

Rèm đỏ son sắp mở. Hẹn các bạn ở bài sau, khi có feedback đợt chơi thử đầu tiên.

# Cover Style — taiphanvan.dev

## Direction

Cover nên có cảm giác personal indie maker, hơi cinematic, không stock-photo corporate. Bài có thể rất technical nhưng hình vẫn nên gợi được vấn đề hoặc khoảnh khắc, không chỉ minh hoạ tool.

## Fit Với Site

- Dùng cover như article image, không phải hero marketing.
- Ưu tiên composition rõ ở wide crop `1.91:1`.
- Subject chính nên đọc được ở mobile crop.
- Có thể dùng mood hơi filmic/cyber/terminal tùy bài, nhưng tránh biến mọi cover thành một palette duy nhất.

## Prompt Defaults

Base defaults:

- wide editorial blog cover, 1200x630, 1.91:1;
- cinematic but restrained;
- realistic or high-quality illustration, tùy topic;
- clean composition with one main focal point;
- no small text, no watermark, no fake UI text, no brand logos unless explicitly needed.

For product/build posts:

- show the product idea or user flow metaphor, not just code on a laptop;
- include subtle device/app context only when relevant;
- avoid exact third-party UI replication.

For reflective/personal posts:

- use environment, object, light, or silhouette as metaphor;
- avoid overdramatic fantasy imagery;
- keep it grounded.

For technical deep dives:

- abstract system/map/diagram-inspired visuals are OK;
- keep diagrams visual, not text-heavy;
- avoid unreadable pseudo-code as the main subject.

## Negative Prompt Pattern

Use or adapt:

```text
No readable text, no watermark, no logo, no fake app UI labels, no cluttered composition, no stock photo look, no smiling corporate team, no generic laptop on coffee table unless specifically requested.
```

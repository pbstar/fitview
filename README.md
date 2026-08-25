# FitView

视口自适应 JS 插件，一行代码让固定尺寸的大屏设计稿自适应任意容器，支持 `fill` / `contain` / `scroll` / `hidden` 四种适配模式。

基于 CSS `transform: scale` 实现缩放，配合 `ResizeObserver` 实时监听容器变化。零运行时依赖，原生 TypeScript 类型支持。

## 特性

- 四种适配模式：`fill` / `contain` / `scroll` / `hidden`，覆盖大屏主流布局需求
- 运行时动态切换适配模式（`setMode`）
- 显式指定设计稿尺寸（`designWidth` / `designHeight`），也支持自动读取
- 基于 `ResizeObserver` 实时监听容器尺寸变化
- 尺寸变化回调（`onResize`），便于联动外部逻辑
- 原生 TypeScript 类型支持
- 零运行时依赖

## 安装

### npm

```bash
npm install fitview
```

```javascript
import { createFitView } from "fitview";
// 或使用默认导出
import createFitView from "fitview";
```

### CDN

```html
<script src="https://unpkg.com/fitview@[version]/lib/fitview.umd.js"></script>
<script>
  FitView.createFitView({ el: document.getElementById("container") });
</script>
```

> UMD 构建的全局变量名为 `FitView`。

## 快速开始

```html
<div id="container">
  <!-- 设计稿内容，固定 1920 × 1080 -->
  <div class="screen">...</div>
</div>
```

```javascript
import { createFitView } from "fitview";

const fv = createFitView({
  el: document.getElementById("container"),
  mode: "contain", // 适配模式
  watch: true, // 是否监听容器尺寸变化
  onResize: ({ width, height, scaleX, scaleY, mode }) => {
    console.log({ width, height, scaleX, scaleY, mode });
  },
});

// 动态切换适配模式
fv.setMode("scroll");

// 手动重新计算
fv.update();

// 销毁实例，断开监听
fv.destroy();
```

## 适配模式

| 模式      | 缩放策略         | 表现                           | 适用场景           |
| --------- | ---------------- | ------------------------------ | ------------------ |
| `fill`    | 宽高独立缩放     | 内容被拉伸变形，完全填满容器   | 不关心形变的背景   |
| `contain` | 等比缩放（取小值） | 完整显示内容，两侧或底部留白   | 需完整展示、不裁剪 |
| `scroll`  | 等比缩放（取大值） | 填满容器，超出部分滚动查看     | 填满且需滚动查看   |
| `hidden`  | 等比缩放（取大值） | 填满容器，超出部分裁剪隐藏     | 填满且接受裁切     |

> 类比 CSS `background-size`：`fill` ≈ `100% 100%`，`contain` ≈ `contain`，`scroll` / `hidden` ≈ `cover`（区别在于超出部分是滚动还是隐藏）。

## 配置项

`createFitView(options)` 接收以下配置项：

| 参数           | 类型                        | 默认值     | 说明                                                   |
| -------------- | --------------------------- | ---------- | ------------------------------------------------------ |
| `el`           | `HTMLElement`               | 必填       | 自适应容器元素，必须有且只有一个子元素                 |
| `mode`         | `FitMode`                   | `"contain"` | 适配模式                                               |
| `watch`        | `boolean`                   | `true`     | 是否监听容器尺寸变化                                   |
| `designWidth`  | `number`                    | 子元素宽度 | 设计稿宽度，与 `designHeight` 成对出现                 |
| `designHeight` | `number`                    | 子元素高度 | 设计稿高度，与 `designWidth` 成对出现                  |
| `onResize`     | `(info: FitViewInfo) => void` | -          | 尺寸变化回调                                           |

### 设计稿尺寸

缺省时，FitView 从第一个子元素的 `offsetWidth` / `offsetHeight` 自动读取设计稿尺寸；也可显式指定 `designWidth` / `designHeight`，此时子元素尺寸不再参与计算：

```javascript
createFitView({
  el: container,
  designWidth: 1920,
  designHeight: 1080,
});
```

> `designWidth` 与 `designHeight` 必须成对提供，且为正数。

## 控制器方法

`createFitView` 返回控制器对象，提供以下方法：

| 方法             | 说明                       |
| ---------------- | -------------------------- |
| `update()`       | 重新计算尺寸并适配         |
| `setMode(mode)`  | 动态切换适配模式           |
| `destroy()`      | 销毁实例，断开尺寸监听     |

## TypeScript 类型

以下类型从入口导出，可直接引用：

```typescript
import type { FitMode, FitViewOptions, FitViewInfo, FitViewController } from "fitview";
```

## 注意事项

- 容器 `el` 必须有且只有一个子元素，否则抛出 `Error`。
- 当容器或设计稿任一尺寸为 `0`（如 `display: none`）时，本次适配自动跳过，尺寸恢复后重新适配。
- `contain` 模式下垂直方向留白默认顶部对齐；`hidden` 模式下水平方向居中裁剪。
- `watch: false` 时仅初始化执行一次适配，不再监听尺寸变化，此时可手动调用 `update()` 触发。

## 迁移指南（0.x → 1.x）

1.x 进行了彻底的 API 重设计，与 0.x 不兼容：

| 0.x                       | 1.x                             |
| ------------------------- | ------------------------------- |
| `new fitview({ ... })`    | `createFitView({ ... })`        |
| `fit: "contain"`          | `mode: "contain"`               |
| `resize: false`           | `watch: false`                  |
| `api.refresh()`           | `update()`                      |
| `api.destroyResize()`     | `destroy()`                     |
| -                         | `setMode(mode)`                 |
| -                         | `designWidth` / `designHeight`  |
| -                         | `onResize`                      |
| UMD 全局 `fitview`        | UMD 全局 `FitView`              |

## License

[MIT](./LICENSE)

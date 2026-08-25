## FitView 官方文档

[![](https://img.shields.io/badge/GitHub-E34C26.svg)](https://github.com/pbstar/fitview)
[![GitHub license](https://img.shields.io/github/license/pbstar/fitview?style=flat&color=109BCD)](https://github.com/pbstar/fitview?tab=MIT-1-ov-file#readme)
[![GitHub stars](https://img.shields.io/github/stars/pbstar/fitview?style=flat&color=d48806)](https://github.com/pbstar/fitview/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/pbstar/fitview?style=flat&color=C6538C)](https://github.com/pbstar/fitview/forks)
[![NPM Version](https://img.shields.io/npm/v/fitview?style=flat&color=d4b106)](https://www.npmjs.com/package/fitview)
[![npm bundle size](https://img.shields.io/bundlephobia/min/fitview?style=flat&color=41B883)](https://www.npmjs.com/package/fitview)

FitView 是一个视口自适应 JS 插件，支持多种适配模式，能够快速实现大屏自适应效果。

### 特性

- 四种适配模式：`fill` / `contain` / `scroll` / `hidden`
- 支持动态切换适配模式（`setMode`）
- 支持显式指定设计稿尺寸（`designWidth` / `designHeight`）
- 支持尺寸变化回调（`onResize`）
- 原生 TypeScript 类型支持
- 零运行时依赖

### 配置

`createFitView(options)` 接收以下配置项：

| 参数           | 类型                        | 默认值       | 说明                                                   |
| -------------- | --------------------------- | ------------ | ------------------------------------------------------ |
| el             | HTMLElement                 | 必填         | 需要自适应的容器元素，必须有且只有一个子元素           |
| mode           | FitMode                     | `"contain"`  | 适配模式                                               |
| watch          | boolean                     | `true`       | 是否监听容器尺寸变化                                   |
| designWidth    | number                      | 子元素宽度   | 设计稿宽度，与 `designHeight` 成对出现                 |
| designHeight   | number                      | 子元素高度   | 设计稿高度，与 `designWidth` 成对出现                  |
| onResize       | (info: FitViewInfo) => void | -            | 尺寸变化回调                                           |

> 设计稿尺寸缺省时，从第一个子元素的 `offsetWidth` / `offsetHeight` 读取；显式传入 `designWidth` / `designHeight` 后，子元素尺寸不再参与计算。

#### fit 适配模式

- `fill`：拉伸，内容会被拉伸变形，使整个内容完全填充此视口框。
- `contain`：包含，内容不会被拉伸变形，使整个内容在填充此视口框时对两侧或底部添加“黑边”。
- `scroll`：滚动，内容不会被拉伸变形，使整个内容完全填充此视口框时对超出视口的内容添加滚动条。
- `hidden`：隐藏，内容不会被拉伸变形，使整个内容完全填充此视口框时对超出视口的内容隐藏。

### 方法

控制器提供以下方法：

| 方法            | 说明                       |
| --------------- | -------------------------- |
| update()        | 重新计算元素尺寸并适配     |
| setMode(mode)   | 动态切换适配模式           |
| destroy()       | 销毁实例，断开尺寸变化监听 |

### 类型

以下类型从入口导出，可在 TypeScript 中直接引用：

```typescript
import type { FitMode, FitViewOptions, FitViewInfo, FitViewController } from "fitview";
```

### 安装引入

#### npm 安装

```bash
npm install fitview
```

#### esm 引入

```javascript
import { createFitView } from "fitview";
// 或使用默认导出
import createFitView from "fitview";
```

#### cdn 引入

```html
<script src="https://unpkg.com/fitview@[version]/lib/fitview.umd.js"></script>
<script>
  FitView.createFitView({ el: document.getElementById("container") });
</script>
```

### 使用示例

```html
<div id="container">
  <div style="width:1920px;height:1080px;"></div>
</div>
```

```javascript
import { createFitView } from "fitview";

const container = document.getElementById("container");

const fv = createFitView({
  el: container,
  mode: "contain", // 适配模式
  watch: true, // 是否监听尺寸变化
  onResize: ({ width, height, scaleX, scaleY, mode }) => {
    console.log(width, height, scaleX, scaleY, mode);
  },
});

// 动态切换适配模式
fv.setMode("scroll");

// 手动重新计算
fv.update();

// 销毁实例
fv.destroy();
```

#### 显式设计稿尺寸

```javascript
createFitView({
  el: container,
  designWidth: 1920,
  designHeight: 1080,
});
```

### 迁移指南（0.x → 1.x）

1.x 进行了彻底的 API 重设计，与 0.x 不兼容，迁移对照如下：

| 0.x                          | 1.x                                |
| ---------------------------- | ---------------------------------- |
| `new fitview({ ... })`       | `createFitView({ ... })`           |
| `fit: "contain"`             | `mode: "contain"`                  |
| `resize: false`              | `watch: false`                     |
| `api.refresh()`              | `update()`                         |
| `api.destroyResize()`        | `destroy()`                        |
| -                            | `setMode(mode)`                    |
| -                            | `designWidth` / `designHeight`     |
| -                            | `onResize`                         |
| UMD 全局 `fitview`           | UMD 全局 `FitView`                 |

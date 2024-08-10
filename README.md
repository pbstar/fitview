## fitview 官方文档

[![](https://img.shields.io/badge/GitHub-E34C26.svg)](https://github.com/pbstar/fitview)
[![GitHub license](https://img.shields.io/github/license/pbstar/fitview?style=flat&color=109BCD)](https://github.com/pbstar/fitview?tab=MIT-1-ov-file#readme)
[![GitHub stars](https://img.shields.io/github/stars/pbstar/fitview?style=flat&color=d48806)](https://github.com/pbstar/fitview/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/pbstar/fitview?style=flat&color=C6538C)](https://github.com/pbstar/fitview/forks)
[![NPM Version](https://img.shields.io/npm/v/fitview?style=flat&color=d4b106)](https://www.npmjs.com/package/fitview)
[![npm bundle size](https://img.shields.io/bundlephobia/min/fitview?style=flat&color=41B883)](https://www.npmjs.com/package/fitview)

fitview 是一个视口自适应 js 插件，它支持多种适配模式，能够快速实现大屏自适应效果。

### 配置

- el: 需要自适应的 DOM 元素
- fit: 自适应模式，字符串，可选值为 fill、contain（默认值）、scroll、hidden
- uw: 设计稿宽度，数值，默认值 1920
- uh: 设计稿高度，数值，默认值 1080
- resize: 是否监听 resize 事件，布尔值，默认值 true

### 适配模式

- fill: 拉伸，视口宽高比不变，视口宽高小于设计稿宽高时，内容会被拉伸，视口宽高大于设计稿宽高时，内容会被压缩。
- contain: 包含，视口宽高比不变，视口宽高小于设计稿宽高时，内容会被压缩，视口宽高大于设计稿宽高时，内容会被拉伸。
- scroll: 滚动，视口宽高比不变，视口宽高小于设计稿宽高时，内容会被压缩，视口宽高大于设计稿宽高时，内容会被拉伸，内容超出视口时，会出现滚动条。
- hidden: 隐藏，视口宽高比不变，视口宽高小于设计稿宽高时，内容会被压缩，视口宽高大于设计稿宽高时，内容会被拉伸，内容超出视口时，内容会被隐藏。

### 安装引入

#### npm 安装

```bash
npm install fitview
```

#### esm 引入

```javascript
import fitview from "fitview";
```

#### cdn 引入

```html
<script src="https://unpkg.com/fitview@[version]/lib/fitview.umd.js"></script>
```

### 使用示例

```html
<div id="container"></div>
```

```javascript
const container = document.getElementById("container");
new pSeamlessScroll({
  el: container,
});
```

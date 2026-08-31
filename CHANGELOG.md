# Changelog

本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [1.0.0](https://github.com/pbstar/fitview/compare/v0.3.3...v1.0.0) - 2026-08-31

### ⚠ 破坏性变更

- API 彻底重设计：`new fitview({ el, fit, resize })` 改为函数式工厂 `createFitView({ el, mode, watch })`
- 配置项重命名：`fit` → `mode`，`resize` → `watch`
- 方法变更：`api.refresh()` → `update()`，`api.destroyResize()` → `destroy()`，移除 `.api` 中间层
- UMD 全局变量名由 `fitview` 改为 `FitView`
- 参数校验失败由 `console.warn` 改为抛出 `Error`

### 新增

- `setMode(mode)` 动态切换适配模式
- `designWidth` / `designHeight` 显式指定设计稿尺寸
- `onResize` 尺寸变化回调
- 完整 TypeScript 类型导出（`FitMode` / `FitViewOptions` / `FitViewInfo` / `FitViewController`）

### 修复

- 修复 `resize: false` 被强制置为 `true` 的问题（`watch: false` 现已生效）
- 修复 scroll 模式滚动条长度计算错误（margin 公式由 `vh-dh` 修正为 `dh×(scale-1)`）

### 工程化

- TypeScript 声明文件改为构建时从源码自动生成
- `lib` 构建产物改为 git 忽略，发布时通过 build 生成

## [0.3.3](https://github.com/pbstar/fitview/compare/v0.3.2...v0.3.3) - 2025-06-11

### 修复

- 修复滚动条长度计算错误

## [0.3.2](https://github.com/pbstar/fitview/compare/v0.3.1...v0.3.2) - 2025-06-10

### 修复

- 修复滚动条样式 bug
- 滚动条样式调整为半透明效果

## [0.3.1](https://github.com/pbstar/fitview/compare/v0.3.0...v0.3.1) - 2025-06-08

### 新增

- 添加 `refresh` / `destroyResize` API 方法

### 修复

- 修复样式 bug

## [0.3.0](https://github.com/pbstar/fitview/compare/v0.2.0...v0.3.0) - 2025-06-07

### 重构

- 重构项目，解决 echarts 生成的 canvas 无法拷贝的问题

## [0.2.0](https://github.com/pbstar/fitview/compare/v0.1.1...v0.2.0) - 2025-06-07

### 变更

- 使用 ResizeObserver 替代 window.resize 事件监听元素尺寸变化

## [0.1.1](https://github.com/pbstar/fitview/compare/v0.1.0...v0.1.1) - 2025-05-16

### 变更

- 更新 package.json 以支持模块导出

## [0.1.0](https://github.com/pbstar/fitview/tree/v0.1.0) - 2024-08-10

### 新增

- 初始版本，实现视口自适应核心能力（fill / contain / scroll / hidden 四种适配模式）

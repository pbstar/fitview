/** 适配模式 */
export type FitMode = "fill" | "contain" | "scroll" | "hidden";

/** 尺寸信息：视口尺寸 + 设计稿尺寸 */
export interface FitViewSize {
  /** 视口（容器）宽度 */
  vw: number;
  /** 视口（容器）高度 */
  vh: number;
  /** 设计稿宽度 */
  dw: number;
  /** 设计稿高度 */
  dh: number;
}

/** 尺寸变化回调信息 */
export interface FitViewInfo {
  /** 容器宽度 */
  width: number;
  /** 容器高度 */
  height: number;
  /** X 轴缩放比 */
  scaleX: number;
  /** Y 轴缩放比 */
  scaleY: number;
  /** 当前适配模式 */
  mode: FitMode;
}

/** 创建配置 */
export interface FitViewOptions {
  /** 需要自适应的容器元素（必填），且必须有且只有一个子元素 */
  el: HTMLElement;
  /** 适配模式，默认 "contain" */
  mode?: FitMode;
  /** 是否监听容器尺寸变化，默认 true */
  watch?: boolean;
  /** 设计稿宽度（可选，与 designHeight 成对出现；缺省时取子元素宽度） */
  designWidth?: number;
  /** 设计稿高度（可选，与 designWidth 成对出现；缺省时取子元素高度） */
  designHeight?: number;
  /** 尺寸变化回调 */
  onResize?: (info: FitViewInfo) => void;
}

/** 控制器 */
export interface FitViewController {
  /** 重新计算并适配 */
  update(): void;
  /** 动态切换适配模式 */
  setMode(mode: FitMode): void;
  /** 销毁实例，断开尺寸监听 */
  destroy(): void;
}

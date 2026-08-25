import type { FitMode, FitViewSize } from "./types";
import { round } from "./utils";

/** 应用结果：实际生效的双轴缩放比 */
export interface AppliedScale {
  scaleX: number;
  scaleY: number;
}

/** 清除上一个适配模式残留的内联样式 */
function resetStyles(box: HTMLElement, child: HTMLElement): void {
  child.style.transform = "";
  child.style.marginLeft = "";
  child.style.marginRight = "";
  child.style.marginBottom = "";
  box.style.overflowX = "";
  box.style.overflowY = "";
}

/** 应用基础样式（每次适配均需重置，避免滚动条样式残留） */
function applyBaseStyles(box: HTMLElement, child: HTMLElement): void {
  child.style.transformOrigin = "0 0";
  box.style.overflow = "hidden";
  box.style.scrollbarColor = "rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1)";
}

/**
 * 核心适配逻辑：先重置旧样式，再按模式应用缩放。
 *
 * @returns 实际生效的 X/Y 轴缩放比
 */
export function applyFit(
  box: HTMLElement,
  child: HTMLElement,
  size: FitViewSize,
  mode: FitMode
): AppliedScale {
  resetStyles(box, child);
  applyBaseStyles(box, child);

  const wScale = round(size.vw / size.dw);
  const hScale = round(size.vh / size.dh);

  switch (mode) {
    case "fill":
      // 忽略宽高比，分别拉伸填满容器
      child.style.transform = `scale(${wScale}, ${hScale})`;
      return { scaleX: wScale, scaleY: hScale };

    case "contain":
      if (wScale > hScale) {
        // 高度填满，宽度居中留白
        child.style.transform = `scale(${hScale})`;
        child.style.marginLeft = `${Math.round((size.vw - size.dw * hScale) / 2)}px`;
        return { scaleX: hScale, scaleY: hScale };
      }
      // 宽度填满，高度方向留白（顶部对齐）
      child.style.transform = `scale(${wScale})`;
      return { scaleX: wScale, scaleY: wScale };

    case "scroll":
      if (wScale > hScale) {
        // 宽度填满，高度滚动
        child.style.transform = `scale(${wScale})`;
        box.style.overflowX = "hidden";
        box.style.overflowY = "scroll";
        // 撑出缩放后超出的高度，保证滚动条长度正确
        child.style.marginBottom = `${Math.round(size.dh * (wScale - 1))}px`;
        return { scaleX: wScale, scaleY: wScale };
      }
      // 高度填满，宽度滚动
      child.style.transform = `scale(${hScale})`;
      box.style.overflowX = "scroll";
      box.style.overflowY = "hidden";
      child.style.marginRight = `${Math.round(size.dw * (hScale - 1))}px`;
      return { scaleX: hScale, scaleY: hScale };

    case "hidden":
      if (wScale > hScale) {
        // 宽度填满，高度裁剪
        child.style.transform = `scale(${wScale})`;
        return { scaleX: wScale, scaleY: wScale };
      }
      // 高度填满，宽度居中裁剪
      child.style.transform = `scale(${hScale})`;
      child.style.marginLeft = `-${Math.round((size.dw * hScale - size.vw) / 2)}px`;
      return { scaleX: hScale, scaleY: hScale };
  }
}

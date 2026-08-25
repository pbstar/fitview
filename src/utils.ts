import type { FitMode, FitViewSize } from "./types";

/** 合法的适配模式 */
export const FIT_MODES: FitMode[] = ["fill", "contain", "scroll", "hidden"];

/** 保留 3 位小数，避免浮点误差 */
export function round(n: number): number {
  return Math.round(n * 1000) / 1000;
}

/**
 * 读取视口尺寸与设计稿尺寸。
 *
 * 设计稿尺寸优先取显式传入的 designWidth/designHeight，
 * 未传入时回退到第一个子元素的 offsetWidth/offsetHeight。
 *
 * @returns 尺寸信息；任一关键尺寸为 0（元素隐藏等）时返回 null，由调用方跳过本次适配。
 */
export function getSize(
  el: HTMLElement,
  designWidth?: number,
  designHeight?: number
): FitViewSize | null {
  const vw = el.offsetWidth;
  const vh = el.offsetHeight;
  if (vw <= 0 || vh <= 0) {
    return null;
  }

  let dw: number;
  let dh: number;
  if (designWidth !== undefined && designHeight !== undefined) {
    dw = designWidth;
    dh = designHeight;
  } else {
    const child = el.children[0] as HTMLElement;
    dw = child.offsetWidth;
    dh = child.offsetHeight;
    if (dw <= 0 || dh <= 0) {
      return null;
    }
  }

  return { vw, vh, dw, dh };
}

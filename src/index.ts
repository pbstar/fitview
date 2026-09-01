import type {
  FitMode,
  FitViewInfo,
  FitViewController,
  FitViewOptions,
} from "./types";
import { FIT_MODES, getSize } from "./utils";
import { applyFit } from "./init";

// README 承诺从入口导出类型，供消费方 `import type { ... } from "fitview"` 使用
export type {
  FitMode,
  FitViewInfo,
  FitViewController,
  FitViewOptions,
} from "./types";

/**
 * 创建视口自适应控制器。
 *
 * @param options 配置项
 * @returns 控制器，含 update / setMode / destroy 方法
 */
export function createFitView(options: FitViewOptions): FitViewController {
  // —— 参数校验 ——
  if (!options) {
    throw new Error("[FitView] options is required");
  }
  const el = options.el;
  if (!el || !(el instanceof HTMLElement)) {
    throw new Error("[FitView] options.el is required and must be an HTMLElement");
  }
  if (el.children.length !== 1) {
    throw new Error("[FitView] options.el must have exactly one child element");
  }
  if (options.mode !== undefined && !FIT_MODES.includes(options.mode)) {
    throw new Error(
      `[FitView] options.mode must be one of ${FIT_MODES.join(", ")}`
    );
  }
  const hasDesignWidth = options.designWidth !== undefined;
  const hasDesignHeight = options.designHeight !== undefined;
  if (hasDesignWidth !== hasDesignHeight) {
    throw new Error(
      "[FitView] designWidth and designHeight must be provided together"
    );
  }
  if (
    hasDesignWidth &&
    hasDesignHeight &&
    (options.designWidth! <= 0 || options.designHeight! <= 0)
  ) {
    throw new Error("[FitView] designWidth and designHeight must be positive numbers");
  }

  // —— 状态 ——
  const child = el.children[0] as HTMLElement;
  let mode: FitMode = options.mode ?? "contain";
  let observer: ResizeObserver | null = null;

  // 重新计算尺寸并应用适配
  const update = (): void => {
    const size = getSize(el, options.designWidth, options.designHeight);
    // 任一关键尺寸为 0（元素隐藏等）时跳过本次适配
    if (!size) return;

    const { scaleX, scaleY } = applyFit(el, child, size, mode);
    const info: FitViewInfo = {
      width: size.vw,
      height: size.vh,
      scaleX,
      scaleY,
      mode,
    };
    options.onResize?.(info);
  };

  // 动态切换适配模式
  const setMode = (next: FitMode): void => {
    if (!FIT_MODES.includes(next)) {
      throw new Error(`[FitView] mode must be one of ${FIT_MODES.join(", ")}`);
    }
    mode = next;
    update();
  };

  // 销毁实例，断开尺寸监听
  const destroy = (): void => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  };

  // —— 初始化 ——
  if (options.watch ?? true) {
    observer = new ResizeObserver(() => update());
    observer.observe(el);
  } else {
    update();
  }

  return { update, setMode, destroy };
}

export default createFitView;

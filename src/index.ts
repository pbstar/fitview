import init from "./init";
import { getComputedWidthHeight } from "./utils";

class fitview {
  #data: any = {
    el: null,
    fit: "contain",
    resize: true,
    vw: 0, // 视口宽度
    vh: 0, // 视口高度
    dw: 1920, // 设计稿宽度
    dh: 1080, // 设计稿高度
    resizeObserver: null,
  };
  api: any;
  constructor(config: { el: HTMLElement; fit?: string; resize?: boolean }) {
    if (!config) {
      console.warn("config is required");
      return;
    }
    if (!config.el || !(config.el instanceof HTMLElement)) {
      console.warn("el is required");
      return;
    }
    //el必须有且只有一个子元素
    if (config.el.children.length != 1) {
      console.warn("el must have only one child element");
      return;
    }
    const fitList = ["fill", "contain", "scroll", "hidden"];
    this.#data.el = config.el;
    this.#data.resize = config.resize || true;
    if (config.fit) {
      if (fitList.includes(config.fit)) {
        this.#data.fit = config.fit;
      } else {
        console.warn("fit must be one of fill, contain, scroll, hidden");
        return;
      }
    }
    const refresh = () => {
      const obj = getComputedWidthHeight(this.#data.el as HTMLElement);
      this.#data.vw = obj.vw;
      this.#data.vh = obj.vh;
      this.#data.dw = obj.dw;
      this.#data.dh = obj.dh;
      init(this.#data);
    };

    const destroyResize = () => {
      if (this.#data.resizeObserver) {
        this.#data.resizeObserver.disconnect();
        this.#data.resizeObserver = null;
      }
    };

    if (this.#data.resize) {
      this.#data.resizeObserver = new ResizeObserver(() => {
        refresh();
      });
      this.#data.resizeObserver.observe(this.#data.el as HTMLElement);
    } else {
      refresh();
    }

    this.api = {
      refresh,
      destroyResize,
    };
  }
}
export default fitview;

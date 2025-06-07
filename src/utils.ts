export function getComputedWidthHeight(element: HTMLElement) {
  const obj = {
    vw: 0,
    vh: 0,
    dw: 1920,
    dh: 1080,
  };
  const firstChild = element.children[0] as HTMLElement;
  if (!firstChild) {
    console.warn("el must have only one child element");
    return obj;
  }
  if (
    element.offsetWidth > 0 &&
    element.offsetHeight > 0 &&
    firstChild.offsetWidth > 0 &&
    firstChild.offsetHeight > 0
  ) {
    return {
      vw: element.offsetWidth,
      vh: element.offsetHeight,
      dw: firstChild.offsetWidth,
      dh: firstChild.offsetHeight,
    };
  } else {
    console.warn("el and its child element must have width and height");
    return obj;
  }
}

export function getComputedWidthHeight(element: HTMLElement) {
  // 检查当前元素是否有非auto的宽高  
  let r=element.getBoundingClientRect()
  if (r.width > 0 && r.height > 0) {
    return {
      width: Math.floor(r.width),
      height: Math.floor(r.height)
    };
  }


  // 检查是否有父元素  
  const parent = element.parentElement;
  if (!parent) {
    return { width: 0, height: 0 }
  }
  return getComputedWidthHeight(parent);
}  
export default function init(e: any) {
  const wScale = Math.round((e.vw / e.dw) * 1000) / 1000; //容器宽度比
  const hScale = Math.round((e.vh / e.dh) * 1000) / 1000; //容器高度比
  const fBox = e.el as HTMLElement;
  const sBox = e.el.children[0] as HTMLElement;
  // 基础样式
  sBox.style.transformOrigin = "0 0";
  fBox.style.overflow = "hidden";
  // 滚动条样式
  fBox.style.scrollbarWidth = "none";
  if (e.fit == "fill") {
    //忽略宽高比，填充整个容器
    sBox.style.transform = `scale( ${wScale}, ${hScale} )`;
  } else if (e.fit == "contain") {
    //保持宽高比，超出部分空白
    if (wScale > hScale) {
      //容器宽度比大于容器高度比，高度填满，宽度空白
      sBox.style.transform = `scale( ${hScale}, ${hScale} )`;
      //x轴偏移量取整
      const xoffset = Math.round((e.vw - e.dw * hScale) / 2);
      sBox.style.marginLeft = `${xoffset}px`;
    } else {
      //容器宽度比小于容器高度比，宽度填满，高度空白
      sBox.style.transform = `scale( ${wScale}, ${wScale} )`;
      sBox.style.marginLeft = "0";
    }
  } else if (e.fit == "scroll") {
    //保持宽高比，超出部分滚动
    if (wScale > hScale) {
      //容器宽度比大于容器高度比，宽度填满，高度滚动
      sBox.style.transform = `scale( ${wScale}, ${wScale} )`;
      fBox.style.overflowX = "hidden";
      fBox.style.overflowY = "scroll";
    } else {
      //容器宽度比小于容器高度比，高度填满，宽度滚动
      sBox.style.transform = `scale( ${hScale}, ${hScale} )`;
      fBox.style.overflowX = "scroll";
      fBox.style.overflowY = "hidden";
    }
  } else if (e.fit == "hidden") {
    //保持宽高比，超出部分隐藏
    if (wScale > hScale) {
      //容器宽度比大于容器高度比，宽度填满，高度裁剪
      sBox.style.transform = `scale( ${wScale}, ${wScale} )`;
      sBox.style.marginLeft = "0";
    } else {
      //容器宽度比小于容器高度比，高度填满，宽度裁剪
      sBox.style.transform = `scale( ${hScale}, ${hScale} )`;
      //x轴偏移量取整
      const xoffset = Math.round((e.dw * hScale - e.vw) / 2);
      sBox.style.marginLeft = `-${xoffset}px`;
    }
  }
}

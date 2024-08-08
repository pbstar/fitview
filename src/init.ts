export default function init(e: any) {
  console.log(e);
  let fBox: any = document.createElement('div');
  let sBox: any = document.createElement('div');
  fBox.style.width = e.vw + 'px';
  fBox.style.height = e.vh + 'px';
  sBox.style.width = e.uw + 'px';
  sBox.style.height = e.uh + 'px';
  let uwhScale = e.uh / e.uw;//原始高宽比
  let wScale = e.vw / e.uw;//容器宽度比
  let hScale = e.vh / e.uh;//容器高度比
  if (e.fit == 'fill') {
    //忽略宽高比，填充整个容器
    sBox.style.transform = `scale( ${wScale}, ${hScale} )`;
    sBox.style.transformOrigin = '0 0';
  } else if (e.fit == 'contain') {
    //保持宽高比，空白填充
    if (wScale > hScale) {
      //容器宽度比大于容器高度比，高度填满，宽度空白

      // dom真实宽e.vh / uwhScale
      console.log(e.vh / uwhScale);
      // 容器真实宽e.vw
      console.log(e.vw);
      // 容器真实宽与dom真实宽的差值
      console.log(e.vw - e.vh / uwhScale);
      // 真实x
      console.log((e.vw - e.vh / uwhScale) / 2);
      // 虚拟x
      console.log((e.vw/ hScale - e.vh / uwhScale) / 2 );

      let x = (e.vw - e.vh / uwhScale) / wScale / 2;
      sBox.style.transform = `scale( ${hScale}, ${hScale} )`;



      sBox.style.transformOrigin = `${x}px 0`;
    } else {
      //容器宽度比小于容器高度比，宽度填满，高度空白
      sBox.style.transform = `scale( ${wScale}, ${wScale} )`;
      sBox.style.transformOrigin = '0 0';
    }
  } else if (e.fit == 'scroll') {
    //保持宽高比，超出部分滚动
  } else if (e.fit == 'hidden') {
    //保持宽高比，超出部分隐藏
    fBox.style.overflow = 'hidden';
  }
  sBox.innerHTML = e.el.innerHTML;
  fBox.appendChild(sBox);
  e.el.innerHTML = '';
  e.el.appendChild(fBox);
  fBox = null;
  sBox = null;
}
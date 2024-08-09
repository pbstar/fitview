export default function init(e: any) {
  let fBox: any = document.createElement('div');
  let mBox: any = document.createElement('div');
  let sBox: any = document.createElement('div');
  let wScale = e.vw / e.uw;//容器宽度比
  let hScale = e.vh / e.uh;//容器高度比
  let uhw = e.uh / e.uw;//原始宽高比
  fBox.style.width = e.vw + 'px';
  fBox.style.height = e.vh + 'px';
  fBox.style.display = 'flex';
  mBox.style.overflow = 'visible';
  sBox.style.width = e.uw + 'px';
  sBox.style.height = e.uh + 'px';
  sBox.style.transformOrigin = '0 0';
  if (e.fit == 'fill') {
    //忽略宽高比，填充整个容器
    fBox.style.justifyContent = 'center';
    fBox.style.alignItems = 'center';
    mBox.style.width = e.vw + 'px';
    mBox.style.height = e.vh + 'px';
    sBox.style.transform = `scale( ${wScale}, ${hScale} )`;

  } else if (e.fit == 'contain') {
    //保持宽高比，空白填充
    fBox.style.justifyContent = 'center';
    fBox.style.alignItems = 'flex-start';


    if (wScale > hScale) {
      //容器宽度比大于容器高度比，高度填满，宽度空白
      mBox.style.width = e.vh / uhw + 'px';
      mBox.style.height = e.vh + 'px';
      sBox.style.transform = `scale( ${hScale}, ${hScale} )`;
    } else {
      //容器宽度比小于容器高度比，宽度填满，高度空白
      mBox.style.width = e.vw + 'px';
      mBox.style.height = e.vw * uhw + 'px';
      sBox.style.transform = `scale( ${wScale}, ${wScale} )`;
    }
  } else if (e.fit == 'scroll') {
    //保持宽高比，超出部分滚动
    if (wScale > hScale) {
      //容器宽度比大于容器高度比，宽度填满，高度滚动
      mBox.style.width = e.vw + 'px';
      mBox.style.height = e.vw * uhw + 'px';
      sBox.style.transform = `scale( ${wScale}, ${wScale} )`;
      fBox.style.overflowX = 'hidden';
      fBox.style.overflowY = 'scroll';
    } else {
      //容器宽度比小于容器高度比，高度填满，宽度滚动
      mBox.style.width = e.vh / uhw + 'px';
      mBox.style.height = e.vh + 'px';
      sBox.style.transform = `scale( ${hScale}, ${hScale} )`;
      fBox.style.overflowX = 'scroll';
      fBox.style.overflowY = 'hidden';

    }
  } else if (e.fit == 'hidden') {
    //保持宽高比，超出部分隐藏
    if (wScale > hScale) {
      //容器宽度比大于容器高度比，宽度填满，高度裁剪
      mBox.style.width = e.vw + 'px';
      mBox.style.height = e.vw * uhw + 'px';
      sBox.style.transform = `scale( ${wScale}, ${wScale} )`;
    } else {
      //容器宽度比小于容器高度比，高度填满，宽度裁剪
      mBox.style.width = e.vh / uhw + 'px';
      mBox.style.height = e.vh + 'px';
      sBox.style.transform = `scale( ${hScale}, ${hScale} )`;
    }
    fBox.style.overflow = 'hidden';
  }
  sBox.innerHTML = e.raw_el;
  mBox.appendChild(sBox);
  fBox.appendChild(mBox);
  e.el.innerHTML = '';
  e.el.appendChild(fBox);
  fBox = null;
  mBox = null;
  sBox = null;
}
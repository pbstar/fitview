import { Config, Data } from './types'
import init from './init'
import { getComputedWidthHeight } from './utils'

class fitview {
  constructor(config: Config) {
    let data: Data = {
      el: null,
      raw_el: null,
      fit: 'contain',
      uw: 1920,
      uh: 1080,
      vw: 0,
      vh: 0,
      resize: true
    }
    if (!config) {
      console.warn('config is required')
      return
    }
    if (!config.el) {
      console.warn('el is required')
      return
    }
    data.el = config.el
    data.raw_el = config.el.innerHTML
    if (config.fit) {
      let fitList = ['fill', 'contain', 'scroll', 'hidden']
      if (fitList.indexOf(config.fit) > -1) data.fit = config.fit
      else console.warn('fit must be one of cover, contain, scroll, hidden')
    }
    if (config.uw) data.uw = config.uw
    if (config.uh) data.uh = config.uh
    if (config.resize || config.resize === false) data.resize = config.resize
    start()
    if (data.resize) {
      window.addEventListener('resize', () => {
        start()
      })
    }
    function start() {
      let computedWidthHeight = getComputedWidthHeight(data.el as HTMLElement)
      data.vw = computedWidthHeight.width
      data.vh = computedWidthHeight.height
      init(data)
    }
  }
}
export default fitview
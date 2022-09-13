export const util = new class Util {
  constructor() {
    console.log('util init success')
    this.is_pwa = matchMedia('(display-mode: standalone)').matches || navigator.standalone || document.referrer.includes('android-app://') || navigator.userAgent.includes('PWA') // navigator.userAgent.includes('PWA')这个判断是调试用的, 手动加入到浏览器的UA里面, 用来模拟实际的PWA环境
    if (this.is_pwa) {
      resizeTo(400, 800)
    }

    this.search_params = new URL(location.href).searchParams
  }

  // 移除常见中文标点
  removePunctuation(string) {
    return string.replace(/，|。|？|！|；|、！|：|“|”|《|【|】|》/g, '&emsp;')
  }
  
  // 创建子类
  createSubClass(BaseClass = PureJS) {
    function SubClass(...args) {
      BaseClass.apply(this, args)
    }
    const InheritSuper = function () {}
    InheritSuper.prototype = BaseClass.prototype
    SubClass.prototype = new InheritSuper()
    SubClass.prototype.constructor = BaseClass
    return SubClass
  }
}
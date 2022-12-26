export const dp = new class DesignPatterns {
  single: Object

  constructor() {
    this.single = {}
    // this.singleton()
    this.decorator()
    console.log('data init success')
  }

  /**
   * 获取单例
   * @param {String} path 命名空间路径，如a.b.c
   * @returns Object
   */
  // singleton(path?: String) {
  //   return path ? path.split('.').reduce((p, c) => p = p[c], this.single) : this.single
  // }

  /**
   * 装饰器自动运行
   * AOP装饰器，添加了before与after
   */
  decorator() {
    Function.prototype.before = function (fn) {
      const self = this
      return function (this: Function) {
        fn.apply(this, arguments)
        return self.apply(this, arguments)
      }
    }

    Function.prototype.after = function (fn) {
      const self = this
      return function (this: Function) {
        const ret = self.apply(this, arguments)
        fn.apply(this, arguments)
        return ret
      }
    }
  }
}
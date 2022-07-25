export default new class DesignPatterns {
  constructor() {
    console.log('data init success')
    this.decorator()
  }

  decorator() {
      console.log('design patterns decorator init success')
      Function.prototype.defore = function(fn) {
          const self = this
          return function() {
            fn.apply(this. arguments)
            return self.apply(this, arguments)
          }
      }

      Function.prototype.after = function(fn) {
          const self = this
          return function() {
            const ret = self.apply(this, arguments)
            fn.apply(this. arguments)
            return ret
          }
      }
  }
}
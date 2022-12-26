export const dom = new class Dom {
  els: Object
  el: any

  constructor() {
    console.log('dom init success')
    this.els = {}
    this.el = new Proxy(this.els, {
      get: (target: Object, key: string) => {
        if (key in target) return target[key]
        else {
          if (key.match(/^\w/)) target[key] = this.$(`#${key}`) || this.$(`${key}`)
          else target[key] = $(key)
          return target[key]
        }
      },
      set: (target: Object, name: string, value: any) => {
        target[name] = value
        return true
      },
    })
  }

  $(selector: string) {
    return document.querySelector(selector)
  }

  $$(selector: string) {
    return document.querySelectorAll(selector)
  }
}
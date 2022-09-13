export const dom = new class Dom {
  constructor() {
    console.log('dom init success')
    this.els = {}
    this.el = new Proxy(this.els, {
      get: (target, key) => {
        if (key in target) return target[key]
        else {
          if (key.match(/^\w/)) target[key] = $(`#${key}`) || $(`${key}`)
          else target[key] = $(key)
          return target[key]
        }
      },
      set: (target, name, value) => {
        target[name] = value
      },
    })
  }

  $(selector) {
    return document.querySelector(selector)
  }

  $$(selector) {
    return document.querySelectorAll(selector)
  }
}
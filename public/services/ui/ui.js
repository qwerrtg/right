export const ui = new class UI {
  constructor() {
    console.log('ui init success')
  }

  loading() {
    document.body.style.opacity = 0.5
  }

  unloading() {
    document.body.style.opacity = 1
  }
}
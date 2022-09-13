declare const localforage: any
declare const $: any

interface Function {
  before(fn: any): void,
  after(fn: any): void,
}
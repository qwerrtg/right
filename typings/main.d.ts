declare const localforage: any
declare const $: any
declare const VConsole: any
declare const Hammer: any

interface Function {
  before(fn: any): void,
  after(fn: any): void,
}
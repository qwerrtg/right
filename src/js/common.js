String.prototype.template2string = function (params) {
  const keys = Object.keys(params)
  const values = Object.values(params)
  return new Function(...keys, `return \`${this}\``)(...values)
}

String.prototype.temp2str = String.prototype.template2string

window.lf = localforage
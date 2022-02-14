// 如果有必要使用Express，比如纯静态网页部分接口调试需要跨域代理等
const express = require('express')
const os = require('os')
const path = require('path')

const app = express()
const port = 8000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 获取本机IP
function getIPAdress() {
  const interfaces = os.networkInterfaces()
  for (const devName in interfaces) {
    const iface = interfaces[devName]
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}

module.exports = {
  run({ is_dev, is_pro, instanceHandler }) {
    console.log({ is_dev, is_pro })

    let render_path
    let base_url

    if (is_dev) {
      render_path = 'src/'
      base_url = 'https://dev.com'
      instanceHandler && instanceHandler(app)
    } else {
      render_path = 'dist/'
      base_url = 'https://pro.com'
    }
    app.use(express.static(path.join(__dirname, render_path)))
    const host = getIPAdress()

    console.log(`http://${host}:${port}`)
    app.listen(port)
  },
}

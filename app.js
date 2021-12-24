// 如果有必要使用Express，比如纯静态网页部分接口调试需要跨域代理等
const express = require('express')
// const proxy = require('http-proxy-middleware')
const os = require('os')
const path = require('path')
const request = require('request')
// const file_path = process.argv[2] || 'src'

const app = express()
const port = 8000

const NODE_ENV = process.env.NODE_ENV
const is_dev = NODE_ENV === 'development'
const is_pro = !is_dev
console.log({ is_dev, is_pro })

// app.use(express.static(file_path))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

let render_path
let base_url

if (is_dev) {
  render_path = 'src/'
  base_url = 'https://zhuanlan.zhihu.com'
} else {
  render_path = 'dist/'
  base_url = 'https://zhuanlan.zhihu.com'
}
app.use(express.static(path.join(__dirname, render_path)))

// app.use(
//   '/api/test_proxy',
//   proxy.createProxyMiddleware({
//     target: 'https://www.baidu.com',
//     changeOrigin: true,
//     pathRewrite: {
//       '^/api/test_proxy': '/',
//     },
//   })
// )

const _http = function (options) {
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        resolve(body)
      }
      reject(error)
    })
  })
}

app.post('*', async (req, res) => {
  try {
    console.log(req.query)
    console.log(req.headers)
    console.log(req.url)
    const _res = await _http(base_url + req.url, { method: 'GET', body: req.query })
    /**
     * 处理返回逻辑
     */
    res.send(_res)
  } catch (e) {
    /**
     * 处理错误逻辑
     */
    res.send(e)
  }
})

app.get('*', (req, res) => {
  res.sendfile('./src/404.html')
})

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
const host = getIPAdress()

console.log(`http://${host}:${port}`)
app.listen(port)

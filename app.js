// 如果有必要使用Express，比如纯静态网页部分接口调试需要跨域代理等

const express = require('express')
const proxy = require('http-proxy-middleware')

const file_path = process.argv[2] || 'src'

const app = express()
const port = 8000

app.use(express.static(file_path))

app.use(
  '/api/test_proxy',
  proxy.createProxyMiddleware({
    target: 'https://www.baidu.com',
    changeOrigin: true,
    pathRewrite: {
      '^/api/test_proxy': '/',
    },
  })
)

console.log('http://localhost:' + port)
app.listen(port)

const proxy = require('express-http-proxy')
const app = require('./app.base')

app.run({
  is_dev: true,
  instanceHandler: (instance) =>
    instance.use(
      '/api',
      proxy('www.baidu.com', {
        proxyReqPathResolver(req, res) {
          resolve(req.originalUrl)
        },
      })
    ),
})

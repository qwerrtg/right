const proxy = require('express-http-proxy')
const app = require('./app.base')

app.run({
  is_dev: true,
  instanceHandler: (instance) =>
    instance.use(
      '/china-year',
      proxy('https://app-console-test.test.geely.com', {
        proxyReqPathResolver(req, res) {
          return req.originalUrl
        },
      })
    ),
})

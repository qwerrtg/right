const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  res.render('index', {})
})

router.get('/404', function (req, res, next) {
  res.render('404', {})
})

module.exports = router

console.log(1)

console.log({ NODE_ENV: '@@NODE_ENV' })

function test() {
  console.log('test run')
  // 错误调试
  new HTTP()
    .post('https://bomt-dev.test.geely.com/bomt-common-server/areaQuery')
    .forceQuery({ include: 'data%5B*%5D.article.column', limit: '12', offset: '0' })
    .throttle({ time: 3000 })
    .do()
    .then((ret) => {
      return ret.text()
    })
    .then((text) => {
      console.log('返回成功')
      // console.log(text)
    })
    .catch((error) => {
      // 错误调试
      console.log(error)
    })
  fetch('/api/test_proxy')
    .then((ret) => {
      return ret.text()
    })
    .then((text) => {
      console.log(text)
    })
}

test()

const demp_template_string = document.querySelector('#demo_tempalte').innerHTML.temp2str({
  p: 'im p',
  href: 'https://www.baidu.com',
  a: 'im a',
})

console.log({ demp_template_string })

lf.setItem('test_value', "localforage's i am test value.").then((ret) => {
  console.log(ret)
  lf.getItem('test_value').then(console.log)
})

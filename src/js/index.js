console.log(1)

function test() {
  console.log('test run')
  // 错误调试
  new HTTP()
    .get('/api/test_proxy')
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

console.log(1)

function test() {
  console.log('test run')
  fetch('/api/test_proxy')
    .then((ret) => {
      return ret.text()
    })
    .then((text) => {
      console.log(text)
    })
}

test()

;(function () {
  window.addEventListener('unhandledrejection', (event) => {
    console.group('未处理的reject错误')
    console.log('%c%s ↓↓↓%o', 'color: red;', event.reason && (event.reason.message || event.reason), event)
    console.groupEnd()
  })

  let http = axios.create({
    // baseURL: process.env.BASE_API, // api 的 base_url
    timeout: 30000, // 请求时间
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // 添加响应拦截器，客户端显示
  http.interceptors.response.use(function (res) {
    // 对响应数据做点什么，true是解决成功但是data为null的情况
    let data = res.data.data || true
    // 目前只有fail这种不正常状态
    if (res.data.code !== 'success') {
      alert(res.data.message)
      data = null
    }
    return data || failHandler('没有数据返回', { error: res.data.message, data: res.data })
  })

  /**
   * 错误处理
   * @param {*} message 错误文本新车型
   * @param {*} payload 其他载体，自行处理
   * @returns
   */
  function failHandler(message, payload) {
    const body = {
      frontend: true,
      message,
      ...payload,
    }
    console.log(JSON.stringify(body))
    return body
  }

  class Request {
    // 静默状态，即不用弹loading
    silence = false
    // 请求统一配置
    config = {
      method: 'get',
    }
    // 其他业务配置参数
    extra = {}

    /**
     * 开始
     * @return {object} promise 返回一个 promise
     */
    do() {
      return http
        .request(this.config)
        .then((result) => {
          // 如果是前端拦截到的错误，直接抛出不进then
          if (result.frontend) throw new Error(result.message)
          return result
        })
        .catch((error) => {
          throw new Error(error.message)
        })
    }

    /**
     * get请求配置
     * @param {string} url 请求地址的 url
     * @returns 自身
     */
    get(url) {
      this.config.url = url
      return this
    }

    /**
     * post请求配置
     * @param {string} url 请求地址的 url
     * @returns 自身
     */
    post(url) {
      this.config.method = 'post'
      this.config.url = url
      return this
    }

    /**
     * 配置请求头
     * @param {object} data 相关参数
     * @returns 自身
     */
    headers(data) {
      this.config.headers = data
      return this
    }

    /**
     * 装载数据
     * @param {object} body 参数
     * @returns 自身
     */
    data(body) {
      this.config.data = body
      return this
    }

    /**
     * 装载数据
     * @param {object} body 参数
     * @returns 自身
     */
    query(body = {}) {
      this.config.params = body
      return this
    }

    /**
     * 装载其他配置参数
     * @param {object} body 其他参数
     * @returns 自身
     */
    payload(body = {}) {
      this.extra = body
      return this
    }

    /**
     * 沉默执行
     * @returns 自身
     */
    calm() {
      this.silence = true
      return this
    }

    // adapters
    /**
     * 错误码处理 TODO: 待处理错误码
     * @param {number | string} error_code 错误码
     * @returns 待处理
     */
    errorCodeHandler(error_code) {
      console.log({ error_code })
      return 'any'
    }
  }

  // 返回新对象是为了避免loading冲突
  window.HTTP = function HTTP() {
    return new Request()
  }
})()

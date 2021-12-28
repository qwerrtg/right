!(function () {
  window.addEventListener('unhandledrejection', (event) => {
    console.group('未处理的reject错误')
    console.log('%c%s ↓↓↓%o', 'color: red;', event.reason && (event.reason.message || event.reason), event)
    console.groupEnd()
  })

  let http = axios.create({
    // baseURL: process.env.BASE_API, // api 的 base_url
    timeout: 30000, // 请求时间
  })

  // 添加响应拦截器，客户端显示
  http.interceptors.response.use(function (res) {
    // 对响应数据做点什么，true是解决成功但是data为null的情况
    let data = res.data.data || true
    // 目前只有fail这种不正常状态
    let empty_message = '接口没有数据返回'
    if (res.data.code !== 'success') {
      console.log(res.data.message || empty_message)
      data = null
    }
    return data || failHandler(empty_message, { error: res.data.message, data: res.data })
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

  class BaseRequest {
    // 请求统一配置
    config = {
      method: 'get',
    }

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
     * post强行装载query数据
     * @param {object} body 参数
     * @returns 自身
     */
    forceQuery(body) {
      const query_string = Object.keys(body).reduce((p, c) => {
        p += `${c}=${body[c]}&`
        return p
      }, '')
      this.config.url += '?' + query_string.slice(0, query_string.length - 1)
      return this
    }

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

  let proxy_instance = null

  class ProxyRequest extends BaseRequest {
    // 静默状态，即不用弹loading
    silence = false
    // 其他业务配置参数
    extra = {}

    constructor(payload) {
      super(payload)
      this.interval = null
      this.timeout = null

      // 若要求防抖或节流，则返回已有实例
      if (proxy_instance) return proxy_instance
      else proxy_instance = null
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

    /**
     * 节流，市场内执行第一次
     * @param {object} payload 相关参数：{time: 延时时长}
     * @returns
     */
    throttle(payload) {
      this.throttle_time = payload.time || 300
      proxy_instance = this
      return this
    }

    /**
     * 防抖，时长内执行最后一次
     * @param {object} payload 相关参数：{time: 延时时长}
     * @returns
     */
    debounce(payload) {
      this.debounce_time = payload.time || 300
      proxy_instance = this
      return this
    }

    /**
     * 复写代理一些其他操作
     * @returns Promise
     */
    do() {
      if (this.throttle_time && proxy_instance) {
        let error_result = Promise.reject(new Error('节流中...'))
        if (proxy_instance.timeout) return error_result
        let result = super.do()
        result = error_result
        proxy_instance.timeout = setTimeout(() => {
          clearTimeout(proxy_instance.timeout)
          proxy_instance = null
        }, this.throttle_time)
        return result
      }

      if (this.debounce_time && proxy_instance) {
        let result = Promise.reject(new Error('防抖中...'))
        if (proxy_instance.timeout) return result
        proxy_instance.timeout = setTimeout(() => {
          clearTimeout(proxy_instance.timeout)
          proxy_instance = null
          result = super.do()
        }, this.debounce_time)
        return result
      }

      return super.do()
    }
  }

  // 返回新对象是为了避免loading冲突
  window.BaseHTTP = function BaseHTTP() {
    return new BaseRequest()
  }

  // 返回新对象是为了避免loading冲突
  window.HTTP = function HTTP() {
    return new ProxyRequest()
  }
})()

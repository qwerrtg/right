class BaseRequest {
    constructor(params) {
        // 请求统一配置
        this.url = '';
        this.config = {
            method: 'get',
            headers: {},
            data: {},
            params: {}
        };
        console.log(params);
    }
    /**
     * 开始
     * @return {object} promise 返回一个 promise
     */
    do() {
        return fetch(this.url, this.config)
            .then(data => data.json())
            .then((result) => {
            // 如果是前端拦截到的错误，直接抛出不进then
            if (result.frontend)
                throw new Error(result.message);
            return result;
        })
            .catch((error) => {
            throw new Error(error.message);
        });
    }
    /**
     * get请求配置
     * @param {string} url 请求地址的 url
     * @returns 自身
     */
    get(url) {
        this.url = url;
        return this;
    }
    /**
     * post请求配置
     * @param {string} url 请求地址的 url
     * @returns 自身
     */
    post(url) {
        this.config.method = 'post';
        this.url = url;
        return this;
    }
    /**
     * 配置请求头
     * @param {object} data 相关参数
     * @returns 自身
     */
    headers(data) {
        this.config.headers = data;
        return this;
    }
    /**
     * 装载数据
     * @param {object} body 参数
     * @returns 自身
     */
    data(body) {
        this.config.data = body;
        return this;
    }
    /**
     * 装载数据
     * @param {object} body 参数
     * @returns 自身
     */
    query(body = {}) {
        this.config.params = body;
        return this;
    }
    /**
     * post强行装载query数据
     * @param {object} body 参数
     * @returns 自身
     */
    forceQuery(body) {
        const query_string = Object.keys(body).reduce((p, c) => {
            p += `${c}=${body[c]}&`;
            return p;
        }, '');
        this.url += '?' + query_string.slice(0, query_string.length - 1);
        return this;
    }
    /**
     * 错误码处理 TODO: 待处理错误码
     * @param {number | string} error_code 错误码
     * @returns 待处理
     */
    errorCodeHandler(error_code) {
        console.log({ error_code });
        return 'any';
    }
}
let proxy_instance;
class ProxyRequest extends BaseRequest {
    constructor(payload) {
        super(payload);
        // 静默状态，即不用弹loading
        this.silence = false;
        // 其他业务配置参数
        this.extra = {};
        this.throttle_time = 0;
        this.debounce_time = 0;
        this.interval = 0;
        this.timeout = 0;
        // 若要求防抖或节流，则返回已有实例
        if (proxy_instance)
            return proxy_instance;
    }
    /**
     * 装载其他配置参数
     * @param {object} body 其他参数
     * @returns 自身
     */
    payload(body = {}) {
        this.extra = body;
        return this;
    }
    /**
     * 沉默执行
     * @returns 自身
     */
    calm() {
        this.silence = true;
        return this;
    }
    /**
     * 节流，市场内执行第一次
     * @param {object} payload 相关参数：{time: 延时时长}
     * @returns
     */
    throttle(payload) {
        this.throttle_time = payload.time || 300;
        proxy_instance = this;
        return this;
    }
    /**
     * 防抖，时长内执行最后一次
     * @param {object} payload 相关参数：{time: 延时时长}
     * @returns
     */
    debounce(payload) {
        this.debounce_time = payload.time || 300;
        proxy_instance = this;
        return this;
    }
    /**
     * 复写代理一些其他操作
     * @returns Promise
     */
    do() {
        if (this.throttle_time && proxy_instance) {
            if (proxy_instance.timeout)
                return Promise.reject(new Error('节流中...'));
            let result = super.do();
            proxy_instance.timeout = setTimeout(() => {
                clearTimeout(proxy_instance.timeout);
                proxy_instance = null;
            }, this.throttle_time);
            return result;
        }
        if (this.debounce_time && proxy_instance) {
            let result = Promise.reject(new Error('防抖中...'));
            if (proxy_instance.timeout)
                return result;
            proxy_instance.timeout = setTimeout(() => {
                clearTimeout(proxy_instance.timeout);
                proxy_instance = null;
                result = super.do();
            }, this.debounce_time);
            return result;
        }
        return super.do();
    }
}
export const http = new class HTTP extends ProxyRequest {
    constructor() {
        super({});
        console.log('http init success');
    }
};

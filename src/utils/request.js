// -----导入axios
import axios from 'axios'
// -----导入JSONBig：做大数字处理
import JSONBig from 'json-bigint'
// -----导入vuex：判断用户是否处于登录状态
// store：就是组件内部的this.$store
import store from '@/store'
// ------创建一个【新的axios实例对象】 和原来的axios没有关系
// 给instance 配置公共请求根地址、请求/响应拦截器、401处理、大整型数字转换
// 所有的配置都是给instance对象赋予的
// 为什么不直接对axios进行操作
// 当前的instance是经过各种配置的axios对象
// 如果系统中还需要使用【原生的axios】，此时就直接用就可以
// 如果我们不使用instance，直接对axios做各种配置，那么系统中就没有纯净的axios了，axios被多个组件引入的时候，他们在系统中是同一个
// 一个文件被修改，其他文件都会感知到
// instance的出现，可以保证axios是纯净的
const instance = axios.create({
    // 请求根地址
    baseURL: 'http://ttapi.research.itcast.cn/',
    // 请求完毕的数据【转换器】，超大整型数字处理
    transformResponse: [function (data) {
        // data返回的形式有两种：
        // 1.实体字符串
        // 2.空字符串（不能转的）
        // if (data) {
        //     return JSONBig.parse(data)
        // }
        // return data;
        // 升级上述代码：
        try {
            return JSONBig.parse(data)
        } catch (err) {
            return data
        }
    }],
})
// -------请求拦截器：token处理操作
instance.interceptors.request.use(function (config) {
    // 发送请求的相关逻辑
    // 判断token是否存在，存在再做配置
    if (store.state.user.token) {
        // 获得token，并注入
        config.headers.Authorization = 'Bearer ' + store.state.user.token // 一并注入token
    }
    return config
}, function (error) {
    return Promise.reject(error) // 直接返回promise错误
})
// -------响应拦截器
// token时效为2小时
instance.interceptors.response.use(function (response) {
    // 响应的相关逻辑
    // 相应数据，对返回的数据进行处理data或者data.data
    try {
        return response.data.data
    } catch (error) {
        return response.data
    }
}, function (error) {
    // 处理服务器端token过期操作
    // 非正常响应相关逻辑(包括401)
    // console.dir(error)
    // 判断当前错误是不是401
    if (error.response.status === 401) {
        // if (error.response.status === 401 && confirm('该账号已过期，请重新登录')) {
        // 强制用户重新登陆，从而重新刷新token
        router.push('/login')
        // 不要做错误提示
        return new Promise(function () { }) // 空的promise对象，不执行catch，从而不做错误提示
    }
    return Promise.reject(error)
})

// es6默认导出动作
export default instance

// 业务组件使用axios
// import request from '@/utils/request.js'
// request({url/data/method})

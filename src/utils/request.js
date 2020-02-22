// -----导入axios
import axios from 'axios'
// -----导入JSONBig：做大数字处理
import JSONBig from 'json-bigint'
// 导入路由，使得可以执行路由跳转
import router from '@/router/index.js'
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
  }]
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
// ---------响应拦截器
instance.interceptors.response.use(function (response) {
  //  得到的response实际上被axios包 一层数据
  try {
    //  将数据解构
    return response.data.data
  } catch (error) {
    return response.data
  }
}, async function (error) {
  // 响应有错误，有可能错误状态码为401
  if (error.response.status === 401) {
    // 如果refresh_token不存在
    if (!store.state.user.refresh_token) {
      router.push('/login')
      return Promise.reject(error)
    }

    try {
      // 刷新用户token
      // 应该发送一个请求 换取新的token
      // 这里不应该再用instance  因为 instance会再次进入拦截器  用默认的axios
      const result = await axios({
        method: 'put',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${store.state.user.refresh_token}`
        }
      })
      // 获取到新token后，就对vuex和localStorage进行更新
      // 注意：axios通过refresh_token向服务器端发送请求，返回的数据信息中只有token，
      //      没有refresh_token
      store.commit('updateUser', {
        token: result.data.data.token, // 拿到新的token之后
        refresh_token: store.state.user.refresh_token // 将之前 refresh_token 获取使用
      })
      // error.config对象中存有之前失败请求的所有参数信息
      // 例如url、method、data等等
      // console.dir(error)
      return instance(error.config) // 把刚才错误的请求再次发送出去 然后将promise返回
    } catch (err) {
      // 如果错误 表示补救措施也没用了(有可能refresh_token也失效了)
      // 应该跳转到登录页 并且 把废掉的用户信息全都干掉
      store.commit('clearUser') // 所有的用户信息清空
      router.push('/login') // 跳转到回登录页
      return Promise.reject(err)
    }
  }
  return Promise.reject(error)
})

// es6默认导出动作
export default instance

// 业务组件使用axios
// import request from '@/utils/request.js'
// request({url/data/method})

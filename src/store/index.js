import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// localStorage 存储用户信息的key名称，统一设置，方便后续使用
const USER_KEY = 'hm-toutiao-m-user'
export default new Vuex.Store({
  state: {
    // 通过 || 设定，如果localStorage没有数据，就返回{}空对象
    user: JSON.parse(localStorage.getItem(USER_KEY) || '{}')
  },
  mutations: {
    // 修改/更新用户信息
    updateUser (state, data) {
      // vuex更新
      state.user = data
      // localStorage更新
      localStorage.setItem(USER_KEY, JSON.stringify(data))
    },
    // 清除用户信息
    clearUser (state) {
      // vuex清除
      state.user = {}
      // localStorage持久清除
      localStorage.removeItem(USER_KEY)
    }
    // // 单纯清除token
    // clearToken: function (state) {
    //   // 获取token和refresh_token信息
    //   const tokenInfo = JSON.parse(window.localStorage.getItem(USER_KEY))
    //   const tmp = {}
    //   // 摘取处refresh_token
    //   tmp.refresh_token = tokenInfo.refresh_token
    //   // 清除vuex中token数据(保留refresh_token)
    //   delete state.user.token
    //   // 清除localStorage中token数据(保留refresh_token)
    //   window.localStorage.setItem(USER_KEY, JSON.stringify(tmp))
    // }
  },
  actions: {
  },
  modules: {
  }
})

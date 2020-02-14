import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入rem适配
import 'amfe-flexible/index.min.js'
// 导入Vant组件库
import Vant from 'vant'
// 导入Vant样式
import 'vant/lib/index.css'
// 导入全局样式
import '@/assets/css/global.less'
// 导入规则
import '@/utils/validate.js'
// 注册Vant
Vue.use(Vant)
Vue.config.productionTip = false
// 创建一个延迟器，Vue成员
Vue.prototype.$sleep = time => {
  // 返回一个promise对象，异步变同步
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve()
    }, time)
  })
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

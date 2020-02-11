import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home', // 重定向
    component: () => import('@/views/layout/index.vue'),  // 一级路由 布局组件
    children: [
      { path: '/home', component: () => import('@/views/home/index.vue') }, // 二级路由 首页组件
      { path: '/question', component: () => import('@/views/question/index.vue') }, // 二级路由 问答组件
      { path: '/video', component: () => import('@/views/video/index.vue') }, // 二级路由 视频组件
      { path: '/user', component: () => import('@/views/user/index.vue') }, // 二级路由 个人中心组件
    ]
  },
  { path: '/user/profile', component: () => import('@/views/user/profile.vue') }, // 一级路由 编辑资料组件
  { path: '/user/chat', component: () => import('@/views/user/chat.vue') }, // 一级路由 小智同学组件
  { path: '/login', name: 'login', component: () => import('@/views/user/login.vue') }, // 一级路由 登录组件
  { path: '/search', component: () => import('@/views/search/index.vue') }, // 一级路由 搜索中心组件
  { path: '/search/result', component: () => import('@/views/search/result.vue') }, // 一级路由 搜索结果组件
  { path: '/article', component: () => import('@/views/article/index.vue') }, // 一级路由 文章详情组件
]

const router = new VueRouter({
  routes
})

export default router

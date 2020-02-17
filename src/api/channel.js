// 导入axios模块
import request from '@/utils/request.js'
// 导入store
import store from '@/store' // 以便知道用户是否登录系统
// 本地持久化存储频道设置的key（游客  和  登录用户 分别设置）
const CHANNEL_KEY_TRAVEL = 'hm-channel-travel' // 游客key
const CHANNEL_KEY_VIP = 'hm-channel-vip' // 登录用户key
// 创建各个api方法

// 频道列表
export function apiChannelList () {
  // 通过Promise封装，通过resolve返回输出具体信息，
  // 因为所有api接口的返回结果都是Promise对象
  return new Promise(async (resolve) => {
    // 判断用户是否登录，并执行不同的key
    const key = store.state.user.token ? CHANNEL_KEY_VIP : CHANNEL_KEY_TRAVEL
    // 获得 本地频道数据
    const localChannels = localStorage.getItem(key)
    if (localChannels) {
      // 如果有，输出给外部
      resolve({ channels: JSON.parse(localChannels) })
    } else {
      // 如果没有，发送axios请求
      const res = await request({
        url: '/app/v1_0/user/channels',
        method: 'get'
      })
      // 本地存储频道数据
      localStorage.setItem(key, JSON.stringify(res.channels))
      // 输出频道数据给外部
      resolve(res)
    }
  })
}
// export function apiChannelList () {
//   // 请求axios，request就是axios的复制品，操作结构完全一致
//   // return返回执行结果，是promise对象
//   return request({
//     // url:'差异化url地址'
//     url: '/app/v1_0/user/channels',
//     method: 'get'
//     // params:get请求成员标志
//     // data:非get请求成员标志
//   })
// }

// 全部频道列表
export function apiChannelAll () {
  return request({
    url: '/app/v1_0/channels',
    method: 'get'
  })
}

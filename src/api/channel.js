// 导入axios模块
import request from '@/utils/request.js'

// 创建各个api方法
// 全部频道列表
export function apiChannelAll () {
  return request({
    url: '/app/v1_0/channels',
    method: 'get'
  })
}

// 频道列表
export function apiChannelList () {
  // 请求axios，request就是axios的复制品，操作结构完全一致
  // return返回执行结果，是promise对象
  return request({
    // url:'差异化url地址'
    url: '/app/v1_0/user/channels',
    method: 'get'
    // params:get请求成员标志
    // data:非get请求成员标志
  })
}

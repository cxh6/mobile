// 导入axios模块
import request from '@/utils/request.js'

// 创建各个api方法

export function apiArticleList ({ channel_id, timestamp }) {
  // 请求axios，request就是axios的复制品，操作结构完全一致
  // return返回执行结果，是promise对象
  return request({
    // url:'差异化url地址'
    url: '/app/v1_1/articles',
    method: 'get',
    params: {
      channel_id,
      timestamp,
      with_top: 1 // 1包含置顶  0不包含置顶
    }
    // params:get请求成员标志
    // data:非get请求成员标志
  })
}

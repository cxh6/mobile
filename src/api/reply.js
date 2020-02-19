import request from '@/utils/request'
// 创建各种api

// 获取指定‘评论’的所有回复信息
// commentID 评论id
// replyID 回复id
export function apiReplyList ({ commentID, replyID }) {
  return request({
    url: '/app/v1_0/comments',
    method: 'get',
    params: {
      type: 'c',
      source: commentID,
      offset: replyID,
      limit: 10
    }
  })
}

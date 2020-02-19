import request from '@/utils/request'
// 创建各种api

/**
 * 添加评论或回复信息 (接口：【添加评论或评论回复】)
 * @param {*} target 文章或评论的id（评论文章即为 文章id，对评论进行回复则为 评论id）
 * @param {*} content 评论或回复的内容
 * @param {*} art_id 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。
 *                    对文章进行评论，不要传此参数
 */
export function apiAddCorR ({ target, content, art_id = null }) {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data: {
      target,
      content,
      art_id
    }
  })
}

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

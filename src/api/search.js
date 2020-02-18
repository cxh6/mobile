import request from '@/utils/request.js'
// api
// 获取搜索数据
export function apiSearchList ({ q, page = 1, per_page = 10 }) {
  return request({
    url: '/app/v1_0/search',
    method: 'get',
    params: {
      q,
      page,
      per_page
    }
  })
}
// 获取联想建议（自动补全）
export function apiSuggestionList ({ q }) {
  return request({
    url: '/app/v1_0/suggestion',
    method: 'get',
    params: {
      q
    }
  })
}

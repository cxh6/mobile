import request from '@/utils/request.js'
// api
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

/**
 * 搜索建议相关模块
 */
import request from '@/utils/request'

export const searchSuggestions = q => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
        q
    }
  })
}
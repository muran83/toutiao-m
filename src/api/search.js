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

/**
 * 获取用户建议搜索结果
 */
export const getSuggestionsResult = params => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
/**
 * 请求模块
 */
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net' // 接口的基准路径
})

// 请求拦截器

// 响应拦截器

export default request

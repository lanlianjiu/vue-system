import axios from 'axios'
import store from '@/store'
import {
  getToken,
  removeToken
} from '@/utils/auth'
import * as tools from './tools'
import Cookies from 'js-cookie'
const http = axios.create({
  baseURL: '',
  timeout: 30000
})

// request 拦截器
http.interceptors.request.use(
  config => {
    if (getToken()) {

      config.headers['Authorization'] = "Bearer " + getToken();
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// respone 拦截器
http.interceptors.response.use(
  response => {
    const res = response.data
    if (res.error) {
      tools.notify({
        type: 'error',
        message: res.error.message
      })

      if (res.code === "") {
        // 接口自定义错误代码
        // 移除登陆token 显示接口错误消息

      }
      return Promise.reject(res)
    }
    return Promise.resolve(res)
  },
  error => {
removeToken()
    tools.notify({
      type: 'error',
      message: error.message,
      duration: 5000
    })

    return Promise.reject(error)
  }
)

export default http
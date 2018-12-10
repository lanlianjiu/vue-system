import axios from 'axios'
//import store from '@/store'
import {
  getToken,
  removeToken
} from '@/utils/auth'
import * as tools from './tools'

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
    if (error.response.status) {

      switch (error.response.status) {
        case 400:
          tools.notify({
            type: 'error',
            message: "请求错误",
            duration: 5000
          })
          break;
          // 401: 未登录
          // 未登录则跳转登录页面，并携带当前页面的路径
          // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          console.log(error.response.status);

          router.replace({
            path: '/login'
          });
          break;

          // 403 token过期
          // 登录过期对用户进行提示
          // 清除本地token和清空vuex中token对象
          // 跳转登录页面
        case 403:

          tools.notify({
            type: 'error',
            message: "登录过期，请重新登录",
            duration: 5000
          })
          // 清除token
          removeToken();
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
          break;

          // 404请求不存在
        case 404:

          tools.notify({
            type: 'error',
            message: "网络请求不存在",
            duration: 5000
          })
          break;
        case 408:

          tools.notify({
            type: 'error',
            message: "请求超时",
            duration: 5000
          })
          break;
        case 500:

          tools.notify({
            type: 'error',
            message: "服务器内部错误",
            duration: 5000
          })
          break;

        case 501:

          tools.notify({
            type: 'error',
            message: "服务未实现",
            duration: 5000
          })
          break;

        case 502:

          tools.notify({
            type: 'error',
            message: "网关错误",
            duration: 5000
          })
          break;

        case 503:

          tools.notify({
            type: 'error',
            message: "服务不可用",
            duration: 5000
          })
          break;

        case 504:

          tools.notify({
            type: 'error',
            message: "网关超时",
            duration: 5000
          })
          break;

        case 505:

          tools.notify({
            type: 'error',
            message: "HTTP版本不受支持",
            duration: 5000
          })
          break;
          // 其他错误，直接抛出错误提示
        default:
          tools.notify({
            type: 'error',
            message: error.message,
            duration: 5000
          })
      }
    }

    return Promise.reject(error)
  }
)

export default http
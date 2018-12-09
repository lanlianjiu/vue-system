import axios from './api'

/* 将所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 */

// 单独导出
export const get = (url,data) => {
    return axios({
        url: url,
        data: data,
        method: 'get'
    })
}

export const post = (url,data) => {
    return axios({
        url: url,
        data: data,
        method: 'post'
    })
}

export const upload = (url,data) => {
    return axios({
        url: url,
        method: 'post',
        data
    })
}

// 默认全部导出
export default {
    get,
    post,
    upload
}
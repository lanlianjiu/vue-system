import http from '@/utils/http'

export function loginbyUser(username, password) {
  const data = {
    username,
    password
  }
  return http({
    url: '/api/admin/user/login',
    method: 'post',
    data
  })
}

export function logout() {
  return http({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(username) {
  return http({
    url: '/user/info',
    method: 'get',
    params: { username }
  })
}

export function getMenu() {
  return http({
    url: 'api/admin/menu/assigned-menu',
    method: 'get'
  })
}

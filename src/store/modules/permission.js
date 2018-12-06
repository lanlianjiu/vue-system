import { constantRouterMap } from '@/router'
import { asyncRouterMap } from '@/router/asyncRouterMap'
import * as types from '../mutaion-types'
import {
  getMenu
} from '@/api/login'
import _import from '@/utils/import'
const Layout = _import('layout/Layout')
const routePermission = (roles, route) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) > -1)
  } else {
    return true
  }
}

const filterAsyncRouter = (asyncRouterMap, roles) => {
  const routers = asyncRouterMap.filter(route => {
    if (routePermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return routers
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    [types.SET_ROUTERS]: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    generateRoutes({ commit }, roles) {
      return new Promise(async (resolve, reject)=> {
        // let routers = null
        // // 如果 roles 角色中存在 admin 则直接返回所有路由, 否则进行路由过滤
        // roles.indexOf('admin') > -1
        //   ? (routers = asyncRouterMap)
        //   : (routers = filterAsyncRouter(asyncRouterMap, roles))
        // commit(types.SET_ROUTERS, routers)
        // resolve()
        let routers = null
        // 如果 roles 角色中存在 admin 则直接返回所有路由, 否则进行路由过滤
         const response = await getMenu()
        console.log(response)
        if (response) {
          let res = [
            // 个人中心
            {
              path: '/profile',
              component: Layout,
              hidden: true,
              children: [{
                path: 'index',
                component: _import('profile/index'),
                name: 'profile',
                meta: {
                  title: 'profile',
                  icon: 'test'
                }
              }]
            },
            // 控件
            {
              path: '/widget',
              component: Layout,
              children: [{
                path: 'index',
                component: _import('widget/index'),
                name: 'widget',
                meta: {
                  title: 'widget',
                  icon: 'widgets'
                }
              }]
            },
            // 卡片列表
            {
              path: '/panels',
              component: Layout,
              children: [{
                path: 'index',
                component: _import('panels/index'),
                name: 'panels',
                meta: {
                  title: 'panels',
                  icon: 'panels'
                }
              }]
            },
            // 权限页面 只有 admin 用户才可访问
            {
              path: '/permission',
              component: Layout,
              redirect: '/permission/index',
              meta: {
                roles: ['admin']
              },
              children: [{
                path: 'index',
                component: _import('permission/index'),
                name: 'permission',
                meta: {
                  title: 'permission',
                  icon: 'test',
                  roles: ['admin']
                }
              }]
            },
            // 表格
            {
              path: '/datatable',
              component: Layout,
              children: [{
                path: 'index',
                component: _import('datatable/index'),
                name: 'datatable',
                meta: {
                  title: 'datatable',
                  icon: 'table'
                }
              }]
            },
            // 组件
            {
              path: '/components',
              component: Layout,
              redirect: 'noredirect',
              name: 'components',
              meta: {
                title: 'components',
                icon: 'comp'
              },
              children: [{
                  path: 'page1',
                  component: _import('components/page1'),
                  name: 'page1',
                  meta: {
                    title: 'page1'
                  }
                },
                {
                  path: 'page2',
                  component: _import('components/page2'),
                  name: 'page2',
                  meta: {
                    title: 'page2'
                  }
                },
                {
                  path: 'page3',
                  component: _import('components/page3'),
                  name: 'page3',
                  meta: {
                    title: 'page3'
                  }
                }
              ]
            },
            {
              path: '*',
              redirect: '/404',
              hidden: true
            }
          ]
        
        routers = res
        commit(types.SET_ROUTERS, routers)
        resolve()
        }

      })
    }
  }
}

export default permission

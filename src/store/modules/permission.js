import {
  constantRouterMap
} from '@/router'
import {
  asyncRouterMap
} from '@/router/asyncRouterMap'
import * as types from '../mutaion-types'
import {
  getMenu
} from '@/api/login'
import _import from '@/utils/import'
const Layout = _import('layout/Layout')

const filterAsyncRouter = (asyncRouterMap) => {

  asyncRouterMap.forEach(function (value, index) {

    let old_path = value.path;

    if (value.meta.redirect) {
      value.redirect = value.meta.redirect
    }

    if (value.parent) {
      let onestr = (value.path).slice(((value.path).indexOf("/")) + 1)
      value.path = (onestr).slice(((onestr).indexOf("/")) + 1)
    }

    if (value.children) {

      value.component = Layout;
      filterAsyncRouter(value.children, value.path);
    } else {

      let p_path = (old_path).slice(((old_path).indexOf("/")) + 1);

      value.component = _import(p_path);
    }

  });

  return asyncRouterMap

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
    generateRoutes({
      commit
    }, roles) {
      return new Promise(async (resolve, reject) => {

        let routers = null
        const response = await getMenu()
        routers = filterAsyncRouter(response);
        if (routers) {
          commit(types.SET_ROUTERS, routers)
          resolve()
        }
      })
    }
  }
}

export default permission
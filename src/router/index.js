import Vue from 'vue'
import VueRouter from 'vue-router'
import _import from '@/utils/import'
const Layout = _import('layout/Layout')

Vue.use(VueRouter)

export const constantRouterMap = [{
    path: '/401',
    component: _import('errorPage/401'),
    hidden: true
  },
  {
    path: '/404',
    component: _import('errorPage/404'),
    hidden: true
  },
  {
    path: '/login',
    component: _import('login/index'),
    hidden: true
  },
  {
    path: '/lock',
    component: _import('lock/index'),
    name: 'lock',
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: 'noredirect',
    children: [{
      path: 'home',
      name: '首页',
      component: _import('home/index'),
      meta: {
        title: '首页',
        icon: 'home',
        noCache: true,
        openself: true,
      }
    }]
  }
]

export const router = new VueRouter({
  routes: constantRouterMap,
  scrollBehavior: () => ({
    y: 0
  })
})
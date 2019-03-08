import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'Hello',//欢迎页
          component: () => import('./views/Hello.vue')
        },
        {
          path: '/DatabaseFieldQuery',
          name: '数据库字段查询',
          component: () => import('./views/DatabaseFieldQuery.vue')
        },
        {
          path: '/test',
          name: '测试',
          component: () => import('./views/test.vue')
        },
        {
          path: '/about',
          name: '关于',
          component: () => import('./views/About.vue')
        }
      ]
    }

  ]
})

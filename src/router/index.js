import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login') // 项目懒加载的写法
  }
]

const router = new VueRouter({
  routes
})

export default router

import { createWebHashHistory, createRouter } from 'vue-router'
import { useUserInfo } from '@/hooks'

const { menus, permissions, isRoutesGenerated, generateRoutes } = useUserInfo()

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: () => import('@/views/error/index.vue')
    }
  ]
})

const addRouter = () => {
  router.addRoute({
    name: 'layout',
    path: '/',
    redirect: '/dashboard',
    component: () => import('@/layout/index.vue'),
    children: [...menus.value]
  })
}

router.beforeEach((to, _from) => {
  const token = localStorage.getItem('token')

  if (to.path !== '/login' && !token) {
    return '/login'
  }

  if (token && permissions.value.length && !isRoutesGenerated.value) {
    generateRoutes()
    addRouter()
    // 优化：可以直接使用扩展运算符解构 to 对象，并覆盖 replace 属性，比手动写 path 和 query 更好
    return { path: to.path, query: to.query, replace: true }
  }

  return true
  // else {
  //   // 设置isRoutesGenerated防止重复添加，只有第一次需要添加
  //   // 每次页面刷新时动态添加的路由会丢失，isRoutesGenerated值被重置
  //   if (permissions.value.length && !isRoutesGenerated.value) {
  //     generateRoutes()
  //     addRouter()
  //     return { path: to.path, query: to.query, replace: true }
  //   } else {
  //     return true
  //   }
  // }
})

export default router

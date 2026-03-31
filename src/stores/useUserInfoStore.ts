import { defineStore } from 'pinia'
import { ref } from 'vue'
import userRouters from '@/router/userRouters'

export const useUserInfoStore = defineStore('userInfo', () => {
  const isCollapse = ref(false)
  const permissions = ref<string[]>(JSON.parse(localStorage.getItem('permissions') || '[]'))
  const userInfo = ref<any>(null)
  const menus = ref<any[]>([]) // 侧边栏菜单展示用
  const isRoutesGenerated = ref(false) // 标记是否已生成动态路由

  // 切换侧边栏折叠状态
  const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value
  }

  const setPermissions = (perms: string[]) => {
    permissions.value = perms
  }

  const setUserInfo = (info: any) => {
    userInfo.value = info
    if (info.permissions) {
      if (!info.permissions.includes('dashboard')) {
        info.permissions.push('dashboard')
      }
      permissions.value = info.permissions
      localStorage.setItem('permissions', JSON.stringify(info.permissions))
    }
  }

  // 递归过滤路由
  const filterAsyncRoutes = (routes: any[], perms: string[]) => {
    const res: any[] = []
    routes.forEach(route => {
      const tmp = { ...route }
      // 只要本身在权限里，或者子节点在权限里
      const hasPermission = perms.includes(tmp.name)
      const hasChildPermission = tmp.children && tmp.children.some((child: any) => perms.includes(child.name))

      if (hasPermission || hasChildPermission) {
        if (tmp.children) {
          tmp.children = filterAsyncRoutes(tmp.children, perms)
        }
        res.push(tmp)
      }
    })
    return res
  }

  // 生成路由
  const generateRoutes = () => {
    // 过滤出有权限的路由
    const accessibleRoutes = filterAsyncRoutes(userRouters, permissions.value)
    menus.value = accessibleRoutes
    isRoutesGenerated.value = true
    return accessibleRoutes
  }

  const resetState = () => {
    isRoutesGenerated.value = false
    menus.value = []
    permissions.value = []
    userInfo.value = null
  }

  const clearUserInfo = () => {
    resetState()
    localStorage.removeItem('token')
    localStorage.removeItem('permissions')
    localStorage.removeItem('historyMenus')
  }

  return {
    isCollapse,
    permissions,
    userInfo,
    menus,
    isRoutesGenerated,
    toggleCollapse,
    setPermissions,
    setUserInfo,
    generateRoutes,
    resetState,
    clearUserInfo
  }
})

<template>
  <div>
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-menu
      class="sidebar-container-menu"
      mode="vertical"
      :default-active="activeMenu"
      :background-color="scssVariables.menuBg"
      :text-color="scssVariables.menuText"
      :active-text-color="themeColor"
      :collapse="isCollapse"
      :collapse-transition="true"
    >
      <sidebar-item
        v-for="route in menuRoutes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import variables from '@/styles/variables.scss'
import { routes } from '@/router'
import SidebarItem from './SidebarItem.vue'
import { useStore } from '@/store'
import Logo from './Logo.vue'

export default defineComponent({
  name: 'Sidebar',
  components: {
    Logo,
    SidebarItem
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    // 根据路由路径 对应 当前激活的菜单
    const activeMenu = computed(() => {
      const { path, meta } = route
      // 可根据meta.activeMenu指定 当前路由激活时 让哪个菜单高亮选中
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })
    // scss变量
    const scssVariables = computed(() => variables)
    // 展开收起状态 稍后放store 当前是展开就让它收起
    const isCollapse = computed(() => !store.getters.sidebar.opened)

    // 渲染路由
    const menuRoutes = computed(() => routes)

    // 获取主题色
    const themeColor = computed(() => store.getters.themeColor)

    // 是否显示logo
    const showLogo = computed(() => store.state.settings.sidebarLogo)

    return {
      // ...toRefs(variables), // 不有toRefs原因 缺点variables里面变量属性来源不明确
      scssVariables,
      isCollapse,
      activeMenu,
      menuRoutes,
      themeColor,
      showLogo
    }
  }
})
</script>

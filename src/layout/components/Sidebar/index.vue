<template>
  <div>
    <!-- 测试展开收起 -->
    <div @click="isCollapse=!isCollapse">展收测试</div>
    <el-menu
      class="sidebar-container-menu"
      mode="vertical"
      :default-active="activeMenu"
      :background-color="scssVariables.menuBg"
      :text-color="scssVariables.menuText"
      :active-text-color="scssVariables.menuActiveText"
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
import { defineComponent, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import variables from '@/styles/variables.scss'
// 导入路由表
import { routes } from '@/router'
import SidebarItem from './SidebarItem.vue'

export default defineComponent({
  name: 'Sidebar',
  components: {
    SidebarItem
  },
  setup() {
    const route = useRoute() // 等价于 this.$route
    // 根据路由路径 对应 当前激活的菜单
    const activeMenu = computed(() => {
      const { path } = route
      return path
    })
    // scss变量
    const scssVariables = computed(() => variables)
    // 展开收起状态 稍后放store
    const isCollapse = ref(false)

    // 渲染路由
    const menuRoutes = computed(() => routes)

    return {
      // 不有toRefs原因 缺点在这里 variables里面变量属性感觉来源不明确 不知道有哪些变量值
      // ...toRefs(variables),
      scssVariables,
      isCollapse,
      activeMenu,
      menuRoutes
    }
  }
})
</script>

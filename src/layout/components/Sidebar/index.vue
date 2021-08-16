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
      <sidebar-item />
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import variables from '@/styles/variables.scss'
import SidebarItem from './SidebarItem.vue'

export default defineComponent({
  name: 'Sidebar',
  components: {
    SidebarItem
  },
  setup() {
    const route = useRoute()
    // 根据路由路径 对应 当前激活的菜单
    const activeMenu = computed(() => {
      const { path } = route
      return path
    })
    // scss变量
    const scssVariables = computed(() => variables)
    // 展开收起状态 稍后放store
    const isCollapse = ref(true)

    return {
      // ...toRefs(variables), // 不有toRefs原因 缺点variables里面变量属性来源不明确
      scssVariables,
      isCollapse,
      activeMenu
    }
  }
})
</script>

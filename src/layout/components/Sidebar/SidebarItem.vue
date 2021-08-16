<template>
  <div class="sidebar-item-container">
    <!-- 只渲染一个路由 并且路由只有一个子路由时直接渲染这个子路由 -->
    <template
      v-if="theOnlyOneChildRoute && !theOnlyOneChildRoute.children"
    >
      <sidebar-item-link
        v-if="theOnlyOneChildRoute.meta"
        :to="resolvePath(theOnlyOneChildRoute.path)"
      >
        <el-menu-item
          :index="resolvePath(theOnlyOneChildRoute.path)"
        >
          <svg-icon
            v-if="icon"
            class="menu-icon"
            :icon-class="icon"
          ></svg-icon>
          <template #title>
            <span>{{ theOnlyOneChildRoute.meta.title }}</span>
          </template>
        </el-menu-item>
      </sidebar-item-link>
    </template>
    <!-- 有多个子路由时 -->
    <el-submenu
      v-else
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template #title>
        <svg-icon
          v-if="item.meta.icon"
          class="menu-icon"
          :icon-class="item.meta.icon"
        ></svg-icon>
        <span class="submenu-title">{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      >
      </sidebar-item>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import path from 'path'
import { defineComponent, PropType, computed, toRefs } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import SidebarItemLink from './SidebarItemLink.vue'
import { isExternal } from '@/utils/validate'

export default defineComponent({
  name: 'SidebarItem',
  components: {
    SidebarItemLink
  },
  props: {
    item: {
      type: Object as PropType<RouteRecordRaw>,
      required: true
    },
    basePath: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const { item } = toRefs(props)

    // 子路由数量
    const showingChildNumber = computed(() => {
      const children = (props.item.children || []).filter(child => {
        if (child.meta && child.meta.hidden) return false
        return true
      })
      return children.length
    })

    // 只有一个可渲染的子路由直接渲染这个子路由 （由于我们有的路由 layout布局组件是一级路由 二级路由才是我们要渲染成菜单）
    const theOnlyOneChildRoute = computed(() => {
      // 多个children
      if (showingChildNumber.value > 1) {
        return null
      }

      // 子路由只有一个时 并且做个hidden筛选
      if (item.value.children) {
        for (const child of item.value.children) {
          if (!child.meta || !child.meta.hidden) { // hidden属性控制路由是否渲染成菜单
            return child
          }
        }
      }

      // showingChildNumber === 0
      // 没有可渲染chiildren时 把当前路由item作为仅有的子路由渲染
      return {
        ...props.item,
        path: '' // resolvePath避免resolve拼接时 拼接重复
      }
    })

    // menu icon
    const icon = computed(() => {
      // 子路由 如果没有icon就用父路由的
      return theOnlyOneChildRoute.value?.meta?.icon || (props.item.meta && props.item.meta.icon)
    })

    // 拼接路径 父路径+子路径（相对路径）
    const resolvePath = (childPath: string) => {
      // 如果是带协议外链 直接返回
      if (isExternal(childPath)) {
        return childPath
      }
      // 如果不是外链 需要和basePath拼接
      return path.resolve(props.basePath, childPath)
    }

    return {
      theOnlyOneChildRoute,
      icon,
      resolvePath
    }
  }
})
</script>

<style lang="scss">
.sidebar-item-container {
  .menu-icon {
    margin-right: 16px;
    margin-left: 5px;
    vertical-align: middle;
  }
}
</style>

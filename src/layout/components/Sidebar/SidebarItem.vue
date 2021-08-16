<template>
  <div class="sidebar-item-container">
    <el-menu-item index="1">
      <svg-icon class="menu-icon" icon-class="lock"></svg-icon>
      <template #title>
        <span>Dashoard</span>
      </template>
    </el-menu-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SidebarItem'
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

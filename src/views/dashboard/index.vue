<template>
  <div>
    <h1>Dashboard page</h1>
    缓存测试 <input type="text">
    <svg-icon icon-class="bug"></svg-icon>
    <!-- icon-class svg图标名称 class-name 额外的自定义类名 @click绑定事件 -->
    <svg-icon icon-class="404" class-name="custom-class" @click="sayHi"></svg-icon>
    <h1>测试持久化</h1>
    <h2 @click="addCount">点击刷新 {{count}}</h2>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  name: 'Dashboard',
  setup() {
    const store = useStore()

    const count = computed(() => store.state.test.count)
    const addCount = () => {
      store.dispatch('test/addCount')
    }
    return {
      count,
      addCount
    }
  }
})
</script>

<style lang="scss">
  .custom-class { // 自定义样式404
    font-size: 200px;
    color: green;
  }
</style>

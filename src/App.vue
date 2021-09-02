<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useGenerateTheme } from '@/hooks/useGenerateTheme'

export default defineComponent({
  name: 'App',
  setup() {
    // 根据此时store中主题色生成
    useGenerateTheme()
  }
})
</script>

<style>
#app {
  height: 100%;
}
</style>

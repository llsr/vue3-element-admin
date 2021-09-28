<template>
   <el-dropdown
    class="avatar-container">
    <div class="avatar-wrapper">
      <img :src="avatar" class="user-avatar">
      <i class="el-icon-caret-bottom" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <router-link to="/">
          <el-dropdown-item>首页</el-dropdown-item>
        </router-link>
        <router-link to="/profile/index">
          <el-dropdown-item>个人设置</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided @click="logout">
          <span style="display: block">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import avatar from '@/assets/logo.png'
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    const router = useRouter()
    const logout = () => {
      router.push({
        path: '/login'
      })
    }
    return {
      logout,
      avatar
    }
  }
})
</script>

<style lang="scss" scoped>
.avatar-container {
  margin-right: 30px;
  .avatar-wrapper {
    margin-top: 5px;
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      cursor: pointer;
    }

    .el-icon-caret-bottom {
      cursor: pointer;
      font-size: 12px;
    }
  }
}
</style>

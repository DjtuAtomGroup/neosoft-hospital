<template>
  <div class="w-screen h-screen flex">
    <el-container>
      <el-header class="w-full h-full flex">
        <TheHeader>
          <template #action>
            <el-dropdown placement="bottom">
              <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" shape="square" />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>切换角色</el-dropdown-item>
                  <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </TheHeader>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <TheMenu />
        </el-aside>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { TheMenu } from '@/components'
import TheHeader from '@/components/TheHeader.vue'

const router = useRouter();

const logout = () => {
  router.push('/login');
  // TODO clear localstorage similar token
}
</script>

<style scoped>
:deep() {
  .el-header {
    padding: 0;
  }
}
</style>

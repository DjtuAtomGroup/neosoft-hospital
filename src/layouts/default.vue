<template>
  <div class="w-screen h-screen flex">
    <el-container>
      <el-header class="w-full h-full flex">
        <TheHeader />
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
</script>

<style scoped>
:deep() {
  .el-header {
    padding: 0;
  }

  .el-main {
    background: rgba(230, 230, 230, 0.57);
  }
}
</style>

<template>
  <div class="w-full h-full bg-blue-500 flex items-center justify-between gap-4 px-4">
    <h1 class="text-xl font-bold text-white hover:underline cursor-pointer" @click="refreshPage">
      东软云医院管理系统
    </h1>
    <div class="w-full h-full flex flex-1 items-center justify-end">
      <slot name="action" />
    </div>
  </div>
</template>

<script setup lang="ts">
const refreshPage = () => {
  location.reload()
}
</script>

<style scoped></style>

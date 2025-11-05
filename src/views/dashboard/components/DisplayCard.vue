<template>
  <div class="w-full h-fit max-h-[200px] flex">
    <el-card :shadow="shadow" class="w-full">
      <div class="w-full h-auto flex flex-col gap-4 items-center justify-center">
        <div class="text-2xl font-bold">{{ title }}</div>
        <div class="text-5xl font-bold">{{ data }}</div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">

type displayCardProps = {
  data: number;
  shadow: 'never' | 'always' | 'hover';
  title: string;
};

const props = withDefaults(defineProps<displayCardProps>(), {
  data: 0,
  shadow: 'always',
  title: '展示数据',
});

const { data, shadow, title } = toRefs(props);
</script>

<style scoped>
:deep(.el-card__body) {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>

<template>
  <div class="flex w-full h-full flex-col gap-4 text-2xl font-bold">
    <PageHeader content="仪表盘">
      <template #action>
        <el-button type="primary" @click="getData">刷新</el-button>
        <el-button v-permission="'doctor'" :type="onLineType" @click="handleOnlineOrOffline">{{
          appStore.getOnlineStatus ? '下线' : '上线'
        }}</el-button>
      </template>
    </PageHeader>
    <template v-if="showDocPanel">
      <div class="w-full h-auto grid grid-cols-5 gap-4">
        <DisplayCard :title="'患者数'" :data="dataList?.patientCount ?? 0" />
        <DisplayCard :title="'预约数'" :data="dataList?.appointmentCount ?? 0" />
        <DisplayCard :title="'药品数'" :data="dataList?.medicineCount ?? 0" />
        <DisplayCard :title="'医生数'" :data="dataList?.doctorCount ?? 0" />
        <DisplayCard :title="'挂号数'" :data="dataList?.registrationCount ?? 0" />
      </div>
    </template>
    <template v-else>
      <div class="w-full h-auto grid grid-cols-5 gap-4">
        <DisplayCard :title="'患者数'" :data="dataList?.patientCount ?? 0" />
        <DisplayCard :title="'药品数'" :data="dataList?.medicineCount ?? 0" />
        <DisplayCard :title="'医生数'" :data="dataList?.doctorCount ?? 0" />
      </div>
    </template>
    <div class="w-full flex-1 flex">
      <el-card class="w-full h-full">
        <div class="w-full h-full flex flex-col justify-center items-center">
          <el-empty description="暂无数据" />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IDashboard } from '@/types/common'
import { computed, onMounted } from 'vue'
import { queryDashboard } from '@/server/api/dashboard'
import useUserStore from '@/store/user'
import DisplayCard from '@/views/dashboard/components/DisplayCard.vue'
import PageHeader from '@/components/PageHeader.vue'
import { Notice } from '@/utils'
import useAppStore from '@/store/app'

const dataList = ref<IDashboard | null>(null)
const isLoading = ref<boolean>(false)
const userStore = useUserStore()
const appStore = useAppStore()
const showDocPanel = computed(() => {
  return userStore.getRole === 'doctor'
})
const isOnLine = ref<boolean>(false)
const onLineType = computed(() => {
  const onLineStatus = appStore.getOnlineStatus
  return onLineStatus ? 'success' : 'warning'
})

const getData = async () => {
  isLoading.value = true
  const { id } = userStore.getUser ?? {}
  const res: never = await queryDashboard(id ?? '')
  const { status, data, message } = res
  isLoading.value = false
  if (status === 200) {
    dataList.value = data
    appStore.updateDashboardData(data)
  } else {
    console.error('获取数据失败:', message)
    dataList.value = null
  }
}

const handleOnlineOrOffline = () => {
  isOnLine.value = !isOnLine.value
  appStore.updateOnlineStatus(isOnLine.value)
  Notice({
    type: isOnLine.value ? 'success' : 'warning',
    message: isOnLine.value ? '已上线' : '已下线',
  })
}

onMounted(() => {
  if (appStore.isDashboardEmpty) {
    getData()
  } else {
    dataList.value = appStore.getDashboardData
  }
})
</script>

<style scoped>
:deep(.el-card__body) {
  display: flex;
  height: 100%;
}
</style>

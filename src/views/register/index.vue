<template>
  <div class="w-full h-full flex flex-col gap-4">
    <PageHeader content="挂号管理">
      <template #action>
        <el-button v-permission="'patient'" type="primary" @click="addRegistration">新增挂号</el-button>
        <el-button type="warning" @click="refreshData">刷新</el-button>
      </template>
    </PageHeader>
    <div class="w-full h-full flex flex-col gap-4">
      <div class="w-full h-full flex">
        <el-card shadow="never" class="w-full h-full">
          <el-table v-loading="isLoading" :data="dataList" border stripe fit>
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="patientId" label="患者ID" />
            <el-table-column prop="deptName" label="科室" />
            <el-table-column prop="doctorName" label="医生姓名" />
            <el-table-column prop="status" label="状态">
              <template #default="{ row }">
                <el-tag>{{
                  REGISTER_STATUS.find((item) => item.value === row.status)?.key ?? '未知'
                }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="fee" label="费用" />
            <el-table-column prop="regTime" label="挂号时间" />
            <el-table-column prop="createAt" label="创建时间" />
            <el-table-column prop="updateAt" label="更新时间" />
            <el-table-column label="操作" :fixed="'right'">
              <template #default="{ row }">
                <div class="w-full h-auto gap-4 flex items-center justify-center">
                  <el-button
                    v-permission="'doctor'"
                    type="primary"
                    size="small"
                    @click="editRegistration(row)"
                  >编辑</el-button
                  >
                  <!-- 取消挂号 -->
                  <el-button
                    v-permission="'patient'"
                    type="warning"
                    size="small"
                    @click="cancelRegistration(row.id)"
                  >取消</el-button>
                  <el-popconfirm title="确定删除该挂号吗？" @confirm="handleDelete(row.id)">
                    <template #reference>
                      <el-button v-permission="'doctor'" type="danger" size="small">删除</el-button>
                    </template>
                  </el-popconfirm>
                </div>
              </template>
            </el-table-column>
            <template #empty>
              <el-empty description="暂无药品" />
            </template>
          </el-table>
        </el-card>
      </div>
      <div class="w-full flex-1 justify-end items-center flex">
        <el-pagination
          layout="prev, pager, next"
          :total="page.total"
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </div>
  <EditRegistrationModal
    v-model:show="showModal"
    :data="currentRow"
    :mode="modalMode"
    @submit="refreshData"
  />
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import useTable from '@/hook/table'
import { ElMessage } from 'element-plus'
import { IRegistration } from '@/types/common'
import { queryRegistrationPage, deleteRegistration } from '@/server/api/register'
import EditRegistrationModal from '@/views/register/components/EditRegistrationModal.vue'
import { REGISTER_STATUS } from '@/const'

const isLoading = ref<boolean>(false)
const modalMode = ref<'add' | 'edit'>('add')
const dataList = ref<IRegistration[]>([])
const showModal = ref<boolean>(false)
const currentRow = ref<IRegistration | null>(null)
const page = reactive({
  index: 1,
  size: 10,
  total: 0,
})
const { getPageData } = useTable<{ index: number; size: number }, IRegistration>({
  fetchData: queryRegistrationPage,
})

const initData = async () => {
  isLoading.value = true
  const data = await getPageData({ index: page.index, size: page.size })
  const { records, total, index, size } = data
  dataList.value = records
  page.index = index
  page.size = size
  page.total = total
  isLoading.value = false
}
const refreshData = async () => {
  isLoading.value = true
  const data = await getPageData({ index: page.index, size: page.size })
  const { records, total, index, size } = data
  dataList.value = records
  page.index = index
  page.size = size
  page.total = total
  isLoading.value = false
}

const addRegistration = () => {
  showModal.value = true
  modalMode.value = 'add'
  currentRow.value = null
}

const editRegistration = (row: IRegistration) => {
  showModal.value = true
  modalMode.value = 'edit'
  currentRow.value = row
}
const cancelRegistration = async (index: string) => {
  const res: never = await cancelRegistration(index)
  const { message } = res
  ElMessage.success(message)
  await refreshData()
}
const handleDelete = async (index: string) => {
  const res: never = await deleteRegistration(index)
  const { message } = res
  ElMessage.success(message)
  await refreshData()
}

const handlePageChange = async (index: number) => {
  page.index = index
  await refreshData()
}

onMounted(() => {
  initData()
})
</script>

<style scoped></style>

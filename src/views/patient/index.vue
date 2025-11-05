<template>
  <div class="w-full h-full flex flex-col gap-4">
    <PageHeader content="患者管理">
      <template #action>
        <el-button type="primary" @click="addPatient">新增患者</el-button>
        <el-button type="warning" @click="refreshData">刷新</el-button>
      </template>
    </PageHeader>
    <div class="w-full h-full flex flex-col gap-4">
      <div class="w-full h-full flex">
        <el-card shadow="never" class="w-full h-full">
          <el-table v-loading="isLoading" :data="dataList" border stripe fit>
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="gender" label="性别">
              <template #default="{ row }">
                <el-tag>{{ row?.gender === 0 ? '男' : '女' }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="age" label="年龄" />
            <el-table-column prop="disease" label="疾病">
              <template #default="{ row }">
                <el-tag v-for="disease in row?.disease" :key="disease">{{ disease }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" />
            <el-table-column prop="updateTime" label="更新时间" />
            <el-table-column label="操作" :fixed="'right'">
              <template #default="{ row }">
                <div class="w-full h-auto gap-4 flex items-center justify-center">
                  <el-button v-permission="'doctor'" type="primary" size="small" @click="editPatient(row)">编辑</el-button>
                  <el-popconfirm title="确定删除该患者吗？" @confirm="handleDelete(row.id)">
                    <template #reference>
                      <el-button v-permission="'doctor'" type="danger" size="small">删除</el-button>
                    </template>
                  </el-popconfirm>
                </div>
              </template>
            </el-table-column>
            <template #empty>
              <el-empty description="暂无患者" />
            </template>
          </el-table>
        </el-card>
      </div>
      <div class="w-full flex-1 justify-end items-center flex">
        <el-pagination layout="prev, pager, next" :total="page.total" @current-change="hanldePageChange" />
      </div>
    </div>
  </div>
  <EditPatientModal v-model:show="showModal" :data="currentRow" :mode="modalMode" @submit="refreshData" />
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import useTable from '@/hook/table'
import { deletePatient, queryPatientPage } from '@/server/api/patient'
import EditPatientModal from '@/views/patient/components/EditPatientModal.vue'
import { IPatient } from '@/types/common'
import { ElMessage } from 'element-plus'

const isLoading = ref<boolean>(false);
const modalMode = ref<'add' | 'edit'>('add');
const dataList = ref<IPatient[]>([]);
const showModal = ref<boolean>(false);
const currentRow = ref<IPatient | null>(null);
const page = reactive({
  index: 1,
  size: 10,
  total: 0,
});
const { getPageData } = useTable<{ index: number; size: number }, IPatient>({ fetchData: queryPatientPage });

const initData = async () => {
  isLoading.value = true;
  const data = await getPageData({ index: page.index, size: page.size });
  const { records, total, index, size } = data;
  dataList.value = records;
  page.index = index;
  page.size = size;
  page.total = total;
  isLoading.value = false;
}
const refreshData = async () => {
  isLoading.value = true;
  const data = await getPageData({ index: page.index, size: page.size });
  const { records, total, index, size } = data;
  dataList.value = records;
  page.index = index;
  page.size = size;
  page.total = total;
  isLoading.value = false;
}

const addPatient = () => {
  showModal.value = true;
  modalMode.value = 'add';
  currentRow.value = null;
}

const editPatient = (row: patientDataType) => {
  // console.log('editPatient', row);
  showModal.value = true;
  modalMode.value = 'edit';
  currentRow.value = row;
}

const handleDelete = async (index: string) => {
  const res: never = await deletePatient(index);
  const { message } = res;
  ElMessage.success(message);
  await refreshData();
};

const hanldePageChange = async (index: number) => {
  page.index = index;
  await refreshData();
};

onMounted(() => {
  initData();
});
</script>

<style scoped>

</style>

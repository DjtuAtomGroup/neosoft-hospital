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
              <template #default="row">
                <el-tag>{{ row?.gender === '0' ? '男' : '女' }}</el-tag>
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
                  <el-button type="primary" size="small" @click="editPatient(row)">编辑</el-button>
                  <el-button type="danger" size="small">删除</el-button>
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
        <el-pagination layout="prev, pager, next" :total="100" />
      </div>
    </div>
  </div>
  <EditPatientModal v-model:show="showModal" :data="currentRow" :mode="modalMode" />
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import useTable from '@/hook/table'
import { queryPatientPage } from '@/server/api/patient'
import EditPatientModal from '@/views/patient/components/EditPatientModal.vue'


export type patientDataType = {
  id: string;
  name: string;
  age: string;
  gender: string; // 0 male 1 female
  disease: string[];
  createTime: string;
  updateTime: string;
}

const isLoading = ref<boolean>(false);
const modalMode = ref<'add' | 'edit'>('add');
const dataList = ref<patientDataType[]>([]);
const showModal = ref<boolean>(false);
const currentRow = ref<patientDataType | null>(null);
const page = reactive({
  index: 1,
  size: 10,
});
const { getPageData } = useTable({ fetchData: queryPatientPage }<patientDataType>);

const initData = async () => {
  isLoading.value = true;
  const data = await getPageData({ index: page.index, size: page.size });
  dataList.value = data;
  isLoading.value = false;
}
const refreshData = async () => {
  isLoading.value = true;
  const data = await getPageData({ index: page.index, size: page.size });
  dataList.value = data;
  isLoading.value = false;
}

const addPatient = () => {
  showModal.value = true;
  modalMode.value = 'add';
}

const editPatient = (row: patientDataType) => {
  // console.log('editPatient', row);
  showModal.value = true;
  modalMode.value = 'edit';
  currentRow.value = row;
}

onMounted(() => {
  initData();
});
</script>

<style scoped>

</style>

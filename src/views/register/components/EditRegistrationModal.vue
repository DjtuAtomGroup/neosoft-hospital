<template>
  <el-dialog v-model="visible" draggable :title="title" :close-on-click-modal="false" width="500px">
    <template #default>
      <el-form :model="form">
        <el-form-item label="患者ID" required>
          <el-input v-model="form.patientId" placeholder="请输入患者ID" />
        </el-form-item>
        <el-form-item label="科室" required>
          <el-input v-model="form.deptName" placeholder="请输入科室名称" />
        </el-form-item>
        <el-form-item label="预约时间" required>
          <el-date-picker
            v-model="form.appointmentTime"
            type="datetime"
            placeholder="请选择预约时间"
          />
        </el-form-item>
        <el-form-item label="状态" required>
          <el-radio-group v-model="form.status">
            <el-radio-button
              v-for="(item, index) in REGISTER_STATUS"
              :key="index"
              :value="item.value"
              >{{ item.key }}</el-radio-button
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="费用" required>
          <el-input-number v-model="form.fee" :min="0" placeholder="请输入挂号费用" />
        </el-form-item>
        <el-form-item label="挂号时间" required>
          <el-date-picker v-model="form.regTime" type="datetime" placeholder="请选择挂号时间" />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div class="w-full h-auto flex items-center justify-end gap-4">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { REGISTER_STATUS } from '@/const'
import { Message } from '@/utils'
import { addRegistration, updateRegistration } from '@/server/api/register'
import { IRegistration } from '@/types/common'

type addProp = {
  show: boolean
  mode: 'add' | 'edit'
  data: IRegistration | null
}

const props = withDefaults(defineProps<addProp>(), {
  show: false,
  mode: 'add',
  data: null,
})

const { show, mode, data } = toRefs(props)

const form = reactive<IRegistration>({
  id: '',
  patientId: '',
  deptName: '',
  doctorName: '',
  appointmentTime: '',
  status: 0,
  fee: 0,
  regTime: '',
  createAt: '',
  updateAt: '',
})

const emits = defineEmits(['update:show', 'submit'])

const visible = computed({
  get: () => show.value,
  set: (value) => emits('update:show', value),
})

const title = computed(() => {
  return mode.value === 'add' ? '新增挂号' : '编辑挂号'
})

const initData = () => {
  if (mode.value === 'edit') {
    form.id = data.value?.id ?? ''
    form.patientId = data.value?.patientId ?? ''
    form.doctorId = data.value?.doctorId ?? ''
    form.deptName = data.value?.deptName ?? ''
    form.doctorName = data.value?.doctorName ?? ''
    form.appointmentTime = data.value?.appointmentTime ?? ''
    form.status = data.value?.status ?? 0
    form.fee = data.value?.fee ?? 0
    form.regTime = data.value?.regTime ?? ''
  } else {
    form.id = ''
    form.patientId = ''
    form.doctorId = ''
    form.deptName = ''
    form.doctorName = ''
    form.appointmentTime = ''
    form.status = 0
    form.fee = 0
    form.regTime = ''
  }
}

const handleConfirm = async () => {
  const params: IRegistration = {
    ...form,
  }
  if (mode.value === 'add') {
    const res: never = await addRegistration(params)
    const { message, status } = res
    if (status === 200) {
      Message.success(message)
    } else {
      Message.warning(message)
    }
  } else {
    const res: never = await updateRegistration(params)
    const { status, message } = res
    if (status === 200) {
      Message.success(message)
    } else {
      Message.warning(message)
    }
  }
  visible.value = false
  emits('submit')
}

watchEffect(() => {
  initData()
})
</script>

<style scoped></style>

<template>
  <el-dialog v-model="visible" draggable :title="title" :close-on-click-modal="false" width="500px">
    <template #default>
      <el-form :model="form">
        <el-form-item label="姓名">
          <el-input
            v-model="form.name"
            placeholder="请输入姓名"
            maxlength="8"
            show-word-limit
            clearable
          />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="form.age" :min="18" :max="60" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.gender">
            <el-radio-button :value="0">男</el-radio-button>
            <el-radio-button :value="1">女</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="疾病">
          <el-select
            v-model="form.disease"
            multiple
            :max-collapse-tags="2"
            placeholder="请选择疾病"
          >
            <el-option v-for="item in DISEASE_LIST" :key="item" :label="item" :value="item" />
          </el-select>
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
import { DISEASE_LIST } from '@/const'
import { IEditPatient, IPatient } from '@/types/common'
import { addPatient, updatePatient } from '@/server/api/patient'
import { Message } from '@/utils'

type addProp = {
  show: boolean
  mode: 'add' | 'edit'
  data: IPatient | null
}

const props = withDefaults(defineProps<addProp>(), {
  show: false,
  mode: 'add',
  data: null,
})

const { show, mode, data } = toRefs(props)

const form = reactive({
  name: '',
  age: '',
  gender: '0',
  disease: [],
})

const emits = defineEmits(['update:show', 'submit'])

const visible = computed({
  get: () => show.value,
  set: (value) => emits('update:show', value),
})

const title = computed(() => {
  return mode.value === 'add' ? '新增患者' : '编辑患者'
})

const initData = () => {
  if (mode.value === 'edit') {
    form.name = data.value?.name || ''
    form.age = String(data.value?.age) || ''
    form.gender = data.value?.gender || 0
    form.disease = data.value?.disease || []
  } else {
    form.name = ''
    form.age = 18
    form.gender = 0
    form.disease = []
  }
  console.log('form', form)
}

const handleConfirm = async () => {
  const params: IEditPatient = {
    id: data.value?.id || '',
    ...form,
  }
  if (mode.value === 'add') {
    const res: never = await addPatient(params)
    const { message, status } = res
    if (status === 200) {
      Message.success(message)
    } else {
      Message.warning(message)
    }
  } else {
    const res: never = await updatePatient(params)
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

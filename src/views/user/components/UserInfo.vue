<template>
  <div class="w-full h-full flex flex-col">
    <div class="w-1/2 h-auto flex flex-col gap-4">
      <el-form ref="formRef" :model="form">
        <!-- avatar -->
        <el-form-item label="头像">
          <el-avatar size="large" shape="circle" :src="DEFAULT_AVATAR" />
        </el-form-item>
        <el-form-item label="姓名" :required="requiredFields">
          <el-input v-model="form.name" placeholder="请输入姓名" :disabled="isEditable" />
        </el-form-item>
        <el-form-item label="性别" :required="requiredFields">
          <el-radio-group v-model="form.gender" :disabled="isEditable">
            <el-radio-button :value="0">男</el-radio-button>
            <el-radio-button :value="1">女</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" :required="requiredFields">
          <el-input-number
            v-model="form.age"
            type="number"
            :min="20"
            :max="80"
            placeholder="请输入年龄"
            :disabled="isEditable"
          />
        </el-form-item>
        <el-form-item label="密码" :required="requiredFields">
          <el-input
            v-model="form.password"
            type="password"
            show-password
            placeholder="请输入密码"
            :disabled="isEditable"
          />
        </el-form-item>
        <el-form-item label="角色" :required="requiredFields">
          <el-input v-model="form.role" placeholder="请输入角色" :disabled="isEditable" />
        </el-form-item>
      </el-form>
      <div v-if="requiredFields" class="w-full h-auto flex items-center justify-end">
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IEditUser, IUser } from '@/types/common'
import { DEFAULT_AVATAR } from '@/const'
import { Message } from '@/utils'
import { updateUser } from '@/server/api/user'

type userInfoProps = {
  mode: 'view' | 'edit'
  data: IUser | null
}

const props = withDefaults(defineProps<userInfoProps>(), {
  mode: 'view',
  data: null,
})

const { mode, data } = toRefs(props)

const formRef = ref();
const form = reactive<IUser>({
  id: data.value?.id ?? '',
  name: data.value?.name ?? '',
  gender: data.value?.gender ?? 0,
  disease: data.value?.disease ?? [],
  age: data.value?.age ?? 0,
  password: data.value?.password ?? '',
  role: data.value?.role ?? '',
  createAt: data.value?.createAt ?? '',
  updateAt: data.value?.updateAt ?? '',
})

const initData = () => {
  form.name = data.value?.name ?? '';
  form.age = data.value?.age ?? 0;
  form.gender = data.value?.gender ?? 0;
  form.disease = data.value?.disease ?? [];
  form.password = data.value?.password ?? '';
  form.role = data.value?.role ?? '';
}

const requiredFields = computed(() => {
  return mode.value === 'edit'
})

const isEditable = computed(() => {
  return mode.value === 'view'
})

const emits = defineEmits(['update'])

const handleSubmit = async () => {
  const params: IEditUser = {
    age: form.age,
    gender: form.gender,
    id: form.id,
    name: form.name,
    password: form.password,
    role: form.role,
  }
  const res = await updateUser(params);
  console.log('updateUser response:', res);
  const { status } = res;
  if (status === 200) {
    Message.success('更新用户信息成功');
    emits('update');
  } else {
    console.error('Failed to update user:', res);
    Message.warning('更新用户信息失败');
  }
}


watchEffect(() => {
  initData();
})
</script>

<style scoped></style>

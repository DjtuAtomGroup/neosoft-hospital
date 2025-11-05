import { ElMessage, ElNotification } from 'element-plus'

export const Message = ElMessage

export const Notice = ElNotification

export const isLogin = () => {
  const res = localStorage.getItem('userInfo')
  return !!res
}

export const getUserId = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  return userInfo.id || ''
}

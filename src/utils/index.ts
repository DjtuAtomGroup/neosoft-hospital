import { ElMessage, ElNotification } from 'element-plus'

export const Message = ElMessage;

export const Notice = ElNotification;

export const isLogin = () => {
  const res = localStorage.getItem('userInfo');
  return !!res;
}

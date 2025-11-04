import axios from 'axios'
import { Message } from '../utils'


const $request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})


$request.interceptors.request.use((request) => {
  if (!request.method) {
    request.method = 'get';
  }
  if (!request.headers['Authorization']) {
    request.headers['Authorization'] = 'Bearer your-token';
  }
  return request;
});



$request.interceptors.response.use((response) => {
  const { status, data, message } = response;

  if (status === 200) {
    return data;
  } else {
    Message.error('请求失败', message);
    console.error('请求失败:', message);
    return Promise.reject(new Error(message || '请求失败'));
  }
});

export default $request;

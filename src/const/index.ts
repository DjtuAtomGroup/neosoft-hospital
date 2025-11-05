import { userStoreType } from '../store/user/types'

export const PAGE_HEADER_CONTENT = '东软云医院管理系统 - 闫家辉'

export const DISEASE_LIST = ['高血压', '糖尿病', '冠心病', '脑卒中', '慢性阻塞性肺病', '慢性肾病', '慢性肝病', '慢性胃病', '慢性肠炎', '慢性胆囊炎'];

export const DEFAULT_USER: userStoreType = {
  id: '1111',
  name: '默认用户',
  gender: 0,
  disease: [],
  age: 25,
  password: '123456',
  token: 'ejh-token',
  role: 'doctor',
  createAt: '2023-01-01 00:00:00',
  updateAt: '2023-01-01 00:00:00',
};

export const DEFAULT_AVATAR = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';

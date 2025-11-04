import Mock from 'mockjs';
import setupMock, { successResponseWrap } from '../utils/setup-mock';
import { IPage } from '../types'
import { patientDataType } from '../views/patient/index.vue'
import { DISEASE_LIST } from '../const'

const getPatientPage = (config: IPage<never>) => {
  const resultList: patientDataType[] = [];
  const { index, size } = config;
  // _newList 通过 index 和 size 生成模拟数据
  for (let i = 0; i < size; i++) {
    resultList.push({
      id: Mock.mock('@id'),
      name: Mock.mock('@cname'),
      age: Mock.mock('@integer(18, 60)'),
      gender: Mock.mock('@integer(0, 1)'),
      // disease 从 list 中任意选择两个组成数组
      disease: Mock.mock(`@pick(${DISEASE_LIST.join(',')}, 2)`).split(','),
      createTime: Mock.mock('@datetime'),
      updateTime: Mock.mock('@datetime'),
    });
  }
  return resultList;
};



setupMock({
  setup: () => {
    Mock.mock(new RegExp('/api/patient/page'), 'post', (options) => {
      const config = JSON.parse(options.body);
      const resultList = getPatientPage(config);
      return successResponseWrap({ resultList });
    });
  },
});

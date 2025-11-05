import Mock from 'mockjs'
import setupMock, { successResponseWrap } from '../utils/setup-mock'
import { IPage } from '../types'
import { patientDataType } from '../views/patient/index.vue'
import { DISEASE_LIST } from '../const'
import { IEditPatient } from '../types/common'

const getPatientPage = (config: IPage<never>) => {
  const records: patientDataType[] = []
  const { index, size } = config
  // _newList 通过 index 和 size 生成模拟数据
  for (let i = 0; i < size; i++) {
    records.push({
      id: Mock.mock('@id'),
      name: Mock.mock('@cname'),
      age: Mock.mock('@integer(18, 60)'),
      // gender 是随机的 0 或 1
      gender: Mock.mock('@integer(0, 1)'),
      // disease 从 list 中任意选择两个组成数组
      disease: Mock.mock(`@pick(${DISEASE_LIST.join(',')}, 2)`).split(','),
      createTime: Mock.mock('@datetime'),
      updateTime: Mock.mock('@datetime'),
    })
  }
  return {
    index: index,
    size: size,
    records: records,
    total: index * size,
  }
}

const updatePatient = (data: IEditPatient) => {
  return '更新成功'
}

const addPatient = (data: IEditPatient) => {
  return '新增成功'
}

const deletePatient = (id: string) => {
  return '删除成功'
}

setupMock({
  setup: () => {
    Mock.mock(new RegExp('/api/patient/page'), 'post', (options) => {
      const config = JSON.parse(options.body)
      const resultList = getPatientPage(config)
      return successResponseWrap({ resultList })
    })

    Mock.mock(new RegExp('/api/patient/update'), 'post', (options) => {
      const data = JSON.parse(options.body)
      return successResponseWrap(updatePatient(data))
    })

    Mock.mock(new RegExp('/api/patient/add'), 'post', (options) => {
      const data = JSON.parse(options.body)
      return successResponseWrap(addPatient(data))
    })

    Mock.mock(new RegExp('/api/patient/delete/\\w+'), 'post', (options) => {
      const id = options.url?.split('/').pop()
      return successResponseWrap(deletePatient(id as string))
    })
  },
})

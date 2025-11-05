import setupMock, { successResponseWrap } from '../utils/setup-mock'
import Mock from 'mockjs'

const getRegistrationPage = (config: IPage<never>) => {
  const records: IRegistration[] = []
  const { index, size } = config
  for (let i = 0; i < size; i++) {
    records.push({
      id: Mock.mock('@id'),
      patientId: Mock.mock('@id'),
      deptName: Mock.mock('@cword(2, 4)'),
      doctorName: Mock.mock('@cname'),
      regTime: Mock.mock('@datetime'),
      fee: Mock.mock('@float(10, 100, 2, 2)'),
      status: Mock.mock('@integer(0, 2)'),
      createAt: Mock.mock('@datetime'),
      updateAt: Mock.mock('@datetime'),
    })
  }
  return {
    records,
    index,
    size,
    total: index * size,
  }
}

setupMock({
  setup: () => {
    Mock.mock(new RegExp('/api/registration/page'), 'post', (options) => {
      const config = JSON.parse(options.body)
      const resultList = getRegistrationPage(config)
      return successResponseWrap({ resultList })
    })

    Mock.mock(new RegExp('/api/registration/add'), 'post', (options) => {
      const data = JSON.parse(options.body)
      return successResponseWrap({ status: 200, message: '新增挂号成功' })
    })

    Mock.mock(new RegExp('/api/registration/update'), 'post', (options) => {
      const data = JSON.parse(options.body)
      return successResponseWrap({ status: 200, message: '编辑挂号成功' })
    })

    Mock.mock(new RegExp('/api/registration/delete'), 'post', (options) => {
      const data = JSON.parse(options.body)
      return successResponseWrap({ status: 200, message: '删除挂号成功' })
    })

    Mock.mock(new RegExp('/api/registration/finish'), 'post', (options) => {
      const data = JSON.parse(options.body)
      return successResponseWrap({ status: 200, message: '完成挂号成功' })
    })

    Mock.mock(new RegExp('/api/registration/cancel'), 'post', (options) => {
      const data = JSON.parse(options.body)
      return successResponseWrap({ status: 200, message: '取消挂号成功' })
    })
  },
})

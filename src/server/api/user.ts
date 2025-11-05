import $request from '../request'
import { IEditUser, IUserLogin } from '../../types/common'

export const queryUserDetail = (userId: string) =>
  $request({ url: '/api/user/detail', method: 'POST', data: { userId } })

export const updateUser = (data: IEditUser) =>
  $request({ url: '/api/user/update', method: 'POST', data })

export const userLogin = (data: IUserLogin) =>
  $request({ url: '/api/user/login', method: 'POST', data })

import $request from '../request'
import { IEditUser } from '../../types/common'

export const queryUserDetail = (userId: string) => $request({ url: '/api/user/detail', method: 'POST', data: { userId } });

export const updateUser = (data: IEditUser) => $request({ url: '/api/user/update', method: 'POST', data });

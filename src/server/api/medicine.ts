import $request from '../request'
import { IPage } from '../../types'
import { IEditMedicine } from '../../types/common'

export const queryMedicinePage = (config: IPage<never>) =>
  $request({ url: '/api/medicine/page', method: 'POST', data: config })

export const addMedicine = (data: IEditMedicine) =>
  $request({ url: '/api/medicine/add', method: 'POST', data })

export const updateMedicine = (data: IEditMedicine) =>
  $request({ url: '/api/medicine/update', method: 'POST', data })

export const deleteMedicine = (index: string) =>
  $request({ url: '/api/medicine/delete', method: 'POST', data: { index } })

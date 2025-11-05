import $request from '../request'
import { IPage } from '../../types'
import { IEditAppointment } from '../../types/common'

export const queryAppointmentPage = (config: IPage<never>) =>
  $request({ url: '/api/appointment/page', method: 'POST', data: config })

export const deleteAppointment = (index: string) =>
  $request({ url: '/api/appointment/delete', method: 'POST', data: { index } })

export const addAppointment = (data: IEditAppointment) =>
  $request({ url: '/api/appointment/add', method: 'POST', data })

export const updateAppointment = (data: IEditAppointment) =>
  $request({ url: '/api/appointment/update', method: 'POST', data })

export const finishAppointment = (index: string) =>
  $request({ url: '/api/appointment/finish', method: 'POST', data: { index } })

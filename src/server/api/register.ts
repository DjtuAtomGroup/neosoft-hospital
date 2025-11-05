import $request from '../request'
import { IPage } from '../../types'

export const queryRegistrationPage = (config: IPage<never>) =>
  $request({ url: '/api/registration/page', method: 'POST', data: config })

export const addRegistration = (data: IEditRegistration) =>
  $request({ url: '/api/registration/add', method: 'POST', data })

export const updateRegistration = (data: IEditRegistration) =>
  $request({ url: '/api/registration/update', method: 'POST', data })

export const deleteRegistration = (index: string) =>
  $request({ url: '/api/registration/delete', method: 'POST', data: { index } })

export const finishRegistration = (index: string) =>
  $request({ url: '/api/registration/finish', method: 'POST', data: { index } })

export const cancelRegistration = (index: string) =>
  $request({ url: '/api/registration/cancel', method: 'POST', data: { index } })

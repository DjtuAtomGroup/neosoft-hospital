import $request from '../request'
import { IPage } from '../../types'
import { IEditPatient } from '../../types/common'

export const queryPatientPage = (config: IPage<never>) => $request({ url: '/api/patient/page', method: 'POST', data: config });

export const updatePatient = (data: IEditPatient) => $request({ url: '/api/patient/update', method: 'POST', data });

export const addPatient = (data: IEditPatient) => $request({ url: '/api/patient/add', method: 'POST', data });

export const deletePatient = (id: string) => $request({ url: `/api/patient/delete/${id}`, method: 'POST' });

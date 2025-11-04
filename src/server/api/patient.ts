import $request from '../request'
import { IPage } from '../../types'

export const queryPatientPage = (config: IPage<never>) => $request({ url: '/api/patient/page', method: 'POST', data: config });

import { DEFAULT_LAYOUT } from '../../layout'

const patient = {
  path: '/patient',
  name: 'Patient',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '患者',
    permission: ['doctor'],
  },
  children: [
    {
      path: '/patient/index',
      name: 'PatientIndex',
      component: () => import('../../../views/patient/index.vue'),
      meta: {
        title: '患者管理',
        icon: 'Help',
      },
    },
  ],
}

export default patient

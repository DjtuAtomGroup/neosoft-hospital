import { DEFAULT_LAYOUT } from '../../layout'

const medicine = {
  path: '/medicine',
  name: 'Medicine',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '药品',
  },
  children: [
    {
      path: '/medicine/index',
      name: 'MedicineIndex',
      component: () => import('../../../views/medicine/index.vue'),
      meta: {
        title: '药品管理',
        icon: 'Apple',
      },
    },
  ],
}

export default medicine

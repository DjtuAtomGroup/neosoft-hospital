import { DEFAULT_LAYOUT } from '../../layout'

const appointment = {
  path: '/appointment',
  name: 'Appointment',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '预约管理',
  },
  children: [
    {
      path: '/appointment/index',
      name: 'AppointmentIndex',
      component: () => import('../../../views/appointment/index.vue'),
      meta: {
        // hideInMenu: true, 不需要在菜单中显示
        title: '预约管理',
        icon: 'Calendar',
      },
    },
  ],
}

export default appointment

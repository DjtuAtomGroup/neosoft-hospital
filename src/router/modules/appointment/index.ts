const appointment = {
  path: '/appointment',
  name: 'Appointment',
  component: () => import('../../../layouts/default.vue'),
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
};

export default appointment;

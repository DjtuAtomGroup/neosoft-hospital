const app = {
  path: '/',
  name: 'Index',
  component: () => import('../../../layouts/default.vue'),
  meta: {
    title: '首页',
  },
  children: [
    {
      path: '/index',
      name: 'IndexPage',
      component: () => import('../../../views/index.vue'),
      meta: {
        // hideInMenu: true, 不需要在菜单中显示
        title: '首页',
        icon: 'House',
      },
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../../../views/dashboard/index.vue'),
      meta: {
        title: '仪表盘',
        icon: 'Odometer'
      },
    },
    // {
    //   path: '/patients',
    //   name: 'Patients',
    //   component: () => import('../../../views/patients/index.vue'),
    //   meta: {
    //     title: '患者管理',
    //     icon: 'User'
    //   },
    //   children: [
    //     {
    //       path: '/patients/list',
    //       name: 'PatientsList',
    //       component: () => import('../../../views/patients/list.vue'),
    //       meta: {
    //         title: '患者列表'
    //       },
    //     },
    //     {
    //       path: '/patients/add',
    //       name: 'PatientsAdd',
    //       component: () => import('../../../views/patients/add.vue'),
    //       meta: {
    //         title: '新增患者'
    //       },
    //     }
    //   ]
    // },
    // {
    //   path: '/appointments',
    //   name: 'Appointments',
    //   component: () => import('../../../views/appointments/index.vue'),
    //   meta: {
    //     title: '预约管理',
    //     icon: 'Calendar'
    //   },
    // }
  ],
};

export default app;

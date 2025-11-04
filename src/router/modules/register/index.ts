const register = {
  path: '/register',
  name: 'Register',
  component: () => import('../../../layouts/default.vue'),
  meta: {
    title: '挂号管理',
  },
  children: [
    {
      path: '/register/index',
      name: 'RegisterIndex',
      component: () => import('../../../views/register/index.vue'),
      meta: {
        // hideInMenu: true, 不需要在菜单中显示
        title: '挂号管理',
        icon: 'Calendar',
      },
    },
  ],
};

export default register;

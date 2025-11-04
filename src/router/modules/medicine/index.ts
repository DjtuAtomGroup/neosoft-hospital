const medicine = {
  path: '/medicine',
  name: 'Medicine',
  component: () => import('../../../layouts/default.vue'),
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
        icon: 'Medicine',
      },
    },
  ],
};

export default medicine;

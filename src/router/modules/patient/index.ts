const patient = {
  path: '/patient',
  name: 'Patient',
  component: () => import('../../../layouts/default.vue'),
  meta: {
    title: '患者',
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
};

export default patient;

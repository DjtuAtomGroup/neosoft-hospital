export type IUser = {
  id: string;
  name: string;
  gender: number;
  disease: string[];
  password: string;
  age: number;
  role: string;
  createAt: string
  updateAt: string;
};

export type IEditUser = Omit<IUser, 'createAt' | 'updateAt' | 'disease'>;


export type IPatient = Omit<IUser, 'role' | 'password'>;

export type IUserLogin = {
  username: string;
  password: string;
};



export type IAppointment = {
  id: string;
  patientId: string;
  appointmentTime: string;
  status: number; // 0 待就诊 1 已完成 2 已取消
  createAt: string;
  updateAt: string;
};

export type IEditAppointment = Omit<IAppointment, 'createAt' | 'updateAt'>

export type IEditPatient = Omit<IPatient, 'createAt' | 'updateAt'>


export type IDashboard = {
  patientCount: number;
  appointmentCount?: number; // 预约数 仅在医生页面显示
  medicineCount: number;
  doctorCount: number;
  registrationCount?: number; // 挂号数 仅在医生页面显示
};


export type IMedicine = {
  id: string;
  name: string;
  specification: string;
  unit: string;
  price: number;
  stock: number;
  createAt: string;
  updateAt: string;
  status: number; // 0停售 1正常
};


export type IEditMedicine = Omit<IMedicine, 'createAt' | 'updateAt'>

// 挂号
export type IRegistration = {
  id: string;
  patientId: string;
  deptName: string;
  doctorName: string;
  regTime: string;
  fee: number;
  status: number; // 0 已挂号 1 已完成 2 退号
  createAt: string;
  updateAt: string;
};

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



export type IAppointment = {
  id: string;
  patientId: string;
  appointmentTime: string;
  status: 0 | 1 | 2;
  createAt: string;
  updateAt: string;
};

export type IEditPatient = Omit<IPatient, 'createAt' | 'updateAt'>


export type IDashboard = {
  patientCount: number;
  appointmentCount?: number; // 预约数 仅在医生页面显示
  medicineCount: number;
  doctorCount: number;
  registrationCount?: number; // 挂号数 仅在医生页面显示
};

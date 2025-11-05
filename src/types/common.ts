export type IUser = {
  id: string;
  name: string;
  gender: number;
  disease: string[];
  age: number;
  role: string;
  createAt: string
  updateAt: string;
};


export type IPatient = Omit<IUser, 'role'>;



export type IAppointment = {
  id: string;
  patientId: string;
  appointmentTime: string;
  status: 0 | 1 | 2;
  createAt: string;
  updateAt: string;
};

export type IEditPatient = Omit<IPatient, 'createAt' | 'updateAt'>

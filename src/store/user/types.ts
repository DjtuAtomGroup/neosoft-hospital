import { IUser } from '../../types/common'

export type userStoreType = IUser & {
  token: string;
};

export type userStoreState = {
  user: userStoreType | null;
};

export interface ILogin {
  username: string;
  password: string;
}

export interface IAccount {
  id: number | string | undefined;
  name: string;

  email: string;
  createdDate: Date;
  updatedDate: Date;

  username: string;
  password: string;
  isActive: boolean;
  token: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface IAccount {
  id: number | string | undefined;
  name: string;

  email: string;
  createdDate: string;
  updatedDate: string;

  username: string;
  password: string;
  isActive: boolean;
  token: string;
}

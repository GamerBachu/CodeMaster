export interface ILogin {
  username: string;
  password: string;
}

export interface IAccount {
  id: string;
  name: string;

  email: string;
  createdAt: Date;
  updatedAt: Date;

  username: string;
  password: string;
  isActive: boolean;
  token: string;
}

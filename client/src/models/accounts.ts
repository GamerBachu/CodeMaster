export interface ILogin {
  username: string;
  password: string;
}

export interface IAccount {
  id: string;
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  // Add more fields as needed
}

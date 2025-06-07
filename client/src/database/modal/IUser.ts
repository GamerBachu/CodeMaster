export default interface IUser {
  id: string;
  name: string;

  email: string;
  createdAt: Date;
  updatedAt: Date;

  username: string;
  password: string;
  isActive: boolean;
}

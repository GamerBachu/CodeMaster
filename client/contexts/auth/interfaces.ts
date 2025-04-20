import { IUser } from "@/models/IUser";

export interface IAuthorizedContextProps {
  isAuthorized: boolean;
  setAuthorized: (value: boolean) => void;
  user: IUser|null;
  setUser: (user: IUser ) => void;
}

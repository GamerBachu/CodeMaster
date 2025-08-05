import type { IDBStoreSchema } from "../Interfaces";

export interface UserTokenModel {
    id?: number;
    username: string;
    validTil: string;
    token: string;
    deviceName: string;
}

export const UserToken: IDBStoreSchema = {
    name: "userToken",
    option: { keyPath: "id", autoIncrement: true },
};


export default UserToken;
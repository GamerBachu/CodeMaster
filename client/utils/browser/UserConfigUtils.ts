import { IUserConfig } from "@/models/IUserConfig";
import {
  getLocalStorageValue,
  setLocalStorageValue,
} from "../storage/localStorageConfig";
import { LocalStorageKeys } from "../enums/appEnums";

export function getUserConfig(): IUserConfig | null {
  const configFromLocalStorage = getLocalStorageValue<IUserConfig>(
    LocalStorageKeys.USER_CONFIG
  );
  return configFromLocalStorage;
}

export function setUserConfig(c: IUserConfig): void {
  setLocalStorageValue(LocalStorageKeys.USER_CONFIG, c);
}

export function removeUserConfig(): void {
  localStorage.removeItem(LocalStorageKeys.USER_CONFIG);
}
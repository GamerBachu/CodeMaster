import { IUserConfig } from "@/models/IUserConfig";
import { getLocalStorageValue } from "../storage/localStorageConfig";
import { LocalStorageKeys } from "../enums/appEnums";

export function getTheme(): string|null { 
    const configFromLocalStorage = getLocalStorageValue<IUserConfig>(LocalStorageKeys.USER_CONFIG);
    const themeFromLocalStorage = configFromLocalStorage ? configFromLocalStorage.theme : null;
 return themeFromLocalStorage;
 
} 
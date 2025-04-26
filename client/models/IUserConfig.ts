export interface IUserConfig {
  id: string | number;
  theme: UserTheme;
}

export enum UserTheme {
    light = "light",
    dark = "dark",
}
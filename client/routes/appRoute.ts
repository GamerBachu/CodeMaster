enum AppRoute {
  HOME = "/",
  DASHBOARD = "/dashboard",
  ACCOUNT = "/account",

  ABOUT = "/about",
  CONTACT = "/contact",
  TERMS = "/terms",
  PRIVACY = "/privacy",
  FAQ = "/faq",
  HELP = "/help",
  SUPPORT = "/support",

  // User Account
  LOGIN = "/account/login",
  LOGIN_PROGRESS= "/account/login-progress",
  REGISTER = "/account/register",
  LOGOUT = "/account/logout",
  FORGOT_PASSWORD = "/account/forgot-password",
  RESET_PASSWORD = "/account/reset-password",

  // User Account Management
  PROFILE = "/account/profile",
  SETTINGS = "/account/settings",

  //Common
  NOT_FOUND = "/404",
  UNAUTHORIZED = "/401",
  SERVER_ERROR = "/500",
  ERROR = "/error",
}
export default AppRoute;
export type Route = {
  [key in AppRoute]: string;
};
export type RoutePath = {
  [key in AppRoute]: string;
};
export type RoutePathParams = {
    [key in AppRoute]: {
        [key: string]: string;
    };
};
export type RoutePathParamsType = {
    [key in AppRoute]: {
        [key: string]: string | number;
    };
};
export type RoutePathParamsTypeWithOptional = {
    [key in AppRoute]: {
        [key: string]: string | number | undefined;
    };
}; 
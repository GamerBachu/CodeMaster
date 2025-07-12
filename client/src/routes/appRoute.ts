import locale from "../resources";

export const appAuthRoute = {
  DASHBOARD: { path: "/dashboard", value: locale.link_Dashboard },

  PROFILE: { path: "/account/profile", value: locale.link_Profile },


  PLAN_LIST: { path: "/planner/list", value: locale.link_Planner },
  PLAN_Action: { path: "/planner", value: locale.link_Planner },
};

const appRoute = {
  LOGIN: { path: "/account/login", value: locale.link_Login },
  REGISTER: { path: "/account/register", value: locale.link_Register },
  LOGOUT: { path: "/account/logout", value: locale.link_Logout },

  MigrationDB: { path: "/activity/migration", value: locale.link_MigrationDB },

  ...appAuthRoute

};


export default appRoute;

import locale from "../resources";

const appRoute = {
  DASHBOARD: { path: "/dashboard", value: locale.link_Dashboard },
  LOGIN: { path: "/account/login", value: locale.link_Login },
  REGISTER: { path: "/account/register", value:locale.link_Register },
  PROFILE: { path: "/account/profile", value: locale.link_Profile  },
  LOGOUT: { path: "/account/logout", value: locale.link_Logout },

  MigrationDB: { path: "/activity/migration", value: locale.link_MigrationDB },


  PLAN_LIST: { path: "/planner/list", value: locale.link_Planner  },
  PLAN_Action: { path: "/planner/", value: locale.link_Planner  },
};
export default appRoute;

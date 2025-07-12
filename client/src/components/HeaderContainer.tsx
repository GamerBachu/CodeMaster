import { NavLink } from "react-router";
import appRoute from "../routes/appRoute";
import { useAppSession } from "../contexts"; 
const HeaderContainer = () => {
console.log("==Header=")
  const appSession = useAppSession();

  if (appSession.info.isAuthorized)
    return (
      <nav className="bg-body-tertiary border-bottom">
        <div className="d-flex flex-wrap">
          <ul className="nav me-auto">
            <li className="nav-item">
              <NavLink
                to={appRoute.DASHBOARD.path}
                className={({ isActive }) =>
                  "nav-link link-body-emphasis px-2 text-capitalize" +
                  (isActive ? " active" : "")
                }
              >
                {appRoute.DASHBOARD.value}
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to={appRoute.PLAN_LIST.path}
                className={({ isActive }) =>
                  "nav-link link-body-emphasis px-2 text-capitalize" +
                  (isActive ? " active" : "")
                }
              >
                {appRoute.PLAN_LIST.value}
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to={appRoute.PROFILE.path}
                className={({ isActive }) =>
                  "nav-link link-body-emphasis px-2 text-capitalize" +
                  (isActive ? " active" : "")
                }
              >
                {appRoute.PROFILE.value}
              </NavLink>
            </li>
          </ul>

          <ul className="nav">
            <li className="nav-item">
              <NavLink
                to={appRoute.LOGOUT.path}
                className={({ isActive }) =>
                  "nav-link link-body-emphasis px-2 text-capitalize" +
                  (isActive ? " active" : "")
                }
              >
                {appRoute.LOGOUT.value}
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  else return <></>;
};

export default HeaderContainer;

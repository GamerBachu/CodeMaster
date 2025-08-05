import { Link, NavLink } from "react-router";
import appRoute from "../routes/appRoute";
import { useAppSession } from "../contexts";
import { useState } from "react";
const HeaderContainer = () => {

  const appSession = useAppSession();

  const [authLink, setAuthLink] = useState([
    { id: 1, path: appRoute.DASHBOARD.path, value: appRoute.DASHBOARD.value, active: true },
    { id: 2, path: appRoute.PLAN_LIST.path, value: appRoute.PLAN_LIST.value, active: false },
    { id: 3, path: appRoute.PROFILE.path, value: appRoute.PROFILE.value, active: false },
    { id: 4, path: appRoute.DASHBOARD.path, value: appRoute.DASHBOARD.value, active: false },
  ]);


  const linkClick = (id: number) => {
    const d = authLink;
    setAuthLink(d.map((link) => { link.active = link.id === id; return link; }));
  };
  console.log(appSession);
  if (appSession.info.isAuthorized)
    return (
      <nav className="bg-body-tertiary border-bottom">
        <div className="d-flex flex-wrap">
          <ul className="nav me-auto">
            {
              authLink.map((link) => <li className="nav-item" key={link.id}>
                <Link

                  to={link.path}
                  className={`nav-link link-body-emphasis px-2 text-capitalize ${link.active ? "active" : ""}`}
                  onClick={() => linkClick(link.id)}
                >
                  {link.value}
                </Link>
              </li>)
            }
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

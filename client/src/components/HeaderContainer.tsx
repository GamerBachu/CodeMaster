import { Link, NavLink } from "react-router";
import appRoute from "../routes/appRoute";
import { useAppSession } from "../contexts";
import { useEffect, useState } from "react";
const HeaderContainer = () => {

  const appSession = useAppSession();

  const [authLink, setAuthLink] = useState([
    { id: 10, path: appRoute.DASHBOARD.path, value: appRoute.DASHBOARD.value, active: true },
    { id: 20, path: (appRoute.PLAN_Action.path + "/list"), value: appRoute.PLAN_Action.value, active: false },
    { id: 30, path: (appRoute.POS_Action.path + "/list"), value: appRoute.POS_Action.value, active: false },
    { id: 80, path: appRoute.PROFILE.path, value: appRoute.PROFILE.value, active: false },
    { id: 90, path: appRoute.DASHBOARD.path, value: appRoute.DASHBOARD.value, active: false },
    { id: 290, path: appRoute.SAMPLE_CANVAS.path, value: appRoute.SAMPLE_CANVAS.value, active: false },
  ]);


  const linkClick = (id: number) => {
    const d = authLink;
    setAuthLink(d.map((link) => { link.active = link.id === id; return link; }));
  };


  useEffect(() => {

    const getUrl = window.location.pathname;
    setAuthLink(prev => prev.map((a) => {

      if (a.path.startsWith(getUrl)) a.active = true;
      else a.active = false;
      return a;
    }));


  }, []);






  if (appSession.info.isAuthorized)
    return (
      <nav className="wrapper-header bg-body-tertiary border-bottom">
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

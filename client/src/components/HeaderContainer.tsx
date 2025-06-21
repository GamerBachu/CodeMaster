import { NavLink } from "react-router";

 

const HeaderContainer = () => {
  return (
    <nav className="bg-body-tertiary border-bottom">
      <div className="d-flex flex-wrap">
        <ul className="nav me-auto">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                "nav-link link-body-emphasis px-2" + (isActive ? " active" : "")
              }
              aria-current="page"
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/features" className="nav-link link-body-emphasis px-2">
              Features
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/pricing" className="nav-link link-body-emphasis px-2">
              Pricing
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/faqs" className="nav-link link-body-emphasis px-2">
              FAQs
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-link link-body-emphasis px-2">
              About
            </NavLink>
          </li>
        </ul>
        <ul className="nav">
          <li className="nav-item">
            <NavLink to="/login" className="nav-link link-body-emphasis px-2">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/signup" className="nav-link link-body-emphasis px-2">
              Sign up
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default HeaderContainer;
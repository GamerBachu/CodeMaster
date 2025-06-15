const HeaderContainer = () => {
  return (
    <>
      <nav className="bg-body-tertiary border-bottom">
        <div className="d-flex flex-wrap">
          <ul className="nav me-auto">
            <li className="nav-item">
              <a
                href="#"
                className="nav-link link-body-emphasis px-2 active"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link link-body-emphasis px-2">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link link-body-emphasis px-2">
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link link-body-emphasis px-2">
                FAQs
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link link-body-emphasis px-2">
                About
              </a>
            </li>
          </ul>
          <ul className="nav">
            <li className="nav-item">
              <a href="#" className="nav-link link-body-emphasis px-2">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link link-body-emphasis px-2">
                Sign up
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default HeaderContainer;

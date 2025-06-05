import { Link, useNavigate } from "react-router";
import appRoute from "../../routes/appRoute";
import locale from "../../resources";
import apis from "../../apis";

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const account = apis.accounts.login({ username, password });
    if (account) {
      alert("Login successful!");
      navigate(appRoute.DASHBOARD);
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center border p-2 rounded shadow center-box">
        <h1 className="text-primary py-2">{locale.login}</h1>
        <form className="py-3" onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder={locale.username}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="password"
              placeholder={locale.password}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {locale.login}
          </button>
          <div className="mt-3">
            <Link
              className="btn btn-link text-secondary"
              to={appRoute.REGISTER}
            >
              {locale.doNotHaveCreateNewAccount}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

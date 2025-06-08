import { Link, useNavigate } from "react-router";
import appRoute from "../../routes/appRoute";
import locale from "../../resources";
import apis from "../../apis";
import { useAppSession } from "../../contexts";

const Login = () => {
  const appSession = useAppSession();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const resetForm = () => {
      form.reset();
      form.querySelectorAll("input").forEach((input) => {
        input.classList.remove("is-invalid");
      });
    };

    apis.accounts
      .login({ username, password })
      .then((account) => {
        if (account) {
          alert(locale.loginSuccess);
          const prev = appSession.info;
          appSession.setInfo({
            ...prev,
            account,
            isAuthorized: true,
            appToken: account.token,
          });

          resetForm();
          navigate(appRoute.DASHBOARD);
        } else {
          alert(locale.loginFailed);
          resetForm();
        }
      })
      .catch(() => {
        alert(locale.errorMessage);
        resetForm();
      })
      .finally(() => {
        resetForm();
      });
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

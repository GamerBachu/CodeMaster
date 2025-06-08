import { Link } from "react-router";
import appRoute from "../../routes/appRoute";
import locale from "../../resources";
import apis from "../../apis";

const Register = () => {
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
      .createNew({ username, password })
      .then((account) => {
        if (account) {
          alert(locale.registerSuccess);
          resetForm();
        } else {
          alert(locale.registerFailed);
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
        <h1 className="text-primary py-2">{locale.register}</h1>
        <form className="py-3" onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              name="username"
              placeholder={locale.email}
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
            {locale.createNow}
          </button>
          <div className="mt-3">
            <Link className="btn btn-link text-secondary" to={appRoute.LOGIN}>
              {locale.alreadyHaveAccount}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

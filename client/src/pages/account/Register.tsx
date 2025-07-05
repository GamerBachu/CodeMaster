import { Link } from "react-router";
import appRoute from "../../routes/appRoute";
import locale from "../../resources";
import apis from "../../apis";
import { useAppDispatch } from "../../hooks/hooks";
import { createToast } from "../../components/toasts/toastSlicer";

const Register = () => {
  const dispatch = useAppDispatch();

  const pgTitle = locale.register;

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
          dispatch(
            createToast({
              id: new Date().toISOString(),
              show: true,
              title: pgTitle,
              time: "",
              description: locale.registerSuccess,
              type: "success",
            })
          );

          resetForm();
        } else {
          dispatch(
            createToast({
              id: new Date().toISOString(),
              show: true,
              title: pgTitle,
              time: "",
              description: locale.registerFailed,
              type: "warning",
            })
          );
          resetForm();
        }
      })
      .catch(() => {
        dispatch(
          createToast({
            id: new Date().toISOString(),
            show: true,
            title: pgTitle,
            time: "",
            description: locale.errorMessage,
            type: "warning",
          })
        );
        resetForm();
      })
      .finally(() => {
        resetForm();
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center border p-2 rounded shadow center-box">
        <h1 className="text-primary py-2">{pgTitle}</h1>
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
            <Link className="btn btn-link text-secondary" to={appRoute.LOGIN.path}>
              {locale.alreadyHaveAccount}
            </Link>
          </div>
          <div className="mt-3"  >
            <p className="text-secondary" style={{ width: "300px", margin: "0 auto" }}>

              <Link className="btn btn-link text-secondary" to={appRoute.MigrationDB.path}>
                {locale.demoDisclaimerContent}
              </Link>
            </p>

          </div>

        </form>
      </div>
    </div>
  );
};

export default Register;

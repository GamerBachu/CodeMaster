"use client";
import React from "react";
import Link from "next/link";
import appRoute from "@/routes/appRoute";
import useTranslation, { enUS } from "@/hooks/useTranslation";
import ButtonTheme from "@/components/ButtonTheme";

const LoginPage: React.FC = () => {
  const t = useTranslation();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
  };

  return (
    <div className="vh-100 vw-100">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center border p-4 rounded shadow">
       <div>
       <h1 className="text-primary">{t("login")}</h1>
       <ButtonTheme></ButtonTheme>
       </div>
          <form className="" onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                {t("username")}
              </label>
              <input
                type="email"
                className="form-control"
                name="username"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                {t("password")}
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                required
              />
            </div>

            <button type="submit" className="btn btn-sm btn-primary">
              {t("login")}
            </button>
            <div className="mt-3">
              <Link
                className="btn btn-link text-secondary"
                href={appRoute.REGISTER}
              >
                {t("doNotHaveCreateNewAccount")}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
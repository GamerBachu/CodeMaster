"use client";
import { useAuthorized } from "@/contexts/auth";
import appRoute from "@/routes/appRoute";
import { redirect } from "next/navigation";
import { useEffect } from "react";


export default function Index() {
  const { isAuthorized, user } = useAuthorized();

  useEffect(() => {
    if (isAuthorized) redirect(appRoute.DASHBOARD);
    else redirect(appRoute.LOGIN);
    return () => {
      redirect(appRoute.LOGIN_PROGRESS);
    };
  }, [isAuthorized, user]);

  return <h1>Template</h1>;
}

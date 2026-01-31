import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import appRoute from "../../routes/appRoute";
import locale from "../../resources";
import type { keyValueModel } from "../../models";
import { createToast } from "../../components/toasts/toastSlicer";
import db, { type PlannerModel } from "../../database/";
import { useAppSession } from "../../contexts";
import Form from "./Form";

const Create = () => {
  const appSession = useAppSession();
  const userId = appSession.info.account?.id;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState<PlannerModel>({
    startDate: "",
    endDate: "",
    title: "",
    desc: "",
    status: { key: "", value: "" },
    id: 0,
  });

  const [statusList, setStatusList] = useState<keyValueModel[]>([]);

  const onBackClick = useCallback(() => {
    navigate(`${appRoute.PLAN_Action.path}/list?q=${0}`);
  }, [navigate]);

  useEffect(() => {
    loadData();
    async function loadData() {
      const result = await db.tblActionStatus.search();
      if (result) {
        const data = result.map((item) => ({
          key: String(item.id ?? ""),
          value: item.name,
        }));
        setStatusList(data);
      }
    }
  }, [dispatch, onBackClick]);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const { name, value } = e.target;
      if (name === "status") {
        const status = statusList.find((s) => String(s.key) === String(value));

        setForm((prev) => ({
          ...prev,
          [name]: status ?? { key: "", value: "" },
        }));
      } else {
        setForm((prev) => ({ ...prev, [name]: value }));
      }
    },
    [statusList],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const status = statusList.find(
        (s) => String(s.key) === String(form.status.key),
      );
      db.tblPlanner
        .post({
          id: Number(form.id),
          title: form.title,
          desc: form.desc,
          startDate: form.startDate,
          endDate: form.endDate,
          status: status ? status : { key: "", value: "" },
          updatedBy: Number(userId),
          isActive: true,
        })
        .then((result) => {
          if (result === null) {
            dispatch(
              createToast({
                title: locale.Planner,
                description: locale.errorMessage,
                type: "warning",
              }),
            );
          } else {
            dispatch(
              createToast({
                title: locale.Planner,
                description: locale.AddNewSuccess,
                type: "success",
              }),
            );
            onBackClick();
          }
        })
        .catch(() => {
          dispatch(
            createToast({
              title: locale.Planner,
              description: locale.errorMessage,
              type: "warning",
            }),
          );
        });
    },
    [
      dispatch,
      form.desc,
      form.endDate,
      form.id,
      form.startDate,
      form.status,
      form.title,
      statusList,
      userId,
      onBackClick,
    ],
  );
  return (
    <Form
      form={form}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      onBackClick={onBackClick}
      statusList={statusList}
      btnLabel={locale.AddNew}
      formTitle={locale.Planner + " - " + locale.AddNew}
      formId="pl-c-form"
    ></Form>
  );
};

export default Create;

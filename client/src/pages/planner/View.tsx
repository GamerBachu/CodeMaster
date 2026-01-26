import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import appRoute from "../../routes/appRoute";
import locale from "../../resources";
import type { keyValueModel } from "../../models";
import { createToast } from "../../components/toasts/toastSlicer";
import db, { type PlannerModel } from "../../database/"; 
import Form from "./Form";

const View = () => {


  const { id } = useParams();
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
    navigate(`${appRoute.PLAN_Action.path}/list?q=${id}`);
  }, [id, navigate]);

  useEffect(() => {
    if (!id) {
      onBackClick();
      return;
    }
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

      db.tblPlanner
        .get({ id: Number(id) })
        .then((result) => {
          if (result) {
            setForm({
              startDate: result.startDate,
              endDate: result.endDate,
              title: result.title,
              desc: result.desc,
              status: result.status,
              id: result.id ? result.id : 0,
            });
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
    }
  }, [dispatch, id, onBackClick]);

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
      onBackClick();
    },
    [onBackClick],
  );

  return (
    <Form
      form={form}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      onBackClick={onBackClick}
      statusList={statusList}
      formType={locale.View}
      formTitle={locale.Planner}
      formId="pl-v-form"
    ></Form>
  );
};

export default View;
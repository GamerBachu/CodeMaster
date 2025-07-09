import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import TableForm from "../../components/table/TableForm";
import appRoute from "../../routes/appRoute";
import locale from "../../resources";
import type { UserPlannerModel, keyValueModel } from "../../models";
import { createToast } from "../../components/toasts/toastSlicer";
import db from "../../database/";



const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    planStartDate: "",
    planEndDate: "",
    title: "",
    description: "",
    status: "",
    createdAt: "",
  });
  const [statusList, setStatusList] = useState<keyValueModel[]>([]);

  useEffect(() => {
    db.tblActionStatus
      .search()
      .then((result) => {
        if (result) {
          const data = result.map((item) => ({
            key: String(item.id ?? ""),
            value: item.name,
          }));
          setStatusList(data);
          setForm((prev) => ({ ...prev, status: data[0]?.key }));
        }
      })
      .catch(() => {
        dispatch(
          createToast({
            id: new Date().toISOString(),
            show: true,
            title: locale.Planner,
            time: "",
            description: locale.errorMessage,
            type: "warning",
          })
        );
      });
  }, [dispatch]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const status = statusList.find((s) => String(s.key) === String(form.status));
      const model: UserPlannerModel = {
        id: 0,
        title: form.title,
        desc: form.description,
        startDate: new Date(form.planStartDate),
        endDate: new Date(form.planEndDate),
        status: status
          ? { key: status.key, value: status.value }
          : { key: "0", value: "" },
      };

      db.tblUserPlanner
        .post({
          title: model.title,
          desc: model.desc,
          startDate: model.startDate,
          endDate: model.endDate,
          status: model.status,
          createdDate: new Date(),
          isActive: true,
        })
        .then((result) => {
          if (result === null) {
            dispatch(
              createToast({
                id: new Date().toISOString(),
                show: true,
                title: locale.Planner,
                time: "",
                description: locale.errorMessage,
                type: "warning",
              })
            );
          } else {
            dispatch(
              createToast({
                id: new Date().toISOString(),
                show: true,
                title: locale.Planner,
                time: "",
                description: locale.AddNewSuccess,
                type: "success",
              })
            );
            navigate(`${appRoute.PLAN_Action.path}/list?q=${result}`);
          }
        })
        .catch(() => {
          dispatch(
            createToast({
              id: new Date().toISOString(),
              show: true,
              title: locale.Planner,
              time: "",
              description: locale.errorMessage,
              type: "warning",
            })
          );
        });
    },
    [dispatch, form, navigate, statusList]
  );

  const onAddButtonClick = useCallback(() => {
    navigate(`${appRoute.PLAN_Action.path}/list?q=`);
  }, [navigate]);

  return (
    <TableForm
      id="frm"
      title={`${locale.Planner} - ${locale.AddNew}`}
      addButtonLabel={locale.Back}
      onAddButtonClick={onAddButtonClick}
    >
      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <div className="col-6">
            <label className="form-label">{locale.planStartDate}</label>
            <input
              type="date"
              className="form-control"
              name="planStartDate"
              value={form.planStartDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-6">
            <label className="form-label">{locale.planEndDate}</label>
            <input
              type="date"
              className="form-control"
              name="planEndDate"
              value={form.planEndDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">{locale.title}</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">{locale.description}</label>
          <textarea
            className="form-control"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">{locale.status}</label>
          <select
            className="form-select"
            name="status"
            value={form.status}
            onChange={handleChange}
            required
          >
            {statusList.map((status) => (
              <option key={status.key} value={status.key}>
                {status.value}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {locale.AddNew}
        </button>
      </form>
    </TableForm>
  );
};

export default Create;
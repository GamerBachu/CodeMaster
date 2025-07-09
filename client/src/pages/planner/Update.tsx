import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";

import TableForm from "../../components/table/TableForm";
import appRoute from "../../routes/appRoute";
import locale from "../../resources";
import type { UserPlannerModel, keyValueModel } from "../../models";
import { createToast } from "../../components/toasts/toastSlicer";
import db from "../../database/";



const Update = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    planStartDate: "",
    planEndDate: "",
    title: "",
    description: "",
    status: "",
    createdAt: "",
    id: 0,
  });
  const [statusList, setStatusList] = useState<keyValueModel[]>([]);


  const onAddButtonClick = useCallback(() => {
    navigate(`${appRoute.PLAN_Action.path}/list?q=${id}`);
  }, [id, navigate]);

  useEffect(() => {
    if (!id) {
      onAddButtonClick();
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

      db.tblUserPlanner.get({ id: Number(id) })
        .then((result) => {
          if (result) {
            const status: keyValueModel = result.status;
            setForm({
              planStartDate: result.startDate.toISOString().split("T")[0],
              planEndDate: result.endDate.toISOString().split("T")[0],
              title: result.title,
              description: result.desc,
              status: status.key,
              createdAt: result.createdDate.toISOString(),
              id: result.id ? result.id : 0,
            });
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
    }

  }, [dispatch, id, navigate, onAddButtonClick]);

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
        id: (form.id),
        title: form.title,
        desc: form.description,
        startDate: new Date(form.planStartDate),
        endDate: new Date(form.planEndDate),
        status: status
          ? { key: status.key, value: status.value }
          : { key: "0", value: "" },
      };

      db.tblUserPlanner
        .put({
          id: Number(model.id),
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
                description: locale.UpdateSuccess,
                type: "success",
              })
            );
            navigate(`${appRoute.PLAN_Action.path}/list?q=${model.id}`);
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
    [dispatch, form.description, form.id, form.planEndDate, form.planStartDate, form.status, form.title, navigate, statusList]
  );



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
          {locale.Update}
        </button>
      </form>
    </TableForm>
  );
};

export default Update;
import { useState } from "react";
import { useNavigate } from "react-router";

import TableForm from "../../components/table/TableForm";
import appRoute from "../../routes/appRoute";
import locale from "../../resources";
import type { UserPlannerModel } from "../../models/userPlanner";
import { useDispatch } from "react-redux";
import { createToast } from "../../components/toasts/toastSlicer";

import tblUserPlanner from "../../database/tblUserPlanner";

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

  const labels = {

    selectStatus: "Select status",
    pending: "Pending",
    inProgress: "In Progress",
    completed: "Completed",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const model: UserPlannerModel = {
      id: "",
      title: form.title,
      desc: form.description,
      startDate: new Date(form.planStartDate),
      endDate: new Date(form.planEndDate),
      status: { key: "0", value: form.status },

    };

    tblUserPlanner.post({
      title: model.title,
      desc: model.desc,
      startDate: model.startDate,
      endDate: model.endDate,
      status: model.status,
      createdDate: new Date(),
      isActive: true,
    }).then((result) => {
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
      }
      else {
        dispatch(
          createToast({
            id: new Date().toISOString(),
            show: true,
            title: locale.Planner,
            time: "",
            description: locale.AddNewSuccess,
            type: "success",
          }));
        navigate(`${appRoute.PLAN_Action.path}/list?q=${result}`);
      };
    }).catch(() => {
      dispatch(
        createToast({
          id: new Date().toISOString(),
          show: true,
          title: locale.Planner,
          time: "",
          description: locale.errorMessage,
          type: "warning",
        }));
    });
  };
  const onAddButtonClick = () => {
    navigate(`${appRoute.PLAN_Action.path}/list?q=`);
  };
  return (
    <TableForm
      id={"frm"}
      title={`${locale.Planner} - ${locale.AddNew}`}
      addButtonLabel={locale.Back}
      onAddButtonClick={onAddButtonClick}
    >
      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="mb-3">
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
        <div className="mb-3">
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
            <option value="">{labels.selectStatus}</option>
            <option value="pending">{labels.pending}</option>
            <option value="in-progress">{labels.inProgress}</option>
            <option value="completed">{labels.completed}</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">{locale.AddNew}</button>
      </form>
    </TableForm>
  );
};

export default Create;    
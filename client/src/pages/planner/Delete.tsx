import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";

import TableForm from "../../components/table/TableForm";
import appRoute from "../../routes/appRoute";
import locale from "../../resources";
import type { keyValueModel } from "../../models";
import { createToast } from "../../components/toasts/toastSlicer";
import db from "../../database/";
import { useAppSession } from "../../contexts";



const Delete = () => {
  const appSession = useAppSession();
  const userId = appSession.info.account?.id;
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
    id: 0
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
            id: result.id ?? 0
          });
          setStatusList([status]);
        }
      })
      .catch(() => {
        dispatch(createToast({
          id: new Date().toISOString(),
          show: true,
          title: locale.Planner,
          time: "",
          description: locale.errorMessage,
          type: "warning",
        }));
      });
  }, [dispatch, id, navigate, onAddButtonClick]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      db.tblUserPlanner.remove({
        id: Number(id),
        deletedBy: Number(userId)
      })
        .then(() => {
          dispatch(createToast({
            id: new Date().toISOString(),
            show: true,
            title: locale.Planner,
            time: "",
            description: locale.DeleteSuccess,
            type: "success",
          }));
        })
        .catch(() => {
          dispatch(createToast({
            id: new Date().toISOString(),
            show: true,
            title: locale.Planner,
            time: "",
            description: locale.errorMessage,
            type: "warning",
          }));
        });
      onAddButtonClick();
    }, [dispatch, id, onAddButtonClick, userId]);

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
              readOnly
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
              readOnly
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
            readOnly
            required
          />
        </div>Back
        <div className="mb-3">
          <label className="form-label">{locale.description}</label>
          <textarea
            className="form-control"
            name="description"
            value={form.description}
            readOnly
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
            disabled
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
          {locale.Delete}
        </button>
      </form>
    </TableForm>
  );
};

export default Delete;
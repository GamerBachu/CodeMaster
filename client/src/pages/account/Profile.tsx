import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";

import TableForm from "../../components/table/TableForm";
import appRoute from "../../routes/appRoute";
import locale from "../../resources";
import type { UserPlannerModel, keyValueModel } from "../../models";
import { createToast } from "../../components/toasts/toastSlicer";
import db from "../../database/";
import { useAppSession } from "../../contexts";
import { toViewString } from "../../utils/helper/stringFormat";



const Profile = () => {
  const appSession = useAppSession();
  const userId = appSession.info.account?.id;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    isActive: false,
    id: 0,
    createdAt: ""
  });
  const onAddButtonClick = useCallback(() => {
    navigate(`${appRoute.DASHBOARD.path}`);
  }, [navigate]);

  useEffect(() => {
    if (!userId) {
      onAddButtonClick();
      return;
    }
    db.tblUser.get({ id: Number(userId) })
      .then((result) => {
        if (result) {
          setForm({
            name: result.name,
            email: result.email,
            username: result.username,
            isActive: result.isActive,
            createdAt: toViewString(result.createdDate),
            id: result.id ? result.id : 0,
          });
        }
      })
      .catch(() => {
        dispatch(
          createToast({
            id: new Date().toISOString(),
            show: true,
            title: locale.profileTitle,
            time: "",
            description: locale.errorMessage,
            type: "warning",
          })
        );
      });
  }, [dispatch, navigate, onAddButtonClick, userId]);

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

      db.tblUser
        .put({
          id: Number(form.id),
          name: form.name,
          email: form.email,
        })
        .then((result) => {
          if (result === null) {
            dispatch(
              createToast({
                id: new Date().toISOString(),
                show: true,
                title: locale.profileTitle,
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
                title: locale.profileTitle,
                time: "",
                description: locale.UpdateSuccess,
                type: "success",
              })
            );
          }
        })
        .catch(() => {
          dispatch(
            createToast({
              id: new Date().toISOString(),
              show: true,
              title: locale.profileTitle,
              time: "",
              description: locale.errorMessage,
              type: "warning",
            })
          );
        });
    },
    [dispatch, form.email, form.id, form.name]
  );



  return (
    <TableForm
      id="frm"
      title={`${locale.profileTitle}`}
      addButtonLabel={locale.Back}
      onAddButtonClick={onAddButtonClick}
      hideBackButton={true}
    >
      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <div className="col-6">
            <label className="form-label">{locale.name}</label>
            <input
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-6">
            <label className="form-label">{locale.email}</label>
            <input
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">{locale.createDate}</label>
          <input
            readOnly
            disabled
            className="form-control"
            name="title"
            value={form.createdAt}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {locale.Update}
        </button>
      </form>
    </TableForm>
  );
};

export default Profile;
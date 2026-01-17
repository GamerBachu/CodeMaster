import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import TableForm from "../../components/table/TableForm";
import appRoute from "../../routes/appRoute";
import locale from "../../resources";
import { createToast } from "../../components/toasts/toastSlicer";
import { useAppSession } from "../../contexts";
import { toViewString } from "../../utils/helper/stringFormat";
import apis from "../../apis";



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
    apis.accounts.getUserDetail(Number(userId))
      .then((result) => {
        if (result) {

          const prev = appSession.info;
          const prevAcc = appSession.info.account;
          if (prevAcc === undefined) return;
          prevAcc.name = result.name;
          prevAcc.email = result.email;
          prevAcc.username = result.username;
          prevAcc.id = result.id;


          appSession.setInfo({
            ...prev,
            account: prevAcc
          });

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
            title: locale.profileTitle,
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

      apis.accounts.putUserDetail({
        id: Number(form.id),
        name: form.name,
        email: form.email,
      })
        .then((result) => {
          if (result === null) {
            dispatch(
              createToast({
                title: locale.profileTitle,
                description: locale.errorMessage,
                type: "warning",
              })
            );
          } else {

            const prev = appSession.info;
            const prevAcc = appSession.info.account;
            if (prevAcc === undefined) return;
            prevAcc.name = form.name;
            prevAcc.email = form.email;
            prevAcc.username = form.username; 
            appSession.setInfo({
              ...prev,
              account: prevAcc
            });

            dispatch(
              createToast({
                title: locale.profileTitle,
                description: locale.UpdateSuccess,
                type: "success",
              })
            );
          }
        })
        .catch(() => {
          dispatch(
            createToast({
              title: locale.profileTitle,
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
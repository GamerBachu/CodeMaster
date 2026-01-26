import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux"; 
import appRoute from "../../routes/appRoute";
import locale from "../../resources";
import { createToast } from "../../components/toasts/toastSlicer";
import { useAppSession } from "../../contexts";

import type { keyValueModel } from "../../models";
import tblAppLog, { type AppLogModel } from "../../database/tblAppLog";
import Form from "./Form";

const Create = () => {
  const appSession = useAppSession();
  const userId = appSession.info.account?.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState<AppLogModel>({
    id: 0,
    type: "",
    pageName: "",
    functionName: "",
    lineNumber: "",
    timestamp: "",
    message: "",
    stackTrace: "",
    createdDate: "",
    createdBy: 0,
    updatedDate: "",
    updatedBy: 0,
    deletedDate: "",
    deletedBy: 0,
    isActive: true,
  });

  const [statusList, setStatusList] = useState<keyValueModel[]>([]);

  const onAddButtonClick = useCallback(() => {
    navigate(`${appRoute.Logger_Action.path}/list?q=`);
  }, [navigate]);

  useEffect(() => {
    tblAppLog
      .logTypes()
      .then((result) => {
        if (result) {
          const data = result.map((item) => ({
            key: item,
            value: item,
          }));
          setStatusList(data);
          setForm((prev) => ({ ...prev, type: data[0]?.key }));
        }
      })
      .catch(() => {
        dispatch(
          createToast({
            title: locale.titleLog,
            description: locale.errorMessage,
            type: "warning",
          }),
        );
      });
  }, [dispatch]);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const status = statusList.find(
        (s) => String(s.key) === String(form.type),
      );
      tblAppLog
        .post({
          id: 0,
          type: status ? status.value : statusList[0].value,
          pageName: form.pageName,
          functionName: form.functionName,
          lineNumber: form.lineNumber,
          timestamp: form.timestamp,
          message: form.message,
          stackTrace: form.stackTrace,
          createdDate: form.createdDate,
          createdBy: Number(userId),
        })
        .then((result) => {
          if (result === null) {
            dispatch(
              createToast({
                title: locale.titleLog,
                description: locale.errorMessage,
                type: "warning",
              }),
            );
          } else {
            dispatch(
              createToast({
                title: locale.titleLog,
                description: locale.AddNewSuccess,
                type: "success",
              }),
            );
            navigate(`${appRoute.Logger_Action.path}/list?q=${result}`);
          }
        })
        .catch(() => {
          dispatch(
            createToast({
              title: locale.titleLog,
              description: locale.errorMessage,
              type: "warning",
            }),
          );
        });
    },
    [
      dispatch,
      form.createdDate,
      form.functionName,
      form.lineNumber,
      form.message,
      form.pageName,
      form.stackTrace,
      form.timestamp,
      form.type,
      navigate,
      statusList,
      userId,
    ],
  );
  return (
    <Form
      form={form}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      onAddButtonClick={onAddButtonClick}
      statusList={statusList}
      formType={locale.AddNew}
      formTitle={locale.titleLog}
      formId="logger-a-form"
    ></Form>
  );
};

export default Create;

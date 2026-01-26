import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";

import appRoute from "../../routes/appRoute";
import locale from "../../resources";
import { createToast } from "../../components/toasts/toastSlicer";

import type { keyValueModel } from "../../models";
import tblAppLog, { type AppLogModel } from "../../database/tblAppLog";
import Form from "./Form";

const View = () => {
  const { id } = useParams();

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
    navigate(`${appRoute.Logger_Action.path}/list?q=${id}`);
  }, [id, navigate]);

  useEffect(() => {
    if (!id) {
      onAddButtonClick();
      return;
    }
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

    tblAppLog
      .get({ id: Number(id) })
      .then((result) => {
        if (result) {
          setForm((prev) => ({
            ...prev,
            id: result.id,
            type: result.type,
            pageName: result.pageName,
            functionName: result.functionName,
            lineNumber: result.lineNumber,
            timestamp: result.timestamp,
            message: result.message,
            stackTrace: result.stackTrace,
          }));
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
  }, [dispatch, id, onAddButtonClick]);

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
      onAddButtonClick();
    },
    [onAddButtonClick],
  );

  return (
    <Form
      form={form}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      onAddButtonClick={onAddButtonClick}
      statusList={statusList}
      formType={locale.View}
      formTitle={locale.titleLog}
      formId="logger-v-form"
    ></Form>
  );
};

export default View;

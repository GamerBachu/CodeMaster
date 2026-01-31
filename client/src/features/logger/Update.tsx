import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";

import appRoute from "../../routes/appRoute";
import locale from "../../resources";
import { createToast } from "../../components/toasts/toastSlicer";
import { useAppSession } from "../../contexts";
import { toUTCForDB, toLocalForInput } from "../../utils/helper/dateUtils";

import type { keyValueModel } from "../../models";
import db, { type AppLogModel } from "../../database";
import Form from "./Form";

const Update = () => {
  const { id } = useParams();
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
  const onBackClick = useCallback(() => {
    navigate(`${appRoute.Logger_Action.path}/list?q=${id}`);
  }, [id, navigate]);

  useEffect(() => {
    if (!id) {
      onBackClick();
      return;
    }
    db.tblAppLog
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

    db.tblAppLog
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
            timestamp: toLocalForInput(result.timestamp),
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
  }, [dispatch, id, onBackClick]);

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
      db.tblAppLog
        .put({
          id: form.id,
          type: status ? status.value : statusList[0].value,
          pageName: form.pageName,
          functionName: form.functionName,
          lineNumber: form.lineNumber,
          timestamp: toUTCForDB(form.timestamp),
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
                description: locale.UpdateSuccess,
                type: "success",
              }),
            );
            onBackClick();
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
      form.id,
      form.createdDate,
      form.functionName,
      form.lineNumber,
      form.message,
      form.pageName,
      form.stackTrace,
      form.timestamp,
      form.type,
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
      btnLabel={locale.Update}
      formTitle={locale.titleLog + " - " + locale.Update}
      formId="logger-u-form"
    ></Form>
  );
};

export default Update;

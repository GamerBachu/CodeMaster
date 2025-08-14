import { useEffect } from "react";
import type { ToastProps } from ".";
import { useAppDispatch } from "../../hooks/hooks";
import { removeToast } from "./toastSlicer";
import { utils } from ".";

const Body = ({ data }: ToastProps) => {
  const {
    title = "",
    description = "",
    time = "",
    type = "info",
    show = false,
  } = data;

  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(removeToast(data.id ?? "0"));
  };

  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => {
      dispatch(removeToast(data.id ?? "0"));
    }, utils.timeOut);
    return () => clearTimeout(timer);
  }, [show, dispatch, data.id]);

  return (
    <div
      className={`toast${show ? " show" : ""} text-bg-${type} mb-1`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast-header">
        <strong className="me-auto">{title}</strong>
        <small className="text-body-secondary">{time}</small>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
          onClick={onClick}
        />
      </div>
      <div className="toast-body">{description}</div>
    </div>
  );
};

export default Body;

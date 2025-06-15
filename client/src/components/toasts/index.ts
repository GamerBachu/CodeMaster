import Container from "./Container";
import Toast from "./Toast";

export interface IToast {
  id: string;
  title?: string;
  description?: string;
  time?: string;
  type?: "success" | "error" | "info" | "warning";
  show: boolean;
  
}
export type ToastProps = {
  data: IToast;
};

export default Toast;
export { Container as ToastContainer };



 
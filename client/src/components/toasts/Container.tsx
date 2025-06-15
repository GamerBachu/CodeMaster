import { memo } from "react";
import Toast from "./Toast";

const Container = () => { 
  return <div className="toast-container top-0 end-0 p-3">
    <Toast></Toast>
  </div>;
};
export default memo(Container);
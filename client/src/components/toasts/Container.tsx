import { memo } from "react";
import Toast from "./Toast";

const Container = () => { 
  return <div className="toast-container top-0 end-0 pt-5 pe-1 position-fixed">
    <Toast></Toast>
  </div>;
};
export default memo(Container);
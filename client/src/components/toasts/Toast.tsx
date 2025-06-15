import { memo } from "react";
import { useAppSelector } from "../../hooks/hooks";
import Body from "./Body";

const Toast = () => {
  const dataList = useAppSelector((state) => state.toaster);
  console.log("Toast props", dataList);
  return (
    <>
      {dataList.map((toast) => (
        <Body key={toast.id} data={toast}></Body>
      ))}
    </>
  );
};

export default memo(Toast);

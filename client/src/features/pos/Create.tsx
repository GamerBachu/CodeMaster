import { useCallback } from "react";
import { useNavigate } from "react-router";

import TableForm from "../../components/table/TableForm";
import appRoute from "../../routes/appRoute";
import locale from "../../resources";
import ProductCreate from "./product/Create";

const Create = () => {

  const navigate = useNavigate();

  const onBackButtonClick = useCallback(() => {
    navigate(`${appRoute.POS_Action.path}/list?q=${0}`);
  }, [navigate]);

  const updateProductID = useCallback((productId: string) => {
  
    navigate(`${appRoute.POS_Action.path}/update/${productId}`);
  }, [navigate]);


  return (
    <TableForm
      id="frm"
      title={`${locale.Pos}`}
      addButtonLabel={locale.Back}
      onAddButtonClick={onBackButtonClick}
    >
      <div className="accordion">
        <ProductCreate
          id="pr1"
          setProductId={updateProductID} >
        </ProductCreate>
      </div>
    </TableForm>
  );
};

export default Create;
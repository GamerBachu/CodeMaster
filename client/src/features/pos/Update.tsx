import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";

import TableForm from "../../components/table/TableForm";
import appRoute from "../../routes/appRoute";
import locale from "../../resources";
import db from "../../database/";
import ProductUpdate from "./product/Update";
import ProductDiscount from "./discount/Index";
import ProductStock from "./stock/Index";
import ProductSpecification from "./specification/Index";

import { useDispatch } from "react-redux";
import { createToast } from "../../components/toasts/toastSlicer";
import Status from "./product/Status";

const Update = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [productId, setProductId] = useState<string>("0");


  const onAddButtonClick = useCallback(() => {
    navigate(`${appRoute.POS_Action.path}/list?q=${productId}`);
  }, [productId, navigate]);

  useEffect(() => {


    function wrongProduct() {
      dispatch(
        createToast({
          title: locale.Pos,
          description: locale.invalidProduct,
          type: "danger",
        })
      );
      navigate(`${appRoute.POS_Action.path}/list?q=${id}`);
    }
    if (!id) {
      wrongProduct();
      return;
    }
    if (id === "0") {
      wrongProduct();
      return;
    }
    if (id === "0") {
      wrongProduct();
      return;
    }

    const api = new db.tblProduct();
    api.getByProductId(id).then(res => {
      if (res !== null)
        setProductId(res.productId);
      else {
        wrongProduct();
        return;
      }
    }).catch(() => {
      wrongProduct();
      return;
    });
  }, [dispatch, id, navigate, onAddButtonClick,]);



  return (
    <TableForm
      id="frm"
      title={`${locale.PosTitle} ${productId}`}
      addButtonLabel={locale.Back}
      onAddButtonClick={onAddButtonClick}
    >


      <div className="accordion">
        <Status
          id="pr0"
        
          productId={productId} >
        </Status>

        <ProductUpdate
          id="pr1"
       
          productId={productId} >
        </ProductUpdate>

        <ProductDiscount
          id="pr2"
          productId={productId}>
        </ProductDiscount>

        <ProductStock
          id="pr3"
          productId={productId}>
        </ProductStock>

        <ProductSpecification
          id="pr4"
          productId={productId}>
        </ProductSpecification>

      </div>


    </TableForm >
  );
};

export default Update;
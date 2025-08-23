import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";

import TableForm from "../../components/table/TableForm";
import appRoute from "../../routes/appRoute";
import locale from "../../resources";
import db from "../../database/";
import ProductUpdate from "./product/Update";
import ProductDiscount from "./discount/Index";
import ProductStock from "./stock/Index";

import { useDispatch } from "react-redux";
import { createToast } from "../../components/toasts/toastSlicer";

const Update = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [productId, setProductId] = useState<string>("0");
  const [progress, setProgress] = useState<number>(0);

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
      title={`${locale.Pos} ${progress}`}
      addButtonLabel={locale.Back}
      onAddButtonClick={onAddButtonClick}
    >
      <div className="accordion">
        <ProductUpdate
          id="pr1"
          setProgress={setProgress}
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

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Accordion Item #2
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong>This is the second item’s accordion body.</strong> It is hidden
              by default, until the collapse plugin adds the appropriate classes that
              we use to style each element. These classes control the overall
              appearance, as well as the showing and hiding via CSS transitions. You
              can modify any of this with custom CSS or overriding our default
              variables. It’s also worth noting that just about any HTML can go within
              the <code>.accordion-body</code>, though the transition does limit
              overflow.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              import ProductCreate from "./product/Create";
              import ProductCreate from "./product/Create";
              Accordion Item #3
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong>This is the third item’s accordion body.</strong> It is hidden
              by default, until the collapse plugin adds the appropriate classes that
              we use to style each element. These classes control the overall
              appearance, as well as the showing and hiding via CSS transitions. You
              can modify any of this with custom CSS or overriding our default
              variables. It’s also worth noting that just about any HTML can go within
              the <code>.accordion-body</code>, though the transition does limit
              overflow.
            </div>
          </div>
        </div>
      </div>


    </TableForm >
  );
};

export default Update;
import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

import TableForm from "../../components/table/TableForm";
import appRoute from "../../routes/appRoute";
import locale from "../../resources";
import db from "../../database/";
import ProductCreate from "./product/Create";
import ProductUpdate from "./product/Update";

const Create = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [productId, setProductId] = useState<string>("0");
  const [progress, setProgress] = useState<number>(0);


  const updateProductID = useCallback((newId: string) => {

    setProductId(newId);
    const segments = location.pathname.split("/");
    segments[segments.length - 1] = newId;
    const newPath = segments.join("/");
    navigate(newPath, { replace: true });
  }, [navigate, location.pathname]);


  const onAddButtonClick = useCallback(() => {
    navigate(`${appRoute.POS_Action.path}/list?q=${productId}`);
  }, [productId, navigate]);

  useEffect(() => {
    if (!id) return;
    const api = new db.tblProduct();
    api.getByProductId(id).then(res => {
      if (res !== null)
        setProductId(res.productId);
    });
  }, [id, navigate, onAddButtonClick]);

  return (
    <TableForm
      id="frm"
      title={`${locale.Pos} ${progress}`}
      addButtonLabel={locale.Back}
      onAddButtonClick={onAddButtonClick}
    >
      <div className="accordion">

        {(productId === "0") ? <ProductCreate
          id="pr1"
          setProgress={setProgress}
          setProductId={updateProductID} >
        </ProductCreate>
          : <ProductUpdate
            id="pr1"
            setProgress={setProgress}
            productId={productId} >
          </ProductUpdate>
        }

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


    </TableForm>
  );
};

export default Create;
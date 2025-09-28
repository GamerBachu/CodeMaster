
import { useNavigate } from "react-router";
import { icons_file_edit, } from "../../components/Icons";
import Table from "../../components/table/Table"; 
import appRoute from "../../routes/appRoute";
import locale from "../../resources";
import { useEffect, useState } from "react";
import { toViewString } from "../../utils/helper/stringFormat";
import type { ProductModel } from "./models/productModel";
import { getStatusColor } from "./statusColorUtils";
import db from "../../database/";
import type { keyValueModel } from "../../models";
import statusUnit from "./enums/statusUnit";
import { useDispatch } from "react-redux";
import { createToast } from "../../components/toasts/toastSlicer";

const List = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [apiData, setApiData] = useState<ProductModel[]>([]);
  const [statusList, setStatusList] = useState<keyValueModel[]>([]);

  useEffect(() => {
    db.tblActionStatus
      .search()
      .then((result) => {
        if (result) {

          const allowedKeys = statusUnit.map(c => String(c));
          const data = result.map((item) => ({
            key: String(item.id ?? ""),
            value: item.name,
          })).filter(p => allowedKeys.includes(p.key));
          setStatusList(data);
        }
      })
      .catch(() => {
        dispatch(
          createToast({
            title: locale.Planner,
            description: locale.errorMessage,
            type: "warning",
          })
        );
      });
  }, [dispatch]);
  useEffect(() => {
    const api = new db.tblProduct();
    api.search()
      .then((response) => {
        if (response === undefined || response === null) {
          setApiData([]);
          return;
        }
        const d = response as unknown as ProductModel[];
        setApiData(d);
      })
      .catch(() => {
        setApiData([]);
      });

    return () => {
      setApiData([]);
    };
  }, []);

  const handleRowAction = (id: number | string, type: number) => {
    if (type === 0) {
      navigate(`${appRoute.POS_Action.path}/create/0`);
    }
    if (type === 2) {
      navigate(`${appRoute.POS_Action.path}/update/${id}`);
    }
    else {
      navigate(`${appRoute.POS_Action.path}/create/${id}`);
    }

  };

  return (
    <Table
      id={"pl"}
      title={locale.Pos}
      addButtonLabel={locale.AddNew}
      onAddButtonClick={() => handleRowAction(0, 0)}
    >

      <thead>
        <tr className="align-middle">
          <th>#</th>
          <th>{locale.productName}</th>
          <th>{locale.price}</th>
          <th>{locale.liveDate}</th>
          <th>{locale.status}</th>
          <th>{locale.action}</th>
        </tr>
      </thead>
      <tbody>
        {
          apiData.map((row, idx) => (
            <tr key={row.productId ?? idx} 
            className={`align-middle ${getStatusColor(row.status)}`}>
              <td>{idx + 1}</td>
              <td className="d-flex flex-column">
                {row.productName}
                <small>{row.productId}</small>
              </td>
              <td>{row.price}</td>
              <td>{toViewString(row.liveDate, true)}</td>
              <td>
                {
                  statusList.find(s => s.key === String(row.status))?.value ?? ""
                }
              </td>
              <td>
                <div
                  className="btn-group btn-group-sm gap-1"
                  role="group"
                  aria-label="action"
                >
                  <button type="button" className="btn btn-sm btn-outline-info" onClick={() => handleRowAction(row.productId, 2)}>
                    <img src={icons_file_edit} />
                  </button>
                </div>
              </td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  );
};

export default List;

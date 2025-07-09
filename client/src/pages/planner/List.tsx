
import { useNavigate } from "react-router";
import {
  icons_file_view,
  icons_file_edit,
  icons_file_delete,
} from "../../components/Icons";
import Table from "../../components/table/Table";
import appRoute from "../../routes/appRoute";
import locale from "../../resources";
import { useEffect, useState } from "react";
import { toViewString } from "../../utils/helper/stringFormat";
import type { UserPlannerModel } from "../../models/userPlanner";
import tblUserPlanner from "../../database/tblUserPlanner";
const List = () => {
  const navigate = useNavigate();


  const [apiData, setApiData] = useState<UserPlannerModel[]>([]);

  useEffect(() => {
    tblUserPlanner.search()
      .then((response) => {
        if (response === undefined || response === null) {
          setApiData([]);
          return;
        }
        const d = response as unknown as UserPlannerModel[];
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
      navigate(`${appRoute.PLAN_Action.path}/create/${id}`);
    }
    else if (type === 1) {
      navigate(`${appRoute.PLAN_Action.path}/view/${id}`);
    }
    else if (type === 2) {
      navigate(`${appRoute.PLAN_Action.path}/update/${id}`);
    }
    else if (type === 3) {
      navigate(`${appRoute.PLAN_Action.path}/delete/${id}`);
    }
    else {
      return;
    }

  };


  return (
    <Table
      id={"pl"}
      title={locale.Planner}
      addButtonLabel={locale.AddNew}
      onAddButtonClick={() => handleRowAction(0, 0)}
    >
      <thead>
        <tr>
          <th>#</th>
          <th>{locale.title}</th>
          <th>{locale.planEndDate}</th>
          <th>{locale.status}</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          apiData.map((row, idx) => (
            <tr key={row.id ?? idx}>
              <td>{idx + 1}</td>
              <td>{row.title}</td>
              <td>{toViewString(row.endDate)}</td>
              <td>{row.status.value}</td>
              <td>
                <div
                  className="btn-group btn-group-sm gap-1"
                  role="group"
                  aria-label="action"
                >
                  <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => handleRowAction(row.id, 1)}>
                    <img src={icons_file_view} />
                  </button>
                  <button type="button" className="btn btn-sm btn-outline-info" onClick={() => handleRowAction(row.id, 2)}>
                    <img src={icons_file_edit} />
                  </button>
                  <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleRowAction(row.id, 3)}>
                    <img src={icons_file_delete} />
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

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

import db, { type AppLogModel } from "../../database";
const List = () => {
  const navigate = useNavigate();

  const [apiData, setApiData] = useState<AppLogModel[]>([]);

  useEffect(() => {
    db.tblAppLog
      .search()
      .then((response) => {
        if (response === undefined || response === null) {
          setApiData([]);
          return;
        }
        const d = response as AppLogModel[];
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
      navigate(`${appRoute.Logger_Action.path}/create/${id}`);
    } else if (type === 1) {
      navigate(`${appRoute.Logger_Action.path}/view/${id}`);
    } else if (type === 2) {
      navigate(`${appRoute.Logger_Action.path}/update/${id}`);
    } else if (type === 3) {
      navigate(`${appRoute.Logger_Action.path}/delete/${id}`);
    } else {
      return;
    }
  };

  return (
    <Table
      id={"lgr-list-table"}
      title={locale.titleLog}
      addButtonLabel={locale.AddNew}
      onAddButtonClick={() => handleRowAction(0, 0)}
    >
      <thead>
        <tr>
          <th>{locale.logId}</th>
          <th>{locale.logType}</th>
          <th>
            {locale.pageName}
          </th>
          <th>{locale.timestamp}</th>
          <th>{locale.message}</th>
          <th>{locale.action}</th>
        </tr>
      </thead>
      <tbody>
        {apiData.map((row: AppLogModel) => (
          <tr key={row.id} className="align-middle">
            <td>{row.id}</td>
            <td>{row.type}</td>
            <td className="d-flex flex-column">
              <small>{locale.pageNameShort}{row.pageName}</small>
              <small>{locale.functionNameShort}{row.functionName}</small>
              <small>{locale.lineNumberShort}{row.lineNumber}</small>
            </td>
            <td>{toViewString(row.timestamp, true)}</td>
            <td>{row.message}</td>
            <td>
              <div
                className="btn-group btn-group-sm gap-1"
                role="group"
                aria-label="action"
              >
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleRowAction(row.id, 1)}
                >
                  <img src={icons_file_view} />
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-info"
                  onClick={() => handleRowAction(row.id, 2)}
                >
                  <img src={icons_file_edit} />
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleRowAction(row.id, 3)}
                >
                  <img src={icons_file_delete} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default List;

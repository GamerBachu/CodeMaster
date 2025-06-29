
import {  useNavigate } from "react-router";
import {
  icons_file_view,
  icons_file_edit,
  icons_file_delete,
} from "../../components/Icons";
import Table from "../../components/table/Table";
import appRoute from "../../routes/appRoute";
import locale from "../../resources";
const List = () => {
  const navigate = useNavigate();

  const onAddButtonClick = () => {
    navigate(`${appRoute.PLAN_Action.path}create/0`);
  };

  return (
    <Table
      id={"pl"}
      title={locale.Planner}
      addButtonLabel={locale.AddNew}
      onAddButtonClick={onAddButtonClick}
    >
      <thead>
        <tr>
          <th>#</th>
          <th>First</th>
          <th>Last</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2</td>
          <td>Jane</td>
          <td>Smith</td>
          <td>jane@example.com</td>
          <td>
            <div
              className="btn-group btn-group-sm gap-1"
              role="group"
              aria-label="action"
            >
              <button type="button" className="btn btn-outline-primary">
                <img src={icons_file_view} />
              </button>
              <button type="button" className="btn btn-outline-info">
                <img src={icons_file_edit} />
              </button>
              <button type="button" className="btn btn-outline-danger">
                <img src={icons_file_delete} />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default List;

import React from "react";
import { icons_file_add } from "../../components/Icons";

type TableProps = {
  id: string;
  title: string;
  addButtonLabel?: string;
  children?: React.ReactNode;
  onAddButtonClick?: () => void;
};

const Table = ({
  id,
  title,
  addButtonLabel,
  onAddButtonClick,
  children,
}: TableProps) => {
  const titleId = `ttl-${id}`;
  const buttonId = `btn-${id}`;
  const tableId = `tbl-${id}`;

  return (
    <div className="card m-1">
      <div className="card-header d-flex">
        <div className="h2 me-auto" id={titleId} data-testid={titleId}>
          {title}
        </div>
        <div className="">
          <button
            type="button"
            className="btn btn-sm btn-outline-success align-content-center"
            id={buttonId}
            data-testid={buttonId}
            onClick={onAddButtonClick}
          >
            <img src={icons_file_add} /> {addButtonLabel}
          </button>
        </div>
      </div>
      <div className="card-body">
        <table className="table table-hover" id={tableId} data-testid={tableId}>
          {children}
        </table>
      </div>
    </div>
  );
};

export default Table;

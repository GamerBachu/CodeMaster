import React from "react";
import { icons_arrow_left_square } from "../../components/Icons";

type TableFormProps = {
  id: string;
  title: string;
  addButtonLabel?: string;
  children?: React.ReactNode;
  onButtonClick?: () => void;
  hideBackButton?: boolean;
};

const TableForm = ({
  id,
  title,
  addButtonLabel,
  onButtonClick,
  children,
  hideBackButton
}: TableFormProps) => {
  const titleId = `ttf-${id}`;
  const buttonId = `btn-b-${id}`;

  return (
    <div className="card m-1">
      <div className="card-header d-flex">
        <div className="h2 me-auto" id={titleId} data-testid={titleId}>
          {title}
        </div>
        <div className={`${hideBackButton ? "d-none" : ""}`}>
          <button
            type="button"
            className="btn btn-sm d-inline-flex align-items-center gap-1 btn-outline-success"
            id={buttonId}
            data-testid={buttonId}
            onClick={onButtonClick}
          >
            <img src={icons_arrow_left_square} className="btn-sm-img" />{" "}
            <span>{addButtonLabel}</span>
          </button>
        </div>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
};

export default TableForm;

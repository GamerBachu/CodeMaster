import React from "react";
import {
  icons_file_edit,
  icons_file_delete,
  icons_file_add,
  icons_keyboard_arrow_down,
} from "../../components/Icons";
const TopSection: React.FC = () => {

  return (
    <div className="tabs-1">

      {[1, 2].map(() => <div
        className="tab btn-group"
        role="group"
        aria-label="action"
      >
        <button type="button" className="btn tab-1">
          Left
        </button>
        <button type="button" className="btn btn-sm px-0" onClick={() => handleRowAction(row.id, 2)}>
          <img src={icons_file_edit} />
        </button>
        <button type="button" className="btn btn-sm px-1" >
          <img src={icons_file_delete} />
        </button>
      </div>
      )}
      <div
        className="tab btn-group active"
        role="group"
        aria-label="action"
      >
        <button type="button" className="btn tab-1">
          Left
        </button>
        <button type="button" className="btn btn-sm px-0" onClick={() => handleRowAction(row.id, 2)}>
          <img src={icons_file_edit} />
        </button>
        <button type="button" className="btn btn-sm px-1" >
          <img src={icons_file_delete} />
        </button>
      </div>
      <div
        className="tab action btn-group"
        role="group"
        aria-label="action"
      >
        <button type="button" className="btn btn-sm" >
          <img src={icons_file_add} />
        </button>
      </div>

      <div
        className="tab action btn-group"
        role="group"
        aria-label="action"
      >
        <button type="button" className="btn btn-sm" >
          <img src={icons_keyboard_arrow_down} />
        </button>
      </div>
    </div>
  );
};

export default TopSection;

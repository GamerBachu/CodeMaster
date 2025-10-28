import React from 'react';
import { icons_file_add } from '../../../components/Icons';

interface AddAreaButtonProps {
  onAdd: () => void;
}

export const AddAreaButton: React.FC<AddAreaButtonProps> = ({ onAdd }) => {
  return (
    <div className="tab action btn-group" role="group" aria-label="action">
      <button type="button" className="btn btn-sm" onClick={onAdd}>
        <img src={icons_file_add} alt="Add area" />
      </button>
    </div>
  );
};

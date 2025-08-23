import { type ChangeEvent } from 'react';
import { UpdateButton, DeleteButton } from "../../../components/button";
import locale from "../../../resources";
import type { discountModel } from '../../../models/posModels';

type DiscountFormProps = {
    form: discountModel;
    onChange: (rowId: number, field: keyof discountModel, value: string) => void;
    onUpdate: (form: discountModel) => void;
    onDelete: (form: discountModel) => void;
};

const Update = ({ form, onChange, onUpdate, onDelete }: DiscountFormProps) => {
    return (
        <form className="border p-2" onSubmit={(e) => { e.preventDefault(); }} key={form.rowId} data-testid={`frm-dis-${form.rowId}`}>
            <div className="mb-3 row">
                <div className="col-4">
                    <label className="form-label small">{locale.discountName}</label>
                    <input
                        className="form-control form-control-sm"
                        name="name"
                        value={form.name}
                        required
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(form.rowId, 'name', e.target.value)}
                    />
                </div>
                <div className="col-4">
                    <label className="form-label small">{locale.discountPercentage}</label>
                    <input
                        className="form-control form-control-sm"
                        name="percentage"
                        value={form.percentage}
                        required
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(form.rowId, 'percentage', e.target.value)}
                    />
                </div>

                <div className="col-4 align-content-end">
                    <div className="btn-group " role="group" aria-label="">
                        <div className="btn-group  me-2" role="group" aria-label="">
                            <UpdateButton
                                buttonId={`dis-upd-btn${form.id}`}
                                onClick={() => onUpdate(form)}
                                label={locale.save}
                            ></UpdateButton>
                        </div>
                        <div className="btn-group " role="group" aria-label="">
                            <DeleteButton
                                buttonId={`dis-del-btn${form.id}`}
                                onClick={() => onDelete(form)}
                                label={locale.Delete}
                            ></DeleteButton>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Update;
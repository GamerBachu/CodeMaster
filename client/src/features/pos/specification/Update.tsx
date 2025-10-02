import { type ChangeEvent } from 'react';
import { UpdateButton, DeleteButton } from "../../../components/button";
import locale from "../../../resources";
import type { specificationModel } from '../../../models/posModels';

type specificationFormProps = {
    form: specificationModel;
    onChange: (rowId: number, field: keyof specificationModel, value: string) => void;
    onUpdate: (form: specificationModel) => void;
    onDelete: (form: specificationModel) => void;
};

const Update = ({ form, onChange, onUpdate, onDelete }: specificationFormProps) => {
    return (
        <form className="border p-2 " onSubmit={(e) => { e.preventDefault(); }} key={form.rowId} data-testid={`frm-dis-${form.rowId}`}>
            <div className="mb-3 row g-2">
                <div className="col-lg-3 col-md-4 col-sm-6">
                    <label className="form-label small">{locale.specificationType}</label>
                    <input
                        className="form-control form-control-sm"
                        name="type"
                        value={form.type}
                        required
                        readOnly
                        disabled
                    />
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6">
                    <label className="form-label small">{locale.specificationValue}</label>
                    <input
                        className="form-control form-control-sm"
                        name="value"
                        value={form.value}
                        required
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(form.rowId, 'value', e.target.value)}
                    />
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6">
                    <label className="form-label small">{locale.specificationUnit}</label>
                    <input
                        className="form-control form-control-sm"
                        name="unit"
                        value={form.unit}
                        required
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(form.rowId, 'unit', e.target.value)}
                    />
                </div>

                <div className="col-lg-3 col-md-4 col-sm-6 align-content-end ">
                    <div className="btn-group pt-2 " role="group" aria-label="">
                        <div className="btn-group  me-2" role="group" aria-label="">
                            <UpdateButton
                                buttonId={`dis-upd-btn${form.id}`}
                                onClick={() => onUpdate(form)}
                                label={locale.save}
                                type="button"
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
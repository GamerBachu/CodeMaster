import TableForm from "../../components/table/TableForm";
import locale from "../../resources";
import type { keyValueModel } from "../../models";
import { type PlannerModel } from "../../database";

type FormProps = {
    formId: string;
    formTitle: string;
    form: PlannerModel;
    btnLabel: string;
    statusList: keyValueModel[];
    handleChange: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => void;
    handleSubmit: (e: React.FormEvent) => void;
    onBackClick: () => void;
};

const Form = ({
    formId,
    formTitle,
    form,
    btnLabel,
    statusList,
    handleChange,
    handleSubmit,
    onBackClick,
}: FormProps) => {
    return (
        <TableForm
            id={formId}
            title={formTitle}
            addButtonLabel={locale.Back}
            onButtonClick={onBackClick}
        >
            <form className="mb-4" onSubmit={handleSubmit}>
                <div className="row g-3 mb-3">
                    <div className="col-12 col-md-6">
                        <label className="form-label small">{locale.planStartDate}</label>
                        <input
                            type="date"
                            className="form-control form-control-sm"
                            name="startDate"
                            value={form.startDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <label className="form-label small">{locale.planEndDate}</label>
                        <input
                            type="date"
                            className="form-control form-control-sm"
                            name="endDate"
                            value={form.endDate}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="col-12 col-md-6">
                        <label className="form-label small">{locale.title}</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <label className="form-label small">{locale.status}</label>
                        <select
                            className="form-select form-select-sm"
                            name="status"
                            value={form.status.key}
                            onChange={handleChange}
                            required
                        >
                            {statusList.map((status) => (
                                <option key={status.key} value={status.key}>
                                    {status.value}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12">
                        <label className="form-label small">{locale.description}</label>
                        <textarea
                            className="form-control form-control-sm"
                            name="desc"
                            value={form.desc}
                            onChange={handleChange}
                            rows={3}
                            required
                        />
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary btn-sm custom-btn">
                            {btnLabel}
                        </button>
                    </div>
                </div>
            </form>
        </TableForm>
    );
};

export default Form;

import TableForm from "../../components/table/TableForm";
import locale from "../../resources";
import type { keyValueModel } from "../../models";
import { type PlannerModel } from "../../database";

type FormProps = {
    formId: string;
    formType: string;
    formTitle: string;
    form: PlannerModel;
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
    formType,
    form,
    statusList,
    handleChange,
    handleSubmit,
    onBackClick,
}: FormProps) => {
    return (
        <TableForm
            id={formId}
            title={`${formTitle} - ${formType}`}
            addButtonLabel={locale.Back}
            onButtonClick={onBackClick}
        >
            <form className="mb-4" onSubmit={handleSubmit}>
                <div className="mb-3 row">
                    <div className="col-6">
                        <label className="form-label">{locale.planStartDate}</label>
                        <input
                            type="date"
                            className="form-control"
                            name="startDate"
                            value={form.startDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-6">
                        <label className="form-label">{locale.planEndDate}</label>
                        <input
                            type="date"
                            className="form-control"
                            name="endDate"
                            value={form.endDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">{locale.title}</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">{locale.description}</label>
                    <textarea
                        className="form-control"
                        name="desc"
                        value={form.desc}
                        onChange={handleChange}
                        rows={3}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">{locale.status}</label>
                    <select
                        className="form-select"
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
                <button type="submit" className="btn btn-primary">
                    {formType}
                </button>
            </form>
        </TableForm>
    );
};

export default Form;

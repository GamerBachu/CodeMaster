import TableForm from "../../components/table/TableForm";
import locale from "../../resources";
import type { keyValueModel } from "../../models";
import { type AppLogModel } from "../../database";

type FormProps = {
    formId: string;
    formType: string;
    formTitle: string;
    form: AppLogModel;
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
                <form className="mb-4 custom-form-override" onSubmit={handleSubmit}>
                <div className="row g-3 mb-3">
                    <div className="col-12 col-md-6">
                            <label className="form-label custom-label">{locale.logId}</label>
                            <input
                                type="text"
                                className="form-control form-control-sm custom-input"
                            name="id"
                            value={form.id || "#"}
                            readOnly
                            disabled
                        />
                    </div>
                    <div className="col-12 col-md-6">
                            <label className="form-label custom-label">{locale.logType}</label>
                            <select
                                className="form-select form-select-sm custom-input"
                            name="type"
                            value={form.type || ""}
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

                    <div className="col-12 col-md-6">
                            <label className="form-label custom-label">{locale.pageName}</label>
                            <input
                                type="text"
                                className="form-control form-control-sm custom-input"
                            name="pageName"
                            value={form.pageName || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-12 col-md-6">
                            <label className="form-label custom-label">{locale.functionName}</label>
                            <input
                                type="text"
                                className="form-control form-control-sm custom-input"
                            name="functionName"
                            value={form.functionName || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-12 col-md-6">
                            <label className="form-label custom-label">{locale.lineNumber}</label>
                            <input
                                type="text"
                                className="form-control form-control-sm custom-input"
                            name="lineNumber"
                            value={form.lineNumber || ""}
                            onChange={handleChange}
                            required
                        ></input>
                    </div>
                    <div className="col-12 col-md-6">
                            <label className="form-label custom-label">{locale.timestamp}</label>
                            <input
                                type="datetime-local"
                                className="form-control form-control-sm custom-input"
                            name="timestamp"
                            value={form.timestamp || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-12">
                            <label className="form-label custom-label">{locale.message}</label>
                            <textarea
                                className="form-control form-control-sm custom-input"
                            name="message"
                            value={form.message || ""}
                            onChange={handleChange}
                            rows={2}
                            required
                        />
                    </div>
                    <div className="col-12">
                            <label className="form-label custom-label">{locale.stackTrace}</label>
                            <textarea
                                className="form-control form-control-sm custom-input"
                            name="stackTrace"
                            value={form.stackTrace || ""}
                            onChange={handleChange}
                            rows={2}
                        />
                    </div>
                </div>
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary btn-sm custom-btn">
                        {formType}
                    </button>
                </div>
            </form>
        </TableForm>
    );
};

export default Form;

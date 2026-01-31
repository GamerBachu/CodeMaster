import TableForm from "../../components/table/TableForm";
import locale from "../../resources";
import type { keyValueModel } from "../../models";
import { type AppLogModel } from "../../database";

type FormProps = {
    formId: string; 
    formTitle: string;
    form: AppLogModel;
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
            title={`${formTitle}`}
            addButtonLabel={locale.Back}
            onButtonClick={onBackClick}
        >
            <form className="mb-4" onSubmit={handleSubmit}>
                <div className="row g-3 mb-3">
                    <div className="col-12 col-md-6">
                        <label className="form-label small">{locale.logId}</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            name="id"
                            value={form.id || "#"}
                            readOnly
                            disabled
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <label className="form-label small">{locale.logType}</label>
                        <select
                            className="form-select form-select-sm"
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
                        <label className="form-label small">{locale.pageName}</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            name="pageName"
                            value={form.pageName || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <label className="form-label small">{locale.functionName}</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            name="functionName"
                            value={form.functionName || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <label className="form-label small">{locale.lineNumber}</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            name="lineNumber"
                            value={form.lineNumber || ""}
                            onChange={handleChange}
                            required
                        ></input>
                    </div>
                    <div className="col-12 col-md-6">
                        <label className="form-label small">{locale.timestamp}</label>
                        <input
                            type="datetime-local"
                            className="form-control form-control-sm"
                            name="timestamp"
                            value={form.timestamp || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-12">
                        <label className="form-label small">{locale.message}</label>
                        <textarea
                            className="form-control form-control-sm"
                            name="message"
                            value={form.message || ""}
                            onChange={handleChange}
                            rows={2}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <label className="form-label small">{locale.stackTrace}</label>
                        <textarea
                            className="form-control form-control-sm"
                            name="stackTrace"
                            value={form.stackTrace || ""}
                            onChange={handleChange}
                            rows={2}
                        />
                    </div>
                </div>
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary btn-sm custom-btn">
                        {btnLabel}
                    </button>
                </div>
            </form>
        </TableForm>
    );
};

export default Form;

import TableForm from '../../components/table/TableForm';
import locale from "../../resources";
import type { keyValueModel } from "../../models";
import { type AppLogModel } from "../../database/tblAppLog";

type FormProps = {
    formId: string,
    formType: string,
    formTitle: string,
    form: AppLogModel,
    statusList: keyValueModel[],
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
    handleSubmit: (e: React.FormEvent) => void,
    onAddButtonClick: () => void,
};

const Form = ({
    formId,
    formTitle,
    formType,
    form,
    statusList,
    handleChange,
    handleSubmit,
    onAddButtonClick,

}: FormProps) => {


    return (
        <TableForm
            id={formId}
            title={`${formTitle} - ${formType}`}
            addButtonLabel={locale.Back}
            onAddButtonClick={onAddButtonClick}
        >
            <form className="mb-4" onSubmit={handleSubmit}>
                <div className="mb-3 row">
                    <div className="col-6">
                        <label className="form-label">{locale.logId}</label>
                        <input
                            type="text"
                            className="form-control"
                            name="id"
                            value={form.id || "#"}
                            readOnly
                            disabled
                        />
                    </div>
                    <div className="col-6">
                        <label className="form-label">{locale.logType}</label>
                        <select
                            className="form-select"
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
                </div>

                <div className="mb-3 row">
                    <div className="col-6">
                        <label className="form-label">{locale.pageName}</label>
                        <input
                            type="text"
                            className="form-control"
                            name="pageName"
                            value={form.pageName || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-6">
                        <label className="form-label">{locale.functionName}</label>
                        <input
                            type="text"
                            className="form-control"
                            name="functionName"
                            value={form.functionName || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-6">
                        <label className="form-label">{locale.lineNumber}</label>
                        <input
                            type="text"
                            className="form-control"
                            name="lineNumber"
                            value={form.lineNumber || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-6">
                        <label className="form-label">{locale.timestamp}</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            name="timestamp"
                            value={form.timestamp || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">{locale.message}</label>
                    <textarea
                        className="form-control"
                        name="message"
                        value={form.message || ""}
                        onChange={handleChange}
                        rows={2}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">{locale.stackTrace}</label>
                    <textarea
                        className="form-control"
                        name="stackTrace"
                        value={form.stackTrace || ""}
                        onChange={handleChange}
                        rows={2}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    {formType}
                </button>
            </form>
        </TableForm>
    );
};

export default Form; 
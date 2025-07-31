import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import locale from "../../../resources";
import type { keyValueModel } from "../../../models";
import { createToast } from "../../../components/toasts/toastSlicer";
import db from "../../../database/";
import { useAppSession } from "../../../contexts";
import statusUnit from "../enums/statusUnit";
import { saveToDb } from "../../../utils/helper/dateUtils";

import type { IProduct } from "./service";
import { initialForm, isValid, onlyNumber } from "./service";

type Props = {
    id: string;
    setProgress: (progress: number) => void;
    setProductId: (productId: string) => void;
};

const Create = ({ id, setProductId }: Props) => {
    const appSession = useAppSession();
    const userId = appSession.info.account?.id;
    const dispatch = useDispatch();

    const [form, setForm] = useState<IProduct>(initialForm);

    const [statusList, setStatusList] = useState<keyValueModel[]>([]);

    useEffect(() => {
        db.tblActionStatus
            .search()
            .then((result) => {
                if (result) {

                    const allowedKeys = statusUnit.map(c => String(c));
                    const data = result.map((item) => ({
                        key: String(item.id ?? ""),
                        value: item.name,
                    })).filter(p => allowedKeys.includes(p.key));
                    setStatusList(data);
                    setForm((prev) => ({ ...prev, status: data[0]?.key }));
                }
            })
            .catch(() => {
                dispatch(
                    createToast({
                        id: new Date().toISOString(),
                        show: true,
                        title: locale.Planner,
                        time: "",
                        description: locale.errorMessage,
                        type: "warning",
                    })
                );
            });
    }, [dispatch]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (onlyNumber(name, value) === false) return;
        setForm((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();

            if (isValid(form) === false) {
                dispatch(
                    createToast({
                        id: new Date().toUTCString(),
                        show: true,
                        title: locale.Planner,
                        time: "",
                        description: locale.validateForm,
                        type: "warning",
                    })
                );
                return;
            }

            const status = statusList.find((s) => String(s.key) === String(form.status));

            const api = new db.tblProduct();

            api.post({
                productId: form.productId,
                status: Number(status?.key),
                liveDate: saveToDb(form.liveDate),
                productName: form.productName,
                sku: form.sku,
                costPrice: form.costPrice,
                price: form.price,
                shortDescription: form.shortDescription,
                description: form.description,
            }, { createdBy: Number(userId) })
                .then((result) => {
                    if (result === null) {
                        dispatch(
                            createToast({
                                id: new Date().toISOString(),
                                show: true,
                                title: locale.Planner,
                                time: "",
                                description: locale.errorMessage,
                                type: "warning",
                            })
                        );
                    } else {
                        setProductId(String(result));
                        dispatch(
                            createToast({
                                id: new Date().toISOString(),
                                show: true,
                                title: locale.Planner,
                                time: "",
                                description: locale.AddNewSuccess,
                                type: "success",
                            })
                        );

                    }
                })
                .catch(() => {
                    dispatch(
                        createToast({
                            id: new Date().toISOString(),
                            show: true,
                            title: locale.Planner,
                            time: "",
                            description: locale.errorMessage,
                            type: "warning",
                        })
                    );
                });
        },
        [dispatch, form, setProductId, statusList, userId]
    );


    const [isCollapse, setIsCollapse] = useState<boolean>(true);

    return (
        <div
            className="accordion-item"
            id={`pr-${id}`}
            data-testid={`pr-${id}`}
        >
            <h2 className="accordion-header">
                <button
                    className={`accordion-button ${isCollapse ? "" : "collapsed"}`}
                    type="button"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                    onClick={() => { setIsCollapse(!isCollapse); }}
                >
                    {locale.btnProduct}
                </button>
            </h2>
            <div
                id={`prb-${id}`}
                data-testid={`prb-${id}`}
                className={`accordion-collapse ${isCollapse ? "show" : "collapse"}`}

            >
                <div className="accordion-body">
                    <form className="mb-4" onSubmit={handleSubmit}>
                        <div className="mb-3 row">
                            <div className="col-4">
                                <label className="form-label">{locale.productId}</label>
                                <input
                                    className="form-control"
                                    name="productId"
                                    value={form.productId}
                                    onChange={handleChange}
                                    readOnly disabled
                                />
                            </div>
                            <div className="col-4">
                                <label className="form-label">{locale.status}</label>
                                <select
                                    className="form-select"
                                    name="status"
                                    value={form.status}
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
                            <div className="col-4">
                                <label className="form-label">{locale.liveDate}</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    name="liveDate"
                                    value={form.liveDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <div className="col-6">
                                <label className="form-label">{locale.productName}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="productName"
                                    value={form.productName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-6">
                                <label className="form-label">{locale.sku}</label>
                                <input
                                    className="form-control"
                                    name="sku"
                                    value={form.sku}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <div className="col-6">
                                <label className="form-label">{locale.costPrice}</label>
                                <input
                                    className="form-control"
                                    name="costPrice"
                                    value={form.costPrice}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-6">
                                <label className="form-label">{locale.price}</label>
                                <input
                                    className="form-control"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">{locale.shortDescription}</label>
                            <textarea
                                rows={3}
                                className="form-control"
                                name="shortDescription"
                                value={form.shortDescription}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">{locale.fullDescription}</label>
                            <textarea
                                className="form-control"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows={3}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            {locale.AddNew}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Create;
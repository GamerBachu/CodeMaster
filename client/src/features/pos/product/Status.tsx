

import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import locale from "../../../resources";
import type { keyValueModel } from "../../../models";
import { createToast } from "../../../components/toasts/toastSlicer";
import db from "../../../database/";
import { useAppSession } from "../../../contexts";
import statusUnit from "../enums/statusUnit";
import { initialFormStatus, type IProductStatus, } from "./service";
import { onlyNumber } from "./service";
import AccordionItem from "../../../components/accordion/AccordionItem";
import { UpdateButton } from "../../../components/button";
import { getStatusColor2 } from "../statusColorUtils";


type IStatusProps = {
    id: string;
    productId: string;
};

const Status = ({
    id,
    productId,
}: IStatusProps) => {

    const appSession = useAppSession();
    const userId = appSession.info.account?.id;
    const dispatch = useDispatch();

    const [form, setForm] = useState<IProductStatus>(initialFormStatus);
    const [statusList, setStatusList] = useState<keyValueModel[]>([]);

    const [btnSaveText, setBtnSaveText] = useState(locale.save);


    useEffect(() => {
        if (productId !== "0") {
            loadData();
        }

        async function loadData() {

            const result = await db.tblActionStatus.search();
            const data: keyValueModel[] = [];
            if (result) {
                const allowedKeys = statusUnit.map(c => String(c));
                result.forEach((item) => {
                    if (allowedKeys.find(s => String(s) === String(item.id ?? "")))
                        data.push({
                            key: String(item.id ?? ""),
                            value: item.name,
                        });
                });
                setStatusList(data);
                setForm((prev) => ({ ...prev, status: data[0]?.key }));
                setBtnSaveText(`${locale.save} - ${data[0]?.value}`);
            };
            const api = new db.tblProduct();
            api.get(productId)
                .then((resultP) => {
                    if (resultP) {

                        
                        setForm((prev) => ({
                            ...prev,
                            id: String(resultP.id),
                            productId: resultP.productId,
                            status: String(resultP.status),
                            liveDate: resultP.liveDate,
                        }));
                        const d = data.find(s => String(s.key) === String(resultP.status ?? ""));
                        setBtnSaveText(`${locale.save} - ${d?.value}`);
                    }
                })
                .catch(() => {
                    dispatch(
                        createToast({
                            title: locale.Planner,
                            description: locale.errorMessage,
                            type: "warning",
                        })
                    );
                });
        }
    }, [dispatch, productId, userId]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (onlyNumber(name, value) === false) return;

        if (name === "status") {
            const d = statusList.find(s => String(s.key) === String(value ?? ""));
            if (d === undefined) return;
            setBtnSaveText(`${locale.save} - ${d?.value}`);
        }
        setForm((prev) => ({ ...prev, [name]: value }));
    }, [statusList]);

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();

            const status = statusList.find((s) => String(s.key) === String(form.status));

            if (status === undefined) {
                dispatch(
                    createToast({
                        title: locale.Planner,
                        description: locale.validateForm,
                        type: "warning",
                    })
                );
                return;
            }
            if ((form.status === "25" && (form.liveDate?.trim?.() ?? "") === "")) {
                dispatch(
                    createToast({
                        title: locale.Planner,
                        description: locale.validateForm,
                        type: "warning",
                    })
                );
                return;
            }

            const api = new db.tblProduct();

            api.put({
                id: Number(form?.id),
                productId: form.productId,
                status: Number(status?.key),
                liveDate: form.liveDate,
            }).then((result) => {
                if (result === null) {
                    dispatch(
                        createToast({
                            title: locale.Planner,
                            description: locale.errorMessage,
                            type: "warning",
                        })
                    );
                } else {
                    dispatch(
                        createToast({
                            title: locale.Planner,
                            description: locale.UpdateSuccess,
                            type: "success",
                        })
                    );

                }
            }).catch(() => {
                dispatch(
                    createToast({
                        title: locale.Planner,
                        description: locale.errorMessage,
                        type: "warning",
                    })
                );
            });
        },
        [dispatch, form?.id, form.liveDate, form.productId, form.status, statusList]
    );


    return (
        <AccordionItem
            id={`pr-${id}`}
            title={`${locale.btnStatus}`}
            isCollapse={false}
            className=" border border-primary-subtle"
            classNameBtn={`${getStatusColor2(Number(form.status))}-subtle`}
        >

            <form className="mb-4" onSubmit={handleSubmit}>
                <div className="mb-3 row">

                    <div className="col-3">
                        <label className="form-label">{locale.status}</label>
                        <select
                            className="form-select"
                            name="status"
                            value={form.status}
                            onChange={handleChange}

                        >
                            {statusList.map((status) => (
                                <option key={status.key} value={status.key}>
                                    {status.value}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-5">
                        <label className="form-label">{locale.liveDate}</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            name="liveDate"
                            value={form.liveDate}
                            onChange={handleChange}

                        />
                    </div>
                    <div className="col-4 align-content-end">
                        <div className="btn-group " role="group" aria-label="">
                            <div className="btn-group  me-2" role="group" aria-label="">
                                <UpdateButton
                                    buttonId={`st-upd-btn${id}`}
                                    onClick={() => { }}
                                    label={btnSaveText}
                                    type="submit"
                                ></UpdateButton>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </AccordionItem>
    );
};

export default Status;;
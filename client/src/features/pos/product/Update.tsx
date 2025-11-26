import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import locale from "../../../resources";

import { createToast } from "../../../components/toasts/toastSlicer";
import db from "../../../database/";
import { useAppSession } from "../../../contexts";

import { dbToDateTimeInput } from "../../../utils/helper/dateUtils";
import type { IProduct } from "./service";
import { initialForm, isValid, onlyNumber } from "./service";
import AccordionItem from "../../../components/accordion/AccordionItem";
import { UpdateButton } from "../../../components/button";

type Props = {
    id: string;
    productId: string;
 
};

const Update = ({ id, productId }: Props) => {
    const appSession = useAppSession();
    const userId = appSession.info.account?.id;
    const dispatch = useDispatch();

    const [form, setForm] = useState<IProduct>(initialForm);

     useEffect(() => {
        if (productId !== "0") {
            loadData();
        }

        async function loadData() {
            const api = new db.tblProduct();
            api.get(productId)
                .then((resultP) => {

                    if (resultP) {
                      
                        setForm((prev) => ({
                            ...prev,
                            id: String(resultP.id),
                            productId: resultP.productId,
                            status: String(resultP.status),
                            productName: resultP.productName,
                            sku: resultP.sku,
                            costPrice: resultP.costPrice,
                            price: resultP.price,
                            shortDescription: resultP.shortDescription,
                            description: resultP.description,
                            userId: userId
                        }));
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
        setForm((prev) => ({ ...prev, [name]: value }));
    }, []);





    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();

            if (isValid(form, true) === false) {
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

                productName: form.productName,
                sku: form.sku,
                costPrice: form.costPrice,
                price: form.price,
                shortDescription: form.shortDescription,
                description: form.description,
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
        [dispatch, form]
    );


    return (
        <AccordionItem
            id={`pr-${id}`}
            title={`${locale.btnProduct}`}
            isCollapse={true}
            className="border border-primary-subtle mt-1"
        >

            <form className="mb-4" onSubmit={handleSubmit}>
                <div className="mb-3 row">
                    <div className="col-6">
                        <label className="form-label">{locale.productId}</label>
                        <input
                            className="form-control"
                            name="productId"
                            value={form.productId}
                            readOnly disabled
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
                    <div className="col-12">
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

                <UpdateButton
                    buttonId={`dis-upd-btn${form.id}`}
                    onClick={() => () => { }}
                    label={locale.save}
                    type="submit"
                ></UpdateButton>

            </form>
        </AccordionItem>
    );
};

export default Update;
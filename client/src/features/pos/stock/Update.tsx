import { useCallback, useEffect, useState } from 'react';
import { UpdateButton } from "../../../components/button";
import locale from "../../../resources";

import tblPosStock from "../../../database/tblPosStock";
import { onlyNumberAllowed } from '../../../utils/helper/numberUtils';
import { useDispatch } from 'react-redux';
import { createToast } from '../../../components/toasts/toastSlicer';

type stockAvailabilityFormProps = {
    id: string;
    productId: string;

};
interface StockAvailabilityModel {
    id: number;
    productId: string;
    currentStock: number;
    minimumOrderQuantity: number;
}
const initialForm = { id: 0, productId: "0", currentStock: 0, minimumOrderQuantity: 1 };

const Update = ({ productId, id }: stockAvailabilityFormProps) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState<StockAvailabilityModel>(initialForm);
    useEffect(() => {
        if (productId === "0") return;

        setForm((prev) => ({
            ...prev,
            productId: productId
        }));
        tblPosStock.search({ productId: productId }).then((res) => {
            if (res && res.length > 0) {
                setForm((prev) => ({
                    ...prev,
                    id: res[0].id,
                    currentStock: res[0].currentStock,
                    minimumOrderQuantity: res[0].minimumOrderQuantity,
                }));
            }
        }).catch(() => {
            setForm({
                ...initialForm,
                productId: productId
            });
        });
    }, [productId]);

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (!onlyNumberAllowed(value)) return;
        setForm((prev) => ({ ...prev, [name]: value }));
    }, []);

    const onUpdateClick = (form: StockAvailabilityModel) => {
        if (form.id < 1) {
            tblPosStock
                .post({ ...form })
                .then((res) => {
                    if (res) {
                        setForm((prev) => ({ ...prev, id: Number(res) }));
                        dispatch(
                            createToast({
                                title: locale.Planner,
                                description: locale.AddNewSuccess,
                                type: "success",
                            })
                        );
                    }
                })
                .catch(() => { });
        } else {
            tblPosStock.put({ ...form });
        }
    };


    return (
        <form className="border p-2" onSubmit={(e) => { e.preventDefault(); }} data-testid={`frm-st-${id}`}>
            <div className="mb-3 row">
                <div className="col-4">
                    <label className="form-label small">{locale.currentStock}</label>
                    <input
                        className="form-control form-control-sm"
                        name="currentStock"
                        value={form.currentStock}
                        required
                        onChange={onChange}
                    />
                </div>
                <div className="col-4">
                    <label className="form-label small">{locale.minimumOrderQuantity}</label>
                    <input
                        className="form-control form-control-sm"
                        name="minimumOrderQuantity"
                        value={form.minimumOrderQuantity}
                        required
                        onChange={onChange}
                    />
                </div>
                <div className="col-4 align-content-end">
                    <div className="btn-group " role="group" aria-label="">
                        <div className="btn-group  me-2" role="group" aria-label="">
                            <UpdateButton
                                buttonId={`st-upd-btn${id}`}
                                onClick={() => onUpdateClick(form)}
                                label={locale.save}
                                type="button"
                            ></UpdateButton>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Update;
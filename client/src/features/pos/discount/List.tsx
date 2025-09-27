import { useState, useEffect, useCallback } from "react";
import { AddButton, } from "../../../components/button/";
import locale from "../../../resources";
import tblPosDiscount from "../../../database/tblPosDiscount";
import type { discountModel } from "../../../models/posModels";
import { onlyNumberAllowed } from "../../../utils/helper/numberUtils";
import Update from "./Update";
import { useDispatch } from "react-redux";
import { createToast } from "../../../components/toasts/toastSlicer";

type ListProps = { productId: string; };

const List = ({ productId }: ListProps) => {
    const dispatch = useDispatch();
    const [apiData, setApiData] = useState<discountModel[]>([]);

    const onAddButtonClick = () => {
        const minRowId =
            apiData.length > 0
                ? Math.min(
                    ...apiData.map((v) => (typeof v.rowId === "number" ? v.rowId : 0))
                )
                : 0;
        const newRowId = minRowId - 1;
        setApiData([
            { rowId: newRowId, productId, id: 0, name: "", percentage: 0 },
            ...apiData,
        ]);
    };

    const handleChange = useCallback((
        rowId: number,
        field: keyof discountModel,
        value: string
    ) => {
        if (field === "percentage" && !onlyNumberAllowed(value)) {
            return;
        }
        setApiData(prevApiData =>
            prevApiData.map((form) =>
                form.rowId === rowId ? { ...form, [field]: value } : form
            )
        );
    }, []);

    const onUpdateClick = (form: discountModel) => {
        const temp = apiData;
        const findIndex = temp.findIndex((r) => r.rowId === form.rowId);
        if (findIndex < 0) return;
        const row = temp[findIndex];
        if (row === undefined) return;


        if (row.id < 1) {

            tblPosDiscount
                .post({ id: row.id, productId: row.productId, name: row.name, percentage: row.percentage })
                .then((res) => {
                    if (res) {
                        temp[findIndex].id = Number(res);
                        setApiData([...temp]);
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
            tblPosDiscount.put({ id: row.id, productId: row.productId, name: row.name, percentage: row.percentage });
            dispatch(
                createToast({
                    title: locale.Planner,
                    description: locale.UpdateSuccess,
                    type: "success",
                })
            );
        }
    };

    const onDeleteClick = (form: discountModel) => {
        const temp = apiData;
        const findIndex = temp.findIndex((r) => r.rowId === form.rowId);
        if (findIndex < 0) return;
        const row = temp[findIndex];
        temp.splice(findIndex, 1);
        setApiData([...temp]);
        tblPosDiscount.remove({ id: row.id, productId: row.productId, name: row.name, percentage: row.percentage });
        dispatch(
            createToast({
                title: locale.Planner,
                description: locale.DeleteSuccess,
                type: "success",
            })
        );
    };

    useEffect(() => {
        let isMounted = true;
        tblPosDiscount
            .search({ productId })
            .then((response) => {
                if (!isMounted) return;
                if (response === undefined || response === null) {
                    setApiData([]);
                    return;
                }
                const d: discountModel[] = response
                    ?.sort((a, b) => b.id - a.id)
                    .map((r, i) => ({ ...r, rowId: i })) || [];
                setApiData(d);
            })
            .catch(() => {
                if (isMounted) setApiData([]);
            });
        return () => {
            isMounted = false;
            setApiData([]);
        };
    }, [productId]);

    return (
        <>
            <AddButton
                buttonId="dis-add-btn"
                onClick={onAddButtonClick}
                label={locale.addNewDiscount}
            ></AddButton>
            <hr className="mt-3" />
            {apiData.map((form: discountModel) => (
                <Update
                    key={form.rowId}
                    form={form}
                    onChange={handleChange}
                    onUpdate={onUpdateClick}
                    onDelete={onDeleteClick}
                ></Update>
            ))}
        </>
    );
};

export default List;

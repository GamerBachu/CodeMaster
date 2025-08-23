import { useState, useEffect } from "react";
import {
    AddButton,
} from "../../../components/button/";
import locale from "../../../resources";
import tblDiscount from "../../../database/tblDiscount";
import type { discountModel } from "../../../models/posModels";
import { onlyNumberAllowed } from "../../../utils/helper/numberUtils";
import Update from "./Update";

type ListProps = {
    productId: string;
};

const List = ({ productId }: ListProps) => {
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

    const handleChange = (
        rowId: number,
        field: keyof discountModel,
        value: string
    ) => {
        if (field === "percentage") {
            if (!onlyNumberAllowed(value)) {
                return;
            }
        }
        setApiData(
            apiData.map((form) =>
                form.rowId === rowId ? { ...form, [field]: value } : form
            )
        );
    };

    const onUpdateClick = (form: discountModel) => {
        const temp = apiData;
        const findIndex = temp.findIndex((r) => r.rowId === form.rowId);
        if (findIndex < 0) return;
        const row = temp[findIndex];
        if (row === undefined) return;

       
        if (row.id < 1) {

            tblDiscount
                .post({ ...row })
                .then((res) => {
                    if (res) {
                        temp[findIndex].id = Number(res);
                        setApiData([...temp]);
                    }
                })
                .catch(() => { });
        } else {
            tblDiscount.put({ ...row });
        }
    };

    const onDeleteClick = (form: discountModel) => {
        const temp = apiData;
        const findIndex = temp.findIndex((r) => r.rowId === form.rowId);
        if (findIndex < 0) return;
        const row = temp[findIndex];
        temp.splice(findIndex, 1);
        setApiData([...temp]);
        tblDiscount.remove({ ...row });
    };

    useEffect(() => {
        tblDiscount
            .search({ productId })
            .then((response) => {
                if (response === undefined || response === null) {
                    setApiData([]);
                    return;
                }
                const d: discountModel[] = [];
                response
                    ?.sort((a, b) => b.id - a.id)
                    .forEach((r, i) => {
                        d.push({ ...r, rowId: i });
                    });
                setApiData(d);
            })
            .catch(() => {
                setApiData([]);
            });

        return () => {
            setApiData([]);
        };
    }, [productId]);

    return (
        <>
            <AddButton
                buttonId="dis-add-btn"
                onClick={onAddButtonClick}
                label={locale.AddNewDiscount}
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

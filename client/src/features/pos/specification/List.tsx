import { useState, useEffect, useCallback } from "react";
import { AddButton, } from "../../../components/button/";
import locale from "../../../resources";
import db from "../../../database/";
import type { specificationModel } from "../../../models/posModels";
import Update from "./Update";
import type { keyValueModel } from "../../../models";
import { useDispatch } from "react-redux";
import { createToast } from "../../../components/toasts/toastSlicer";

type ListProps = { productId: string; };

const List = ({ productId }: ListProps) => {
    const [apiData, setApiData] = useState<specificationModel[]>([]);
    const [specList, setSpecList] = useState<keyValueModel[]>([]);
    const [selectedSpec, setSelectedSpec] = useState<string>("");
    const dispatch = useDispatch();

    const onAddButtonClick = () => {
        if (selectedSpec === "") return;

        const minRowId =
            apiData.length > 0
                ? Math.min(
                    ...apiData.map((v) => (typeof v.rowId === "number" ? v.rowId : 0))
                )
                : 0;
        const newRowId = minRowId - 1;
        setApiData([
            { rowId: newRowId, productId, id: 0, type: selectedSpec, unit: "", value: "" },
            ...apiData,
        ]);
    };

    const handleChange = useCallback((
        rowId: number,
        field: keyof specificationModel,
        value: string
    ) => {

        setApiData(prevApiData =>
            prevApiData.map((form) =>
                form.rowId === rowId ? { ...form, [field]: value } : form
            )
        );
    }, []);

    const onUpdateClick = (form: specificationModel) => {
        const temp = apiData;
        const findIndex = temp.findIndex((r) => r.rowId === form.rowId);
        if (findIndex < 0) return;
        const row = temp[findIndex];
        if (row === undefined) return;


        if (row.id < 1) {

            db.tblPosSpecification
                .post({ id: row.id, productId: row.productId, type: row.type, unit: row.unit, value: row.value })
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
            db.tblPosSpecification.put({ id: row.id, productId: row.productId, type: row.type, unit: row.unit, value: row.value });
            dispatch(
                createToast({
                    title: locale.Planner,
                    description: locale.UpdateSuccess,
                    type: "success",
                })
            );
        }
    };

    const onDeleteClick = (form: specificationModel) => {
        const temp = apiData;
        const findIndex = temp.findIndex((r) => r.rowId === form.rowId);
        if (findIndex < 0) return;
        const row = temp[findIndex];
        temp.splice(findIndex, 1);
        setApiData([...temp]);
        db.tblPosSpecification.remove({ id: row.id, productId: row.productId, type: row.type, unit: row.unit, value: row.value });
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

        const apiMaster = new db.tblProduct();
        apiMaster.getSpecificationMaster().then((res) => {
            if (!isMounted) return;
            if (res === undefined || res === null) {
                setApiData([]);
                return;
            }
            const d = res.map((item) => ({ key: String(item.id ?? item.createdDate), value: item.name }));
            setSpecList(d);
            if (d.length > 0) setSelectedSpec(d[0].value);
        });

        db.tblPosSpecification
            .search({ productId })
            .then((response) => {
                if (!isMounted) return;
                if (response === undefined || response === null) {
                    setApiData([]);
                    return;
                }
                const d: specificationModel[] = response
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

    const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        const isValidKey = specList.findIndex(s => s.key === value);
        if (isValidKey > -1) setSelectedSpec(specList[isValidKey].value);
        else setSelectedSpec("");
    };

    return (
        <>
            <div className="row align-items-center">
                <div className="col-6">
                    <select className="form-select form-select-sm" value={selectedSpec} onChange={onSelectChange}>

                        {specList.map((spec) => (
                            <option key={spec.key} value={spec.key}>
                                {spec.value}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-6">
                    <AddButton
                        buttonId="dis-add-btn"
                        onClick={onAddButtonClick}
                        label={locale.addNewSpecification}
                    ></AddButton>
                </div>
            </div>
            <hr className="mt-3" />
            {apiData.map((form: specificationModel) => (
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

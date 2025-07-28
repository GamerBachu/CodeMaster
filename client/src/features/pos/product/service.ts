export interface IProduct {
    id?: string;
    userId?: string | number;
    productId: string;
    productName: string;
    shortDescription: string;
    description: string;
    sku: string;
    price: number;
    costPrice: number;
    status: string;
    liveDate: string;
}

export const initialForm = {
    productId: "*******",
    productName: "",
    description: "",
    shortDescription: "",
    sku: "",
    price: 0,
    costPrice: 0,
    status: "0",
    liveDate: "",
    userId: ""
};

export function isValid(form: IProduct): boolean {
    if (
        (form.productId?.trim?.() ?? "") === "" ||
        (form.productName?.trim?.() ?? "") === "" ||
        (form.sku?.trim?.() ?? "") === "" ||
        (form.status?.trim?.() ?? "") === "" ||
        isNaN(form.price) ||
        isNaN(form.costPrice) ||
        (form.liveDate?.trim?.() ?? "") === ""
    ) {
        return false;
    }
    return true;
}


export function onlyNumber(name: string, value: string): boolean {
    if (name === "costPrice" || name === "price") {
        if (!/^\d*\.?\d*$/.test(value)) {
            return false;
        }
    }
    return true;
}
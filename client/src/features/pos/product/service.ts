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
    id: "0",
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

export function isValid(form: IProduct, isRequiredAll: boolean): boolean {


    if (
        (form.productId?.trim?.() ?? "") === "" ||
        (form.productName?.trim?.() ?? "") === "" ||
        (form.sku?.trim?.() ?? "") === "" ||

        isNaN(form.price) ||
        isNaN(form.costPrice)

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




export interface IProductStatus {
    id?: string;
    productId: string;
    status: string;
    liveDate: string;
}

export const initialFormStatus = {
    id: "0",
    productId: "*******",
    status: "0",
    liveDate: "",
};

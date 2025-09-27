export interface discountModel {
    rowId: number;
    id: number;
    productId: string;
    name: string;
    percentage: number;
}


export interface specificationModel {
    rowId: number;
    id: number;
    productId: string;
    type: string;
    unit: string;
    value: string;
}
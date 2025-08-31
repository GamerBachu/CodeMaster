import type { IDBStoreSchema } from "../Interfaces";
import type PrimaryModel from "./PrimaryModel";

export interface IDiscount {
    id: number;
    productId: string;
    name: string;
    percentage: number;
}
export const DiscountSchema: IDBStoreSchema = { name: "posDiscount", option: { keyPath: "id", autoIncrement: true }, };

export interface IStockAvailability {
    id: number;
    productId: string;
    currentStock: number;
    minimumOrderQuantity: number;
}

export const StockAvailabilitySchema: IDBStoreSchema = { name: "posStockAvailability", option: { keyPath: "id", autoIncrement: true }, };


export interface ISpecificationMasterModel {
    id?: number;
    name: string;
    isActive: boolean;
    createdDate: string;
}

export const SpecificationMasterSchema: IDBStoreSchema = { name: "posSpecificationsMaster", option: { keyPath: "id", autoIncrement: true }, };

export interface ISpecifications {
    id: number;
    productId: string;
    type: string;
    unit: string;
    value: string;
}
export const SpecificationsSchema: IDBStoreSchema = { name: "posSpecifications", option: { keyPath: "id", autoIncrement: true }, };







export interface IMedia {
    id: number;
    productId: string;
    url: string;
    title: string;
    type: string;
}
export const MediaSchema: IDBStoreSchema = { name: "posMedia", option: { keyPath: "id", autoIncrement: true }, };



export interface ISeo {
    id: number;
    productId: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string;
}
export const SeoSchema: IDBStoreSchema = { name: "posSeo", option: { keyPath: "id", autoIncrement: true }, };



export interface IMarketing {
    id: number;
    productId: string;
    claims: string;
    certifications: string;
    relatedProductIDs: string;
}
export const MarketingSchema: IDBStoreSchema = { name: "posMarketing", option: { keyPath: "id", autoIncrement: true }, };


export interface ISupplierInfo {
    id: number;
    productId: string;
    supplierID: string;
    packagingType: string;
    packagingDimensions: string;
}
export const SupplierInfoSchema: IDBStoreSchema = { name: "posSupplierInfo", option: { keyPath: "id", autoIncrement: true }, };



export interface IReviews {
    id: number;
    productId: string;
    rating: number;
    comment: string;
    userId: string;
}
export const ReviewsSchema: IDBStoreSchema = { name: "posReviews", option: { keyPath: "id", autoIncrement: true }, };



export interface IProduct {
    id: number;
    productId: string;
    productName: string;
    shortDescription: string;
    description: string;
    sku: string;
    price: number;
    costPrice: number;
    status: number;
    liveDate: string;
}
export const ProductSchema: IDBStoreSchema = { name: "posProduct", option: { keyPath: "id", autoIncrement: true }, };



export interface IProductIdModel extends PrimaryModel {
    productId: string;
}
export const ProductIdSchema: IDBStoreSchema = { name: "posProductId", option: { keyPath: "id", autoIncrement: true }, };

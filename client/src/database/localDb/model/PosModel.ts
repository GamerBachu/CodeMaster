import type { IDBStoreSchema } from "../Interfaces";
import type PrimaryModel from "./PrimaryModel";

export interface IDiscount {
    id: number;
    productId: string;
    onSale: boolean;
    salePrice: number;
    discountPercentage: number;
}
export const DiscountSchema: IDBStoreSchema = { name: "posDiscount", option: { keyPath: "id", autoIncrement: true }, };

export interface IStockAvailability {
    id: number;
    productId: string;
    currentStock: number;
    minimumOrderQuantity: number;
}
export const StockAvailabilitySchema: IDBStoreSchema = { name: "posStockAvailability", option: { keyPath: "id", autoIncrement: true }, };

export interface IWeight {
    id: number;
    productId: string;
    value: number;
    unit: string;
}
export const WeightSchema: IDBStoreSchema = { name: "posWeight", option: { keyPath: "id", autoIncrement: true }, };



export interface IProductVariation {
    id: number;
    productId: string;
}
export const ProductVariationSchema: IDBStoreSchema = { name: "posProductVariation", option: { keyPath: "id", autoIncrement: true }, };






export interface ITechnicalSpecifications {
    id: number;
    productId: string;
    type: string;
    value: string;
}
export const TechSpecSchema: IDBStoreSchema = { name: "posTechSpec", option: { keyPath: "id", autoIncrement: true }, };








export interface ISpecifications {
    id: number;
    productId: string;
    size: string;
    dimensions: string;
    color: string;
    materialComposition: string;
    functionalAttributes: string;
    countryOfOrigin: string;
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

import type { IDBStoreSchema } from "../Interfaces";
import type PrimaryModel from "./PrimaryModel";

export interface IDiscount {
    productId: string;
    onSale: boolean;
    salePrice: number;
    discountPercentage: number;
}
export const DiscountSchema: IDBStoreSchema = { name: "posDiscount", option: { keyPath: "productId", autoIncrement: false }, };

export interface IStockAvailability {
    productId: string;
    currentStock: number;
    minimumOrderQuantity: number;
}
export const StockAvailabilitySchema: IDBStoreSchema = { name: "posStockAvailability", option: { keyPath: "productId", autoIncrement: false }, };

export interface IWeight {
    productId: string;
    value: number;
    unit: string;
}
export const WeightSchema: IDBStoreSchema = { name: "posWeight", option: { keyPath: "productId", autoIncrement: false }, };



export interface IProductVariation {
    productId: string;
}
export const ProductVariationSchema: IDBStoreSchema = { name: "posProductVariation", option: { keyPath: "productId", autoIncrement: false }, };






export interface ITechnicalSpecifications {
    productId: string;
    type: string;
    value: string;
}
export const TechSpecSchema: IDBStoreSchema = { name: "posTechSpec", option: { keyPath: "productId", autoIncrement: false }, };








export interface ISpecifications {
    productId: string;
    size: string;
    dimensions: string;
    color: string;
    materialComposition: string;
    functionalAttributes: string;
    countryOfOrigin: string;
}
export const SpecificationsSchema: IDBStoreSchema = { name: "posSpecifications", option: { keyPath: "productId", autoIncrement: false }, };







export interface IMedia {
    productId: string;
    url: string;
    title: string;
    type: string;
}
export const MediaSchema: IDBStoreSchema = { name: "posMedia", option: { keyPath: "productId", autoIncrement: false }, };



export interface ISeo {
    productId: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string;
}
export const SeoSchema: IDBStoreSchema = { name: "posSeo", option: { keyPath: "productId", autoIncrement: false }, };



export interface IMarketing {
    productId: string;
    claims: string;
    certifications: string;
    relatedProductIDs: string;
}
export const MarketingSchema: IDBStoreSchema = { name: "posMarketing", option: { keyPath: "productId", autoIncrement: false }, };


export interface ISupplierInfo {
    productId: string;
    supplierID: string;
    packagingType: string;
    packagingDimensions: string;
}
export const SupplierInfoSchema: IDBStoreSchema = { name: "posSupplierInfo", option: { keyPath: "productId", autoIncrement: false }, };



export interface IReviews {
    productId: string;
    rating: number;
    comment: string;
    userId: string;
}
export const ReviewsSchema: IDBStoreSchema = { name: "posReviews", option: { keyPath: "productId", autoIncrement: false }, };



export interface IProduct {
    productId: string;
    productName: string;
    shortDescription: string;
    description: string;
    sku: string;
    price: number;
    costPrice: number;
    status: number;
    liveDate: Date;
}
export const ProductSchema: IDBStoreSchema = { name: "posProduct", option: { keyPath: "productId", autoIncrement: false }, };



export interface IProductIdModel extends PrimaryModel {
    productId: string;
}
export const ProductIdSchema: IDBStoreSchema = { name: "posProductId", option: { keyPath: "id", autoIncrement: true }, };

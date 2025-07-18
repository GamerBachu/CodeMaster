// // Enums (if applicable for string-based fixed values)
// export type WeightUnit = "grams" | "kilograms" | "pounds" | "ounces";
// // Create a corresponding const object to hold the values for runtime use (optional, but good for consistency)
// export const WeightUnits = {
//     Grams: "grams",
//     Kilograms: "kilograms",
//     Pounds: "pounds",
//     Ounces: "ounces",
// } as const; // 'as const' ensures these are treated as literal types, not just strings

// export type ProductType = "electronic" | "clothing" | "book" | "general";


// // Interfaces remain largely the same, but the 'unit' property now uses the 'WeightUnit' type
// export interface IWeight {
//     value: number;
//     unit: WeightUnit; // Now using the type alias
// }


// // Interfaces
// export interface IDiscount {
//     onSale: boolean;
//     salePrice: number;
//     discountPercentage: number;
// }

// export interface IStockAvailability {
//     currentStock: number;
//     minimumOrderQuantity: number;
// }

// export interface IWeight {
//     value: number;
//     unit: WeightUnit; // Use the enum for better type safety
// }

// export interface ITechnicalSpecifications {
//     insulationDuration: string;
//     closureType: string;
// }

// export interface ISpecifications {
//     size: string;
//     dimensions: string;
//     weight: IWeight;
//     color: string;
//     materialComposition: string;
//     functionalAttributes: string[];
//     technicalSpecifications: ITechnicalSpecifications;
//     countryOfOrigin: string;
// }

// export interface IElectronicSpecifications {
//     processor: string;
//     ram: string;
//     storage: string;
//     operatingSystem: string;
//     connectivity: string[]; // e.g., ["Wi-Fi", "Bluetooth", "USB-C"]
//     ports: string[]; // e.g., ["HDMI", "USB-A", "Ethernet"]
//     displaySize?: string;
//     resolution?: string;
//     batteryLife?: string;
//     // Add other electronic-specific fields as needed
// }

// export interface IImage {
//     url: string;
//     altText: string;
// }

// export interface IVideo {
//     url: string;
//     title: string;
// }

// export interface IMedia {
//     images: IImage[];
//     videos: IVideo[];
//     // Handle properties starting with numbers using string literal types or renaming if possible
//     "3dModelURL": string;
// }

// export interface ISeo {
//     metaTitle: string;
//     metaDescription: string;
//     keywords: string[];
// }

// export interface IMarketing {
//     claims: string[];
//     certifications: string[];
//     seo: ISeo;
//     relatedProductIDs: string[];
// }

// export interface ISupplierInfo {
//     supplierID: string;
//     packagingType: string;
//     packagingDimensions: string;
// }

// export interface IReviews {
//     averageRating: number;
//     reviewCount: number;
// }

// export interface IProductVariation {
//     variantID: string;
//     color: string;
//     size: string;
//     price: number;
//     stock: number;
//     imageURL: string;
// }

// export interface IHierarchy {
//     parentCategoryID: string;
//     level: number;
// }

// export interface IProduct {
//     id: string;
//     productName: string;
//     description: string;
//     shortDescription: string;
//     sku: string;
//     categoryID: string;
//     brandID: string;
//     price: number;
//     costPrice: number;
//     discount: IDiscount;
//     stockAvailability: IStockAvailability;
//     dateAdded: string; // Use string if storing as ISO date string
//     dateUpdated: string; // Use string if storing as ISO date string
//     isActive: boolean;
//     specifications: ISpecifications;
//     media: IMedia;
//     marketing: IMarketing;
//     supplierInfo: ISupplierInfo;
//     reviews: IReviews;
//     variations: IProductVariation[];
//     hierarchy: IHierarchy;
// }

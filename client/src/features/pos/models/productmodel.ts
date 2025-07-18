// import {
//     IDiscount,
//     IStockAvailability,
//     IWeight,
//     ITechnicalSpecifications,
//     ISpecifications,
//     IImage,
//     IVideo,
//     IMedia,
//     ISeo,
//     IMarketing,
//     ISupplierInfo,
//     IReviews,
//     IProductVariation,
//     IHierarchy,
//     IProduct,
//     WeightUnit,
// } from "../enums/weightunit";

// export class ProductModel implements IProduct {
//     public id: string;
//     public productName: string;
//     public description: string;
//     public shortDescription: string;
//     public sku: string;
//     public categoryID: string;
//     public brandID: string;
//     public price: number;
//     public costPrice: number;
//     public discount: IDiscount;
//     public stockAvailability: IStockAvailability;
//     public dateAdded: string;
//     public dateUpdated: string;
//     public isActive: boolean;
//     public specifications: ISpecifications;
//     public media: IMedia;
//     public marketing: IMarketing;
//     public supplierInfo: ISupplierInfo;
//     public reviews: IReviews;
//     public variations: IProductVariation[];
//     public hierarchy: IHierarchy;

//     constructor(data: IProduct) {
//         this.id = data.id;
//         this.productName = data.productName;
//         this.description = data.description;
//         this.shortDescription = data.shortDescription;
//         this.sku = data.sku;
//         this.categoryID = data.categoryID;
//         this.brandID = data.brandID;
//         this.price = data.price;
//         this.costPrice = data.costPrice;
//         this.discount = data.discount;
//         this.stockAvailability = data.stockAvailability;
//         this.dateAdded = data.dateAdded;
//         this.dateUpdated = data.dateUpdated;
//         this.isActive = data.isActive;
//         this.specifications = data.specifications;
//         this.media = data.media;
//         this.marketing = data.marketing;
//         this.supplierInfo = data.supplierInfo;
//         this.reviews = data.reviews;
//         this.variations = data.variations;
//         this.hierarchy = data.hierarchy;
//     }

//     // Example of a method you might add to the model
//     public getFormattedPrice(): string {
//         return `$${this.price.toFixed(2)}`;
//     }

//     public getDisplayWeight(): string {
//         return `${this.specifications.weight.value} ${this.specifications.weight.unit}`;
//     }

//     public isDiscounted(): boolean {
//         return this.discount.onSale;
//     }
// }
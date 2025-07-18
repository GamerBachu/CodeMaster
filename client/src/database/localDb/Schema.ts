import type { IDBStoreSchema } from "./Interfaces";
import User from "./model/UserModel";
import ActionStatus from "./model/ActionStatusModel";
import UserPlanner from "./model/UserPlannerModel";
import { DiscountSchema, StockAvailabilitySchema, WeightSchema, ProductVariationSchema, TechSpecSchema, SpecificationsSchema, MediaSchema, SeoSchema, MarketingSchema, SupplierInfoSchema, ReviewsSchema, ProductSchema, ProductIdSchema } from "./model/PosModel";

export const schema: IDBStoreSchema[] = [User, ActionStatus, UserPlanner
    , DiscountSchema, StockAvailabilitySchema, WeightSchema, ProductVariationSchema, TechSpecSchema, SpecificationsSchema, MediaSchema, SeoSchema, MarketingSchema, SupplierInfoSchema, ReviewsSchema, ProductSchema, ProductIdSchema
];
export const version = 1;
export const dbName = "CodeMasterDB";

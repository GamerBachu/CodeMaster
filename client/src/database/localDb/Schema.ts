import type { IDBStoreSchema } from "./Interfaces";
import User from "./model/UserModel";
import ActionStatus from "./model/ActionStatusModel";
import UserPlanner from "./model/UserPlannerModel";
import UserToken from "./model/UserTokenModel";
import {
    DiscountSchema,
    StockAvailabilitySchema,
    SpecificationMasterSchema,
    SpecificationsSchema,
    MediaSchema,
    SeoSchema,
    MarketingSchema,
    SupplierInfoSchema,
    ReviewsSchema,
    ProductSchema,
    ProductIdSchema,
} from "./model/PosModel";
import AppLogSchema from "./model/LogsModel";

export const schema: IDBStoreSchema[] = [
    User,
    ActionStatus,
    UserPlanner,
    UserToken,

    DiscountSchema,
    StockAvailabilitySchema,
    SpecificationMasterSchema,
    SpecificationsSchema,
    MediaSchema,
    SeoSchema,
    MarketingSchema,
    SupplierInfoSchema,
    ReviewsSchema,
    ProductSchema,
    ProductIdSchema,
    AppLogSchema
];
export const version = 1;
export const dbName = "CodeMasterDB";

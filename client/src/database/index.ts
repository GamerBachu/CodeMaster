import tblUser from "./tblUser";
import tblActionStatus from "./tblActionStatus";
import tblPlanner, { type PlannerModel } from "./tblPlanner";
import { tblProduct } from "./tblPos";
import tblPOSStock from "./tblPosStock";
import tblPosSpecification from "./tblPosSpecification";
import tblPosDiscount from "./tblPosDiscount";
import tblAppLog, { type AppLogModel, type AppLogType } from "./tblAppLog";

export default {
    tblUser,
    tblActionStatus,
    tblPlanner,
    tblProduct,
    tblPosDiscount,
    tblPosSpecification,
    tblPOSStock,
    tblAppLog
};

export type {

    PlannerModel,
    AppLogModel,
    AppLogType
};

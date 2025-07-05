import type { keyValueModel } from "./keyValue";

export interface UserPlannerModel {
    id: string;
    title: string;
    desc: string;
    startDate: Date;
    endDate: Date;
    status: keyValueModel;
    createdDate?: Date;
    isActive?: boolean;
}

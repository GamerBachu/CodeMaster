import type { keyValueModel } from "./keyValue";

export interface UserPlannerModel {
    id: number;
    title: string;
    desc: string;
    startDate: Date;
    endDate: Date;
    status: keyValueModel;
    createdDate?: Date;
    isActive?: boolean;
}

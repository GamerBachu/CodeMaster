import type { keyValueModel } from "./keyValue";

export interface UserPlannerModel {
    id: number;
    title: string;
    desc: string;
    startDate: string;
    endDate: string;
    status: keyValueModel;
    createdDate?: string;
    isActive?: boolean;
}

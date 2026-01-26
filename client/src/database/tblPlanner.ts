import LocalDb from "./localDb/LocalDb.ts";
import { type PlannerModel, UserPlanner } from "./localDb/model/PlannerModel.ts";


const search = async (): Promise<PlannerModel[] | null> => {

    const db = new LocalDb();
    const data = await db.getAll<PlannerModel>(UserPlanner.name);
    return data ?? null;
};

const get = async (p: Partial<PlannerModel>): Promise<PlannerModel | null> => {
    if (!p?.id) return null;
    const db = new LocalDb();
    const data = await db.get<PlannerModel>(UserPlanner.name, p.id);
    return data ?? null;
};

const post = async (p: Partial<PlannerModel>): Promise<string | number | null> => {
    if (p?.id !== null || p?.id !== undefined) {
        delete p.id;
    }
    p.createdDate = new Date().toISOString();

    p.updatedDate = new Date().toISOString();
    p.updatedBy = 0;
    p.deletedDate = new Date().toISOString();
    p.deletedBy = 0;
    p.isActive = true;

    const db = new LocalDb();
    const data: IDBValidKey = await db.create(UserPlanner.name, p);
    return data as number;
};

const put = async (p: Partial<PlannerModel>): Promise<string | number | null> => {
    if (!p?.id) return null;

    const old = await get(p);
    if (old === null) return null;

    p.createdDate = old.createdDate;
    p.createdBy = old.createdBy;
    p.updatedDate = new Date().toISOString();

    p.deletedDate = old.deletedDate;
    p.deletedBy = old.deletedBy;
    p.isActive = true;

    const db = new LocalDb();
    const data = await db.put(UserPlanner.name, p);
    return data as number;
};

const remove = async (p: Partial<PlannerModel>): Promise<string | number | null> => {
    if (!p?.id) return null;

    const db = new LocalDb();
    await db.delete(UserPlanner.name, p.id);
    return p.id;
};

const tblPlanner = {
    get,
    post,
    put,
    remove,
    search,
};
export default tblPlanner;
export type { PlannerModel };
import LocalDb from "./localDb/LocalDb.ts";
import { type AppLogModel, type AppLogType, AppLogSchema, AppLogTypes } from "./localDb/model/LogsModel.ts";


const search = async (): Promise<AppLogModel[] | null> => {

    const db = new LocalDb();
    const data = await db.getAll<AppLogModel>(AppLogSchema.name);
    return data ?? null;
};

const get = async (p: Partial<AppLogModel>): Promise<AppLogModel | null> => {
    if (p?.id === null || p?.id === undefined) return null;
    const db = new LocalDb();
    const data = await db.get<AppLogModel>(AppLogSchema.name, p.id);
    return data ?? null;
};

const post = async (p: Partial<AppLogModel>): Promise<string | number | null> => {
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
    const data: IDBValidKey = await db.create(AppLogSchema.name, p);
    return data as number;
};

const put = async (p: Partial<AppLogModel>): Promise<string | number | null> => {
    if (p?.id === null || p?.id === undefined) return null;

    const old = await get(p);
    ;
    if (old === null) return null;

    p.createdDate = old.createdDate;
    p.createdBy = old.createdBy;
    p.updatedDate = new Date().toISOString();

    p.deletedDate = old.deletedDate;
    p.deletedBy = old.deletedBy;
    p.isActive = true;

    const db = new LocalDb();
    const data = await db.put(AppLogSchema.name, p);
    return data as number;
};

const remove = async (p: Partial<AppLogModel>): Promise<string | number | null> => {
    if (p?.id === null || p?.id === undefined) return null;

    const db = new LocalDb();
    await db.delete(AppLogSchema.name, p.id);
    return p.id;
};


const logTypes = async (): Promise<AppLogType[] | null> => {
    //type to array list 
    return [...AppLogTypes];
};


const tblAppLog = {
    get,
    post,
    put,
    remove,
    search,
    logTypes
};
export default tblAppLog;
export type { AppLogModel, AppLogType };

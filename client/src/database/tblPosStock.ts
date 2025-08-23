import LocalDb from "./localDb/LocalDb.ts";
import { type IStockAvailability, StockAvailabilitySchema } from "./localDb/model/PosModel.ts";


const search = async (payload: Partial<IStockAvailability>): Promise<IStockAvailability[] | null> => {

    const db = new LocalDb();
    const data = await db.getAll<IStockAvailability>(StockAvailabilitySchema.name);
    const result =
        data.filter((u: IStockAvailability) =>
            u.productId === payload.productId
        ) ?? null;
    return result ?? null;
};

const get = async (payload: Partial<IStockAvailability>): Promise<IStockAvailability | null> => {
    if (!payload?.productId) return null;
    if (!payload?.id) return null;
    const db = new LocalDb();
    const data = await db.get<IStockAvailability>(StockAvailabilitySchema.name, payload.id);
    return data ?? null;
};

const post = async (payload: Partial<IStockAvailability>): Promise<string | number | null> => {
    if (!payload?.productId) return null;
    delete payload.id;
    const db = new LocalDb();
    const data: IDBValidKey = await db.create(StockAvailabilitySchema.name, payload);
    return data as number;
};

const put = async (payload: Partial<IStockAvailability>): Promise<string | number | null> => {
    if (!payload?.productId) return null;
    if (!payload?.id) return null;
    if (payload.id < 1) return null;

    const db = new LocalDb();
    const data = await db.put(StockAvailabilitySchema.name, payload);
    return data as number;
};

const remove = async (payload: Partial<IStockAvailability>): Promise<string | number | null> => {
    if (!payload?.productId) return null;
    if (!payload?.id) return null;
    if (payload.id < 1) return null;
    const db = new LocalDb();
    await db.delete(StockAvailabilitySchema.name, payload.id);
    return payload.id;
};

const tblPOSStock = {
    get,
    post,
    put,
    remove,
    search,
};
export default tblPOSStock; 

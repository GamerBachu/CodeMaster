import LocalDb from "./localDb/LocalDb.ts";
import { type IDiscount, DiscountSchema } from "./localDb/model/PosModel.ts";


const search = async (payload: Partial<IDiscount>): Promise<IDiscount[] | null> => {

    const db = new LocalDb();
    const data = await db.getAll<IDiscount>(DiscountSchema.name);
    const result =
        data.filter((u: IDiscount) =>
            u.productId === payload.productId
        ) ?? null;
    return result ?? null;
};

const get = async (payload: Partial<IDiscount>): Promise<IDiscount | null> => {
    if (!payload?.productId) return null;
    if (!payload?.id) return null;
    const db = new LocalDb();
    const data = await db.get<IDiscount>(DiscountSchema.name, payload.id);
    return data ?? null;
};

const post = async (payload: Partial<IDiscount>): Promise<string | number | null> => {
    if (!payload?.productId) return null;
    delete payload.id;
    const db = new LocalDb();
    const data: IDBValidKey = await db.create(DiscountSchema.name, payload);
    return data as number;
};

const put = async (payload: Partial<IDiscount>): Promise<string | number | null> => {
    if (!payload?.productId) return null;
    if (!payload?.id) return null;
    if (payload.id < 1) return null;

    const db = new LocalDb();
    const data = await db.put(DiscountSchema.name, payload);
    return data as number;
};

const remove = async (payload: Partial<IDiscount>): Promise<string | number | null> => {
    if (!payload?.productId) return null;
    if (!payload?.id) return null;
    if (payload.id < 1) return null;
    const db = new LocalDb();
    await db.delete(DiscountSchema.name, payload.id);
    return payload.id;
};

const tblPosDiscount = {
    get,
    post,
    put,
    remove,
    search,
};
export default tblPosDiscount; 

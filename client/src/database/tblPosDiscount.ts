import LocalDb from "./localDb/LocalDb.ts";
import { type IDiscount, DiscountSchema } from "./localDb/model/PosModel.ts";


class tblDiscount {
    search = async (payload: Partial<IDiscount>): Promise<IDiscount[] | null> => {

        const db = new LocalDb();
        const data = await db.getAll<IDiscount>(DiscountSchema.name);
        const result =
            data.filter((u: IDiscount) =>
                u.productId === payload.productId
            ) ?? null;
        return result ?? null;
    };

    get = async (payload: Partial<IDiscount>): Promise<IDiscount | null> => {
        if (!payload?.productId) return null;
        if (!payload?.id) return null;
        const db = new LocalDb();
        const data = await db.get<IDiscount>(DiscountSchema.name, payload.id);
        return data ?? null;
    };

    post = async (payload: Partial<IDiscount>): Promise<string | number | null> => {
        if (!payload?.productId) return null;
        delete payload.id;
        const db = new LocalDb();
        const data: IDBValidKey = await db.create(DiscountSchema.name, payload);
        return data as number;
    };

    put = async (payload: Partial<IDiscount>): Promise<string | number | null> => {
        if (!payload?.productId) return null;
        if (!payload?.id) return null;
        if (payload.id < 1) return null;

        const db = new LocalDb();
        const data = await db.put(DiscountSchema.name, payload);
        return data as number;
    };

    remove = async (payload: Partial<IDiscount>): Promise<string | number | null> => {
        if (!payload?.productId) return null;
        if (!payload?.id) return null;
        if (payload.id < 1) return null;
        const db = new LocalDb();
        await db.delete(DiscountSchema.name, payload.id);
        return payload.id;
    };
}

const tblPosDiscount = {
    get: new tblDiscount().get,
    post: new tblDiscount().post,
    put: new tblDiscount().put,
    remove: new tblDiscount().remove,
    search: new tblDiscount().search,
};
export default tblPosDiscount; 

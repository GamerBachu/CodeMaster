import LocalDb from "./localDb/LocalDb.ts";
import { type ISpecifications, SpecificationsSchema } from "./localDb/model/PosModel.ts";


const search = async (payload: Partial<ISpecifications>): Promise<ISpecifications[] | null> => {

    const db = new LocalDb();
    const data = await db.getAll<ISpecifications>(SpecificationsSchema.name);
    const result =
        data.filter((u: ISpecifications) =>
            u.productId === payload.productId
        ) ?? null;
    return result ?? null;
};

const get = async (payload: Partial<ISpecifications>): Promise<ISpecifications | null> => {
    if (!payload?.productId) return null;
    if (!payload?.id) return null;
    const db = new LocalDb();
    const data = await db.get<ISpecifications>(SpecificationsSchema.name, payload.id);
    return data ?? null;
};

const post = async (payload: Partial<ISpecifications>): Promise<string | number | null> => {
    if (!payload?.productId) return null;
    delete payload.id;
    const db = new LocalDb();
    const data: IDBValidKey = await db.create(SpecificationsSchema.name, payload);
    return data as number;
};

const put = async (payload: Partial<ISpecifications>): Promise<string | number | null> => {
    if (!payload?.productId) return null;
    if (!payload?.id) return null;
    if (payload.id < 1) return null;

    const db = new LocalDb();
    const data = await db.put(SpecificationsSchema.name, payload);
    return data as number;
};

const remove = async (payload: Partial<ISpecifications>): Promise<string | number | null> => {
    if (!payload?.productId) return null;
    if (!payload?.id) return null;
    if (payload.id < 1) return null;
    const db = new LocalDb();
    await db.delete(SpecificationsSchema.name, payload.id);
    return payload.id;
};

const tblPosSpecification = {
    get,
    post,
    put,
    remove,
    search,
};
export default tblPosSpecification;  
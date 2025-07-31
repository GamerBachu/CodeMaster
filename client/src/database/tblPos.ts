import LocalDb from "./localDb/LocalDb";
import { type IProduct, type IProductIdModel, ProductSchema, ProductIdSchema } from "./localDb/model/PosModel";



export class tblProduct {

    getByProductId = async (productId: string): Promise<IProductIdModel | null> => {
        const db = new LocalDb();
        const data = await db.getAll<IProductIdModel>(ProductIdSchema.name);
        const result =
            data.find((u: IProductIdModel) =>
                u.productId === productId
            ) ?? null;
        return result;
    };

    get = async (productId: string): Promise<IProduct | undefined> => {
        const db = new LocalDb();
        const data = await db.get<IProduct>(ProductSchema.name, productId);
        return data;
    };

    post = async (payload: IProduct, subPayload: Partial<IProductIdModel>): Promise<string | number | null> => {

        const db = new LocalDb();

        subPayload.createdDate = new Date().toUTCString();

        subPayload.updatedDate = new Date().toUTCString();
        subPayload.updatedBy = 0;
        subPayload.deletedDate = new Date().toUTCString();
        subPayload.deletedBy = 0;
        subPayload.isActive = true;

        const parent: IDBValidKey = await db.create(ProductIdSchema.name, subPayload);
        subPayload.id = Number(parent);
        subPayload.productId = this.createProductId(payload, subPayload);
        payload.productId = subPayload.productId;

        await db.put(ProductIdSchema.name, subPayload);

        const data: IDBValidKey = await db.create(ProductSchema.name, payload);
        return data as string;
    };

    put = async (payload: Partial<IProduct>): Promise<string | number | null> => {
        if (!payload?.productId) return null;
        const db = new LocalDb();
        const data = await db.get<IProduct>(ProductSchema.name, payload?.productId);
        if (!data) return null;

        data.productName = payload.productName ?? data.productName;
        data.shortDescription = payload.shortDescription ?? data.shortDescription;
        data.description = payload.description ?? data.description;
        data.sku = payload.sku ?? data.sku;
        data.price = payload.price ?? data.price;
        data.status = payload.status ?? data.status;
        data.liveDate = payload.liveDate ?? data.liveDate;


        const resultId = await db.put(ProductSchema.name, data);
        return resultId as string;
    };

    // remove = async (user: ActionStatusModel): Promise<string | number | null> => {
    //     if (!user?.id) return null;
    //     const db = new LocalDb();
    //     await db.delete(ActionStatus.name, user.id);
    //     return user.id;
    // };

    search = async (): Promise<IProduct[] | null> => {

        const db = new LocalDb();
        const data = await db.getAll<IProduct>(ProductSchema.name);
        return data ?? null;
    };

    createProductId(payload: IProduct, subPayload: Partial<IProductIdModel>): string {

        const createdDate = new Date(subPayload.createdDate ?? new Date());
        const id = subPayload.id ?? 0;
        const sku = payload?.sku.length > 3 ? payload?.sku.slice(0, 3) : "";
        const name = payload?.productName.length > 3 ? payload?.sku.slice(0, 1) : "";


        const dd = String(createdDate.getDate()).padStart(2, '0');
        const yy = String(createdDate.getFullYear()).slice(-2);

        // Deterministic pseudo-random number (hash of id + date)
        const baseStr = `${id}${createdDate.getTime()}`;
        let hash = 0;
        for (let i = 0; i < baseStr.length; i++) {
            hash = ((hash << 5) - hash) + baseStr.charCodeAt(i);
            hash = hash & 0x7FFFFFFF; // keep positive
        }
        // Get 7 digits from hash
        const pseudoRandom = String(hash).padStart(7, '0').slice(0, 7);


        const idStr = String(id).padStart(4, '0');

        return (`${name}${dd}${yy}${sku}${pseudoRandom}${idStr}`).toUpperCase();

    }
};

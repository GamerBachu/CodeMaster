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

    get = async (productId: string): Promise<IProduct | null> => {
        const db = new LocalDb();
        const result = await db.getAll<IProduct>(ProductSchema.name);
        const data = result.find((f: IProduct) => f.productId === productId) ?? null;
       
        return data;
    };

    post = async (payload: Partial<IProduct>, parentPayload: Partial<IProductIdModel>): Promise<string | number | null> => {

        const db = new LocalDb();

        parentPayload.createdDate = new Date().toUTCString();

        parentPayload.updatedDate = new Date().toUTCString();
        parentPayload.updatedBy = 0;
        parentPayload.deletedDate = new Date().toUTCString();
        parentPayload.deletedBy = 0;
        parentPayload.isActive = true;

        const parentId: IDBValidKey = await db.create(ProductIdSchema.name, parentPayload);
        parentPayload.id = Number(parentId);
        parentPayload.productId = this.createProductId(payload, parentPayload);
        payload.productId = parentPayload.productId;

        await db.put(ProductIdSchema.name, parentPayload);

        await db.create(ProductSchema.name, payload);
        return parentPayload.productId as string;
    };

    put = async (payload: Partial<IProduct>): Promise<string | number | null> => {
        if (!payload?.productId) return null;
        if (!payload?.id) return null;

        const db = new LocalDb();
        const data = await db.get<IProduct>(ProductSchema.name, payload?.id);
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

    createProductId(payload: Partial<IProduct>, subPayload: Partial<IProductIdModel>): string {

        const createdDate = new Date(subPayload.createdDate ?? new Date());
        const id = subPayload.id ?? 0;

        const sku = this.truncateString(payload?.sku, 3);
        const name = this.truncateString(payload?.productName, 2);


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
        const pseudoRandom = String(hash).padStart(5, '0').slice(0, 7);


        const idStr = String(id).padStart(4, '0');

        return (`${name}${dd}${yy}${sku}${pseudoRandom}${idStr}`).toUpperCase();

    }

    truncateString(str: string | undefined, maxLength: number) {
        if (!str) return "";
        else if (str.length <= maxLength) {
            return str;
        } else {
            return str.slice(0, maxLength);
        }
    }
};

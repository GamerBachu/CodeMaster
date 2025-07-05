import LocalDb from "./localDb/LocalDb";
import { type ActionStatusModel, ActionStatus } from "./localDb/model/ActionStatusModel";


const get = async (user: Partial<ActionStatusModel>): Promise<ActionStatusModel | null> => {
    if (!user?.id) return null;
    const db = new LocalDb();
    const data = await db.getAll<ActionStatusModel>(ActionStatus.name);
    return data.find((u: ActionStatusModel) => u.id === user.id) ?? null;
};

const post = async (user: ActionStatusModel): Promise<string | number | null> => {
    user.createdDate = new Date();
    const db = new LocalDb();
    const data: IDBValidKey = await db.create(ActionStatus.name, user);
    return data as number;
};

const put = async (user: ActionStatusModel): Promise<string | number | null> => {
    if (!user?.id) return null;
    const db = new LocalDb();
    const data = await db.put(ActionStatus.name, user);
    return data as number;
};

const remove = async (user: ActionStatusModel): Promise<string | number | null> => {
    if (!user?.id) return null;
    const db = new LocalDb();
    await db.delete(ActionStatus.name, user.id);
    return user.id;
};

const search = async (user: Partial<ActionStatusModel>): Promise<ActionStatusModel[] | null> => {

    const db = new LocalDb();
    const data = await db.getAll<ActionStatusModel>(ActionStatus.name);
    return data ?? null;
};


const tblActionStatus = {
    get,
    post,
    put,
    remove,
    search
};
export default tblActionStatus;
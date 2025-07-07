import LocalDb from "./localDb/LocalDb.ts";
import { type UserPlannerModel, UserPlanner } from "./localDb/model/UserPlannerModel.ts";


const search = async (user: Partial<UserPlannerModel>): Promise<UserPlannerModel[] | null> => {

    const db = new LocalDb();
    const data = await db.getAll<UserPlannerModel>(UserPlanner.name);
    return data ?? null;
};

const get = async (user: Partial<UserPlannerModel>): Promise<UserPlannerModel | null> => {
    if (!user?.id) return null;
    const db = new LocalDb();
    const data = await db.get<UserPlannerModel>(UserPlanner.name, user.id);
    return data ?? null;
};

const post = async (user: UserPlannerModel): Promise<string | number | null> => {
    user.createdDate = new Date();
    const db = new LocalDb();
    const data: IDBValidKey = await db.create(UserPlanner.name, user);
    return data as number;
};

const put = async (user: UserPlannerModel): Promise<string | number | null> => {
    if (!user?.id) return null;
    const db = new LocalDb();
    const data = await db.put(UserPlanner.name, user);
    return data as number;
};

const remove = async (user: Partial<UserPlannerModel>): Promise<string | number | null> => {
    if (!user?.id) return null;
    const db = new LocalDb();
    await db.delete(UserPlanner.name, user.id);
    return user.id;
};

const tblUserPlanner = {
    get,
    post,
    put,
    remove,
    search,
};
export default tblUserPlanner; 

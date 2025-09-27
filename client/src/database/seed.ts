import ActionStatusMaster from "./localDb/master/ActionStatusMaster";
import tblActionStatus from "./tblActionStatus";
import PosSpecificationMaster from "./localDb/master/PosSpecificationMaster";
import { tblProduct } from "./tblPos";

const seed = () => {

    ActionStatusMaster.forEach(async (actionStatus) => {
        try {
            await tblActionStatus.post(actionStatus);
        } catch (error) {
            console.error("Error seeding ActionStatus:", error);
        }
    });
    
    PosSpecificationMaster.forEach(async (item) => {
        try {
            const d = new tblProduct();
            d.postSpecificationMaster(item);
        } catch (error) {
            console.error("Error seeding ActionStatus:", error);
        }
    });


};

export default seed;
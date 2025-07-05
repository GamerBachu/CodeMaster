import ActionStatusMaster from "./localDb/master/ActionStatusMaster";
import tblActionStatus from "./tblActionStatus";

const seed = () => {

    ActionStatusMaster.forEach(async (actionStatus) => {
        try {
            await tblActionStatus.post(actionStatus);
        } catch (error) {
            console.error("Error seeding ActionStatus:", error);
        }
    });
};

export default seed;
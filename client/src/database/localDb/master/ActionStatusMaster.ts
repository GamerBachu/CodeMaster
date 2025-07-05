import type { ActionStatusModel } from "../model/ActionStatusModel";

 

const ActionStatusMaster:ActionStatusModel[] = [

    {id:1 ,  name: "Pending", isActive: true,createdDate: new Date()},
    {id:1 ,  name: "In Progress", isActive: true,createdDate: new Date()},
    {id:1 ,  name: "Completed", isActive: true,createdDate: new Date()},
    {id:1 ,  name: "Not Done", isActive: true,createdDate: new Date()},
    {id:1 ,  name: "Cancel", isActive: true,createdDate: new Date()},

]

export default ActionStatusMaster;
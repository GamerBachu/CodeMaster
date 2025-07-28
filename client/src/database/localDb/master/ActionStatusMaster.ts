import type { ActionStatusModel } from "../model/ActionStatusModel";



const ActionStatusMaster: ActionStatusModel[] = [

    { id: 1, name: "Pending", isActive: true, createdDate: new Date().toISOString() },
    { id: 2, name: "In Progress", isActive: true, createdDate: new Date().toISOString() },
    { id: 3, name: "Completed", isActive: true, createdDate: new Date().toISOString() },
    { id: 4, name: "Not Done", isActive: true, createdDate: new Date().toISOString() },
    { id: 5, name: "Cancel", isActive: true, createdDate: new Date().toISOString() },
    { id: 6, name: "On Hold", isActive: true, createdDate: new Date().toISOString() },
    { id: 7, name: "Postponed", isActive: true, createdDate: new Date().toISOString() },
    { id: 8, name: "Failed", isActive: true, createdDate: new Date().toISOString() },
    { id: 9, name: "Success", isActive: true, createdDate: new Date().toISOString() },
    { id: 10, name: "Draft", isActive: true, createdDate: new Date().toISOString() },
    { id: 11, name: "Reviewed", isActive: true, createdDate: new Date().toISOString() },
    { id: 12, name: "Approved", isActive: true, createdDate: new Date().toISOString() },
    { id: 13, name: "Rejected", isActive: true, createdDate: new Date().toISOString() },
    { id: 14, name: "Archived", isActive: true, createdDate: new Date().toISOString() },
    { id: 15, name: "Scheduled", isActive: true, createdDate: new Date().toISOString() },
    { id: 16, name: "In Review", isActive: true, createdDate: new Date().toISOString() },
    { id: 17, name: "Awaiting Approval", isActive: true, createdDate: new Date().toISOString() },
    { id: 18, name: "Under Investigation", isActive: true, createdDate: new Date().toISOString() },
    { id: 19, name: "Escalated", isActive: true, createdDate: new Date().toISOString() },
    { id: 20, name: "Resolved", isActive: true, createdDate: new Date().toISOString() },
    { id: 21, name: "Cancelled", isActive: true, createdDate: new Date().toISOString() },
    { id: 22, name: "In Review", isActive: true, createdDate: new Date().toISOString() },
    { id: 23, name: "Awaiting Feedback", isActive: true, createdDate: new Date().toISOString() },
    { id: 23, name: "To Be Live", isActive: true, createdDate: new Date().toISOString() },
    { id: 23, name: "Live", isActive: true, createdDate: new Date().toISOString() },


];

export default ActionStatusMaster;
import appRoute from "../../routes/appRoute";

const actionLink = [
    {
        id: 10,
        path: appRoute.DASHBOARD.path,
        value: appRoute.DASHBOARD.value,
        active: true,
    },
    {
        id: 20,
        path: appRoute.PLAN_Action.path + "/list",
        value: appRoute.PLAN_Action.value,
        active: false,
    },
    {
        id: 30,
        path: appRoute.POS_Action.path + "/list",
        value: appRoute.POS_Action.value,
        active: false,
    },
    {
        id: 80,
        path: appRoute.PROFILE.path,
        value: appRoute.PROFILE.value,
        active: false,
    },
    {
        id: 90,
        path: appRoute.DASHBOARD.path,
        value: appRoute.DASHBOARD.value,
        active: false,
    },
    {
        id: 290,
        path: appRoute.SAMPLE_CANVAS.path,
        value: appRoute.SAMPLE_CANVAS.value,
        active: false,
    },
    {
        id: 190,
        path: appRoute.Universe_Canvas.path,
        value: appRoute.Universe_Canvas.value,
        active: false,
    },
];
export default actionLink;
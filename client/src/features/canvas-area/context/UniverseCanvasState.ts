
import { generateGuidV2, getDateString, type IUniverseCanvasState, type IUniverseData } from "../interfaces";

const universe: IUniverseData[] = [
    {
        id: generateGuidV2(),
        name: "Room-1",
        updatedAt: getDateString(),
        updatedBy: "user-1",

        shapes: []
    },
    {
        id: generateGuidV2(),
        name: "Room-2",
        updatedAt: getDateString(),
        updatedBy: "user-1",

        shapes: []
    },

];


const initialUniverseCanvasState: IUniverseCanvasState = {
    universe: universe,
    konvaStage: undefined,
    konvaLayer: undefined,
};

export default initialUniverseCanvasState;





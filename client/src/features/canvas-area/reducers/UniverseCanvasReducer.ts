import type { IUniverseCanvasState } from "../interfaces";
import type { UniverseCanvasAction } from "../context/UniverseCanvasAction";

import { setUniverseName } from "./handlers/setUniverseName";
import { setKonvaStage } from "./handlers/setKonvaStage";
import { setKonvaLayer } from "./handlers/setKonvaLayer";
import { deleteUniverseArea } from "./handlers/deleteUniverseArea";
import { addUniverseArea } from "./handlers/addUniverseArea";

function UniverseCanvasReducer(state: IUniverseCanvasState, action: UniverseCanvasAction): IUniverseCanvasState {
    switch (action.type) {

        case 'SET_KONVA_STAGE': return setKonvaStage(state, action.payload);
        case 'SET_KONVA_LAYER': return setKonvaLayer(state, action.payload);

        case 'SET_UNIVERSE_NAME': return setUniverseName(state, action.payload);
        case 'DELETE_UNIVERSE_AREA': return deleteUniverseArea(state, action.payload);
        case 'ADD_UNIVERSE_AREA': return addUniverseArea(state, action.payload);



        default: return state;
    }
}

export default UniverseCanvasReducer;

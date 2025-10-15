import type { IUniverseCanvasState } from "../interfaces";
import type { UniverseCanvasAction } from "./UniverseCanvasAction";

function UniverseCanvasReducer(state: IUniverseCanvasState, action: UniverseCanvasAction): IUniverseCanvasState {
    switch (action.type) {
        case 'SET_PAGE_DATA':
            return { ...state, };
        case 'SET_KONVA_STAGE':
            return { ...state, konvaStage: action.payload };
        case 'SET_KONVA_LAYER':
            return { ...state, konvaLayer: action.payload };
        default:
            return state;
    }
}

export default UniverseCanvasReducer;

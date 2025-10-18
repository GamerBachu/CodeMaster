import type { IUniverseCanvasState } from "../../interfaces";
import type Konva from "konva";
export function setKonvaStage(state: IUniverseCanvasState, payload: Konva.Stage): IUniverseCanvasState {
    if (payload) {
        return { ...state, konvaStage: payload };
    }
    return state;
}
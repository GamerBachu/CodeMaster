import type { IUniverseCanvasState } from "../../interfaces";
import type Konva from "konva";
export function setKonvaLayer(state: IUniverseCanvasState, payload: Konva.Layer): IUniverseCanvasState {
    if (payload) {
        return { ...state, konvaLayer: payload };
    }
    return state;
}
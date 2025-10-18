import { getDateString, type IUniverseArea, type IUniverseCanvasState, type IUniverseData } from "../../interfaces";

export function addUniverseArea(state: IUniverseCanvasState, payload: IUniverseArea): IUniverseCanvasState {
    const universe = state.universe;
    const newUniverse: IUniverseData = {
        id: payload.id,
        name: payload.name,
        updatedAt: getDateString(),
        updatedBy: "user-1",
        shapes: []
    };
    universe.push(newUniverse);
    return { ...state, universe: universe };
}

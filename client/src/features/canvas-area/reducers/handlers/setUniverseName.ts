import type { IUniverseArea, IUniverseCanvasState } from "../../interfaces";

export function setUniverseName(state: IUniverseCanvasState, payload: IUniverseArea): IUniverseCanvasState {
    const universe = state.universe;
    const idx = universe.findIndex(p => p.id === payload.id);
    if (idx === -1) return state;
    if (universe[idx].name === payload.name) return state;
    // Ensure payload.name is a string
    if (typeof payload.name !== 'string') return state;
    universe[idx].name = payload.name;
    return { ...state, universe: universe };
}

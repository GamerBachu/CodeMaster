import type { IUniverseArea, IUniverseCanvasState } from "../../interfaces";

export function deleteUniverseArea(state: IUniverseCanvasState, payload: IUniverseArea): IUniverseCanvasState {
    const universe = state.universe;
    if (universe.length === 1) return state;
    const idx = universe.findIndex(p => p.id === payload.id);
    if (idx === -1) return state;
    universe.splice(idx, 1);
    return { ...state, universe: universe };
} 
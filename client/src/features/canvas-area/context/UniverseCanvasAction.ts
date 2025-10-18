import type Konva from "konva";
import type { IUniverseArea } from "../interfaces";



export type UniverseCanvasAction =

    | { type: 'SET_KONVA_STAGE'; payload: Konva.Stage; }
    | { type: 'SET_KONVA_LAYER'; payload: Konva.Layer; }
    | { type: 'SET_UNIVERSE_NAME'; payload: IUniverseArea; }
    | { type: 'ADD_UNIVERSE_AREA'; payload: IUniverseArea; }
    | { type: 'DELETE_UNIVERSE_AREA'; payload: IUniverseArea; }
    ;




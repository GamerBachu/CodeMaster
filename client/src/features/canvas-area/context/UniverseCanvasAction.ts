import type Konva from "konva";
import type { universeData } from "../interfaces";

 


export type UniverseCanvasAction =
    | { type: 'SET_PAGE_DATA'; payload: universeData; }
    | { type: 'SET_KONVA_STAGE'; payload: Konva.Stage; }
    | { type: 'SET_KONVA_LAYER'; payload: Konva.Layer; };



 
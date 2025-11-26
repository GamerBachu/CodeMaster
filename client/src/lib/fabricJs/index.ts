import init from "./init";
import { loadCanvas } from "./load";
import { saveCanvas } from "./save";
import { clearCanvas } from "./clear";
import type { IFabricCanvasObject } from "./interface";
import CanvasScroll from "./CanvasScroll";
import getCenterPoint from "./getCenterPoint";

export {
    init,
    saveCanvas,
    loadCanvas,
    clearCanvas,
    getCenterPoint,


    // jsx components
    CanvasScroll,
};
export type { IFabricCanvasObject };

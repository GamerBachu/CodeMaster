import init from "./init";
import { loadCanvas } from "./load";
import { saveCanvas } from "./save";
import { clearCanvas } from "./clear";
import type { IFabricCanvasObject } from "./interface";
import CanvasScroll from "./CanvasScroll";
import getCenterPoint from "./getCenterPoint";
import resizeCanvas from "./resizeCanvas";

export {
    init,
    saveCanvas,
    loadCanvas,
    clearCanvas,
    getCenterPoint,
    resizeCanvas,

    // jsx components
    CanvasScroll,
};
export type { IFabricCanvasObject };

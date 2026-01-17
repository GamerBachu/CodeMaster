import type { Canvas } from "fabric";
import type { IFabricCanvasObject } from "./interface";

/**
 * Asynchronously loads JSON data onto a Fabric.js canvas.
 *
 * @param canvas The Fabric.js canvas instance to load the data onto.
 * @param json The JSON string representing the canvas content.
 * @returns A promise that resolves when the JSON is loaded and the canvas is rendered.
 */
export const loadCanvas = async (canvas: Canvas, json: IFabricCanvasObject): Promise<void> => {
    return new Promise((resolve) => {
        canvas.clear();
        canvas.loadFromJSON(json, () => {
            canvas.requestRenderAll();
            resolve();
        });
    });
};

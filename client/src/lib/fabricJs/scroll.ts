import { Canvas } from "fabric";
import { config } from "./Config";

export const scrollHorizontal = (canvas: Canvas, scroll: number): void => {

    canvas.viewportTransform![4] = -scroll;
    canvas.renderAll();

};

export const scrollVertical = (canvas: Canvas, scroll: number): void => {

    canvas.viewportTransform![5] = -scroll;
    canvas.renderAll();

};

export const scrollRefresh = (width: number, height: number, zoom: number) => {

    const { minZoom, zoomRatioMultiplier } = config.zoom;
    const newWidth = width;
    const newHeight = height;

    const currentSegment = (zoom * zoomRatioMultiplier) / minZoom;

    const newScrollbarWidth = Math.trunc(Math.floor(newWidth * currentSegment));

    const newScrollbarHeight = Math.trunc(Math.floor(newHeight * currentSegment));
    return { newScrollbarWidth, newScrollbarHeight };

};


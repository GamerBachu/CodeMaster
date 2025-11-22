import { Canvas } from "fabric";
import { canvasConfig, config } from "./Config";


const init = (element: HTMLCanvasElement, width: number, height: number) => {
    return new Canvas(element, {
        ...canvasConfig,
        width: width - config.scrollMargin.width,
        height: height -  config.scrollMargin.height,
    });
};

export default init;

import { Canvas,InteractiveFabricObject } from "fabric";
import { canvasConfig, config } from "./Config";


const init = (element: HTMLCanvasElement, width: number, height: number) => {
    InteractiveFabricObject.ownDefaults={
        ...InteractiveFabricObject.ownDefaults,
        borderColor: config.controls.borderColor,
        cornerColor: config.controls.cornerColor,
        cornerSize: config.controls.cornerSize
    };



    return new Canvas(element, {
        ...canvasConfig,
        width: width - config.scrollMargin.width,
        height: height -  config.scrollMargin.height,
        
    });
};

export default init;

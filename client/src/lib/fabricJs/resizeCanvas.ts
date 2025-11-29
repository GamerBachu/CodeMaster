import { Canvas } from "fabric";

const resizeCanvas = (canvas: Canvas, width: number, height: number): void => {

    canvas.setDimensions({ width, height });    
    canvas.renderAll();

};

export default resizeCanvas;
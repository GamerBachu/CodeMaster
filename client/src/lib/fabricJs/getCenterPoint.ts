import { Canvas, Point } from "fabric";

const getCenterPoint = (canvas: Canvas | undefined) => {

    if (canvas === undefined) {
        return new Point(0, 0);
    }
    const centerPoint = canvas.getVpCenter();


    return centerPoint;
};

export default getCenterPoint; 
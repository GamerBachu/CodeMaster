
import Konva from "konva";
import type { IKonvaStageObject } from "../interfaces";
export const canvasImport = (konvaLayer: Konva.Layer, data: IKonvaStageObject[]): boolean => {

    return false;

};

export const canvasExport = (konvaLayer: Konva.Layer | null): IKonvaStageObject => {

    const abc = konvaLayer?.toObject();
    console.log("abc", abc);

};
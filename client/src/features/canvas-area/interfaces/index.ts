import type Konva from "konva";

export interface IAccordionData {
    id: string;
    title: string;
    src: string;
    description: string;
    alt: string;
    keyword: string;
}
export interface IAccordion {
    id: string;
    title: string;
    open: boolean;
    content: IAccordionData[];
}



export interface universeData {
    id: string;
    name: string;
    updatedAt: string;
    updatedBy: string;
    shapes: any[];
}

export interface IUniverseCanvasState {
    universe: universeData[];
    konvaStage: Konva.Stage | undefined;
    konvaLayer: Konva.Layer | undefined;
}
import type Konva from "konva";


import { generateGuidV2 } from "../../../utils/helper/guid";
export { generateGuidV2 };

import { getDateString } from "../../../utils/helper/dateUtils";
export { getDateString };

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

export interface IUniverseArea {
    id: string;
    name: string;
    isActive: boolean;
}


export interface IUniverseData {
    id: string;
    name: string;
    updatedAt: string;
    updatedBy: string;
    shapes: any[];
}

export interface IUniverseCanvasState {
    universe: IUniverseData[];
    konvaStage: Konva.Stage | undefined;
    konvaLayer: Konva.Layer | undefined;
}
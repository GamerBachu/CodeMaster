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



export interface IUniverseCanvasContext {
    refresh?: string;
    isCanvasReady: boolean;
    konvaStage: React.RefObject<Konva.Stage>;
    konvaLayer: React.RefObject<Konva.Layer>;
    universeData: React.RefObject<IUniverseData[]>;
    initializeCanvas: (stage: Konva.Stage, layer: Konva.Layer) => void;
    initializeUniverse: (data: IUniverseData[]) => void;
    forceRefresh: (event: string) => void;
    addUniverseArea: (area: IUniverseData) => void;
    renameUniverseArea: (area: IUniverseData) => void;
    deleteUniverseArea: (area: IUniverseData) => void;
    changeUniverseArea: (fromId: IUniverseData["id"], toId: IUniverseData["id"]) => boolean;

}


export type IKonvaStageObject = {
    attrs: Record<string, never>;
    className: string;
    children?: IKonvaStageObject[];
};


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
    stage: IKonvaStageObject[];
}

export interface IUniverseCanvasState {
    universe: IUniverseData[];
    konvaStage: Konva.Stage | undefined;
    konvaLayer: Konva.Layer | undefined;
}


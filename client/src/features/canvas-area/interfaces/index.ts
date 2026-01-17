


import { generateGuidV2 } from "../../../utils/helper/guid";
export { generateGuidV2 };

import { getDateString } from "../../../utils/helper/dateUtils";
import type { Canvas } from "fabric";
import type { IFabricCanvasObject } from "../../../lib/fabricJs";
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

    isCanvasReady: boolean;
    canvas: React.RefObject<undefined | Canvas>;
    universeData: React.RefObject<IUniverseData[]>;

    initializeCanvas: (element: HTMLCanvasElement, width: number, height: number) => void;
    initializeUniverse: (data: IUniverseData[]) => void;

    addUniverseArea: (area: IUniverseData) => void;
    renameUniverseArea: (area: IUniverseData) => void;
    deleteUniverseArea: (area: IUniverseData) => void;
    changeUniverseArea:  (fromId: string, toId: string) => Promise<boolean>;

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
    stage: IFabricCanvasObject | null | undefined;
}



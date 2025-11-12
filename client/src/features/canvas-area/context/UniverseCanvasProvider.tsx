import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { UniverseCanvasContext } from "./UniverseCanvasContext";
import Konva from "konva";
import type { IUniverseCanvasContext, IUniverseData } from "../interfaces";
import {
    addUniverseAreaAction,
    removeUniverseAreaAction,
    updateUniverseAreaAction
} from "../reducers/handlers/index";
import { canvasExport } from "../utils/canvasData";

interface UniverseCanvasProviderProps {
    children: ReactNode;
}

export const UniverseCanvasProvider = ({
    children,
}: UniverseCanvasProviderProps) => {
    const [refresh, setRefresh] = useState<string | undefined>(undefined);
    const [isCanvasReady, setIsCanvasReady] = useState(false);

    // Initialize refs with non-null assertions since they will be set in initializeCanvas
    const konvaStage = useRef<Konva.Stage | null>(null);
    const konvaLayer = useRef<Konva.Layer | null>(null);
    const universeData = useRef<IUniverseData[]>([]);

    const initializeCanvas = useCallback(
        (stage: Konva.Stage, layer: Konva.Layer) => {
            if (konvaStage.current && konvaLayer.current) return;
            konvaStage.current = stage;
            konvaLayer.current = layer;
            setIsCanvasReady(true);
        },
        []
    );

    const initializeUniverse = useCallback((data: IUniverseData[]) => {
        universeData.current = data;
    }, []);

    const forceRefresh = useCallback((event: string) => {
        setRefresh(event);
    }, []);

    const addUniverseArea = useCallback((area: IUniverseData) => { addUniverseAreaAction(universeData.current, area); }, []);
    const deleteUniverseArea = useCallback((area: IUniverseData) => { removeUniverseAreaAction(universeData.current, area); }, []);
    const renameUniverseArea = useCallback((area: IUniverseData) => { updateUniverseAreaAction(universeData.current, area, 1); }, []);

    const changeUniverseArea = useCallback((fromId: IUniverseData["id"], toId: IUniverseData["id"]): boolean => {


        const fromIndex = universeData.current.findIndex((area) => area.id === fromId);
        if (fromIndex > -1) {
            const abc = konvaLayer.current?.toObject().children;
            if (abc) {
                console.log("save", abc);
                universeData.current[fromIndex].stage = abc;
            }
        }

        const toIndex = universeData.current.findIndex((area) => area.id === toId);
        if (toIndex > -1) {
            const toArea = universeData.current[toIndex].stage;
            console.log("load", toArea);
            // Clear the layer
            konvaLayer.current?.destroyChildren();
            // Load shapes from toArea
            if (Array.isArray(toArea)) {
                for (const shape of toArea) {
                    const currentShape = Konva.Node.create(shape);
                    currentShape.draggable(true);
                    konvaLayer.current?.add(currentShape);
                }
                konvaLayer.current?.batchDraw();
            }
        }
        return true;
    }, [konvaLayer]);

    const value = useMemo<IUniverseCanvasContext>(
        () => ({
            refresh,
            forceRefresh,
            isCanvasReady,
            konvaStage: konvaStage as React.RefObject<Konva.Stage>,
            konvaLayer: konvaLayer as React.RefObject<Konva.Layer>,
            universeData,
            initializeCanvas,
            initializeUniverse,
            addUniverseArea,
            renameUniverseArea,
            deleteUniverseArea,
            changeUniverseArea,
        }),
        [
            refresh,
            forceRefresh,
            isCanvasReady,
            initializeCanvas,
            initializeUniverse,
            addUniverseArea,
            renameUniverseArea,
            deleteUniverseArea,
            changeUniverseArea,
        ]
    );

    return (
        <UniverseCanvasContext.Provider value={value}>
            {children}
        </UniverseCanvasContext.Provider>
    );
};

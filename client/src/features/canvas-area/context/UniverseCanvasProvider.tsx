import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { UniverseCanvasContext } from "./UniverseCanvasContext";
import type Konva from "konva";
import type {

    IUniverseCanvasContext,
    IUniverseData,
} from "../interfaces";

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

    const addUniverseArea = useCallback((area: IUniverseData) => {
        universeData.current.push(area);
    }, []);

    const renameUniverseArea = useCallback((area: IUniverseData) => {
        const index = universeData.current.findIndex((item) => item.id === area.id);
        if (index === -1) return;
        universeData.current[index].name = area.name;
        universeData.current[index].updatedAt = area.updatedAt;
        universeData.current[index].updatedBy = area.updatedBy;
    }, []);

    const deleteUniverseArea = useCallback((area: IUniverseData) => {
        const index = universeData.current.findIndex((item) => item.id === area.id);
        if (index === -1) return;
        universeData.current.splice(index, 1);
    }, []);

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
        ]
    );

    return (
        <UniverseCanvasContext.Provider value={value}>
            {children}
        </UniverseCanvasContext.Provider>
    );
};

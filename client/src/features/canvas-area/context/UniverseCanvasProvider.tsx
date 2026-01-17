import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { UniverseCanvasContext } from "./UniverseCanvasContext";
import { Canvas } from "fabric";

import type { IUniverseCanvasContext, IUniverseData } from "../interfaces";
import {
    addUniverseAreaAction,
    removeUniverseAreaAction,
    updateUniverseAreaAction,
} from "../reducers/handlers/index";
import { init, loadCanvas, saveCanvas, clearCanvas } from "../../../lib/fabricJs";

interface UniverseCanvasProviderProps {
    children: ReactNode;
}

export const UniverseCanvasProvider = ({
    children,
}: UniverseCanvasProviderProps) => {
    const [refresh, setRefresh] = useState<string | undefined>(undefined);
    const [isCanvasReady, setIsCanvasReady] = useState(false);

    const universeData = useRef<IUniverseData[]>([]);

    const canvas = useRef<undefined | Canvas>(undefined);
    const handler = useRef<undefined | null>(null);
    const history = useRef<undefined | null>(null);

    const initializeCanvas = useCallback((element: HTMLCanvasElement, width: number, height: number) => {
        if (canvas.current) return;
        canvas.current = init(element, width, height);
        setIsCanvasReady(true);
    }, []);

    const initializeUniverse = useCallback((data: IUniverseData[]) => {
        universeData.current = data;
    }, []);

    const forceRefresh = useCallback((event: string) => {
        setRefresh(event);
    }, []);

    const addUniverseArea = useCallback((area: IUniverseData) => {
        addUniverseAreaAction(universeData.current, area);
    }, []);
    const deleteUniverseArea = useCallback((area: IUniverseData) => {
        removeUniverseAreaAction(universeData.current, area);
    }, []);
    const renameUniverseArea = useCallback((area: IUniverseData) => {
        updateUniverseAreaAction(universeData.current, area, 1);
    }, []);


    const changeUniverseArea = useCallback(async (fromId: string, toId: string): Promise<boolean> => {

        if (!canvas.current) return false;

        const fromIndex = universeData.current.findIndex((area) => area.id === fromId);

        if (fromIndex > -1) {
            const A = await saveCanvas(canvas.current);
            universeData.current[fromIndex].stage = A;

        }
        clearCanvas(canvas.current);

        const toIndex = universeData.current.findIndex((area) => area.id === toId);
        if (toIndex > -1) {
            const toArea = universeData.current[toIndex].stage;
            if (toArea === undefined || toArea === null) return false;

            await loadCanvas(canvas.current, toArea).then(() => {

                // setTimeout(() => {
                //     canvas.current?.renderAll();
                // }, 2000);
                return true;
            }).catch(() => {

                return false;
            });
        }
        return false;
    }, []);

    const value = useMemo<IUniverseCanvasContext>(
        () => ({
            isCanvasReady,
            canvas,
            universeData,

            initializeCanvas,
            initializeUniverse,

            addUniverseArea,
            renameUniverseArea,
            deleteUniverseArea,
            changeUniverseArea,
        }),
        [
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

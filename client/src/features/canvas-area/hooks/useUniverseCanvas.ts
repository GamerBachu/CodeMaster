import { useContext } from "react";
import { UniverseCanvasContext } from "../context/UniverseCanvasContext";
import type { IUniverseCanvasContext } from "../interfaces";


const useUniverseCanvas = (): IUniverseCanvasContext => {
    const context: IUniverseCanvasContext | null = useContext(UniverseCanvasContext);
    if (!context) {
        throw new Error('Universe');
    }
    return context;
};
export default useUniverseCanvas; 
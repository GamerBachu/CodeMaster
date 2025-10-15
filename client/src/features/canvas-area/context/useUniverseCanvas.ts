import { useContext } from "react";
import UniverseCanvasContext from "./UniverseCanvasContext";


export function useUniverseCanvas() {
    const context = useContext(UniverseCanvasContext);
    if (!context) throw new Error('useCanvasArea must be used within CanvasAreaProvider');
    return context;
}
import { useContext } from "react";
import UniverseCanvasContext from "../context/UniverseCanvasContext";


function useUniverseCanvas() {
    const context = useContext(UniverseCanvasContext);
    if (!context) throw new Error('useCanvasArea must be used within CanvasAreaProvider');
    return context;
}

export default useUniverseCanvas; 
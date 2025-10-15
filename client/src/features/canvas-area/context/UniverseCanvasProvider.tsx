import { useReducer, type ReactNode } from "react";
import UniverseCanvasContext from "./UniverseCanvasContext";
import UniverseCanvasReducer from "./UniverseCanvasReducer";
import initialUniverseCanvasState from "./UniverseCanvasState";

export const UniverseCanvasProvider = ({ children }: { children: ReactNode; }) => {
    const [state, dispatch] = useReducer(UniverseCanvasReducer, initialUniverseCanvasState);

    console.log(state);



    return (
        <UniverseCanvasContext.Provider value={{ state, dispatch }}>
            {children}
        </UniverseCanvasContext.Provider>
    );
};
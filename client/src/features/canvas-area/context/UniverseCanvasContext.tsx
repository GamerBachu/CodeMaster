import { createContext } from "react";
import type { IUniverseCanvasState } from "../interfaces";
import type { UniverseCanvasAction } from "./UniverseCanvasAction";
import type { Dispatch } from "react";


const UniverseCanvasContext = createContext<{
    state: IUniverseCanvasState;
    dispatch: Dispatch<UniverseCanvasAction>;
} | undefined>(undefined);

export default UniverseCanvasContext;
import { createContext } from 'react';
import type { IUniverseCanvasContext } from '../interfaces';

export const UniverseCanvasContext = createContext<IUniverseCanvasContext | null>(null);
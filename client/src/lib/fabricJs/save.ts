import { Canvas } from 'fabric';
import type { IFabricCanvasObject } from './interface';

/**
 * Asynchronously serializes a fabric.Canvas instance to a JSON string.
 * @param {Canvas} canvas - The Fabric.js canvas instance to serialize.
 * @returns {Promise<string>} Resolves to the JSON string representation of the canvas.
 */
export async function saveCanvas(canvas: Canvas): Promise<IFabricCanvasObject | null | undefined> {
    // Serialize the canvas to JSON
    try {
        return canvas.toObject();;
    } catch (error) {
        // Handle serialization errors
        throw new Error('Failed to serialize canvas: ' + (error instanceof Error ? error.message : String(error)));
    }
}

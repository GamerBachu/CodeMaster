import React, { useEffect, useRef, useState } from 'react';
import { Canvas, Rect, Group, ActiveSelection, Object as FabricObject } from 'fabric';

const SampleCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvas, setCanvas] = useState<Canvas | null>(null);
    const [clipboard, setClipboard] = useState<FabricObject | null>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const newCanvas = new Canvas(canvasRef.current, {
                width: 800,
                height: 600,
                backgroundColor: '#f0f0f0',
            });
            setCanvas(newCanvas);

            return () => {
                newCanvas.dispose();
            };
        }
    }, []);

    const zoomIn = () => {
        if (canvas) {
            const zoom = canvas.getZoom() * 1.1;
            canvas.setZoom(zoom);
        }
    };

    const zoomOut = () => {
        if (canvas) {
            const zoom = canvas.getZoom() / 1.1;
            canvas.setZoom(zoom);
        }
    };

    const addRandomObject = () => {
        if (canvas) {
            const rect = new Rect({
                left: Math.random() * 750,
                top: Math.random() * 550,
                fill: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
                width: 50,
                height: 50,
            });
            canvas.add(rect);
        }
    };

    const saveToJson = () => {
        if (canvas) {
            const json = JSON.stringify(canvas.toDatalessJSON());
         
            // You can save this JSON to a file or send it to a server
        }
    };

    const loadFromJson = () => {
        if (canvas) {
            const json = prompt('Enter JSON');
            if (json) {
                canvas.loadFromJSON(json, () => {
                    canvas.renderAll();
                });
            }
        }
    };

    const copy = () => {
        if (canvas && canvas.getActiveObject()) {
            canvas.getActiveObject()?.clone((cloned: FabricObject) => {
                setClipboard(cloned);
            });
        }
    };

    const paste = () => {
        if (canvas && clipboard) {
            clipboard.clone((clonedObj: FabricObject) => {
                canvas.discardActiveObject();
                clonedObj.set({
                    left: clonedObj.left! + 10,
                    top: clonedObj.top! + 10,
                    evented: true,
                });
                if (clonedObj.type === 'activeSelection') {
                    // active selection needs a reference to the canvas.
                    const activeSelection = clonedObj as ActiveSelection;
                    activeSelection.canvas = canvas;
                    activeSelection.forEachObject((obj) => {
                        canvas.add(obj);
                    });
                    // this should solve the issue
                    activeSelection.setCoords();
                } else {
                    canvas.add(clonedObj);
                }
                setClipboard(clonedObj);
                canvas.setActiveObject(clonedObj);
                canvas.requestRenderAll();
            });
        }
    };


    const del = () => {
        if (canvas) {
            const activeObjects = canvas.getActiveObjects();
            if (activeObjects.length > 0) {
                activeObjects.forEach(obj => canvas.remove(obj));
                canvas.discardActiveObject();
                canvas.renderAll();
            }
        }
    };


    const group = () => {
        if (canvas && canvas.getActiveObject() && canvas.getActiveObject()?.type === 'activeSelection') {
            const activeSelection = canvas.getActiveObject() as ActiveSelection;
            activeSelection.toGroup();
            canvas.requestRenderAll();
        }
    };

    const ungroup = () => {
        if (canvas && canvas.getActiveObject() && canvas.getActiveObject()?.type === 'group') {
            const activeObject = canvas.getActiveObject() as Group;
            activeObject.toActiveSelection();
            canvas.requestRenderAll();
        }
    };

    const interactWithOutsideElement = () => {
        const outsideElement = document.getElementById('outside-element');
        if (outsideElement) {
            outsideElement.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        }
    }


    return (
        <div>
            <div>
                <button onClick={zoomIn}>Zoom In</button>
                <button onClick={zoomOut}>Zoom Out</button>
                <button onClick={addRandomObject}>Add Random Object</button>
                <button onClick={saveToJson}>Save to JSON</button>
                <button onClick={loadFromJson}>Load from JSON</button>
                <button onClick={copy}>Copy</button>
                <button onClick={paste}>Paste</button>
                <button onClick={del}>Delete</button>
                <button onClick={group}>Group</button>
                <button onClick={ungroup}>Ungroup</button>
                <button onClick={interactWithOutsideElement}>Interact</button>
            </div>
            <canvas ref={canvasRef} />
            <div id="outside-element" style={{ width: 100, height: 100, backgroundColor: 'red', marginTop: 10 }}></div>
        </div>
    );
};

export default SampleCanvas;
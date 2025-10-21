import React, { useEffect } from 'react';
import Konva from "konva";
import useUniverseCanvas from './hooks/useUniverseCanvas';
import type { IUniverseCanvasContext } from './interfaces';
import apiServices from "./apis";


const MainCanvas: React.FC = () => {

  const canvasElement = React.useRef<HTMLDivElement | null>(null);
  const { initializeCanvas, initializeUniverse, isCanvasReady, konvaLayer, konvaStage }: IUniverseCanvasContext = useUniverseCanvas();

  useEffect(() => {

    const canvasArea = canvasElement.current;
    if (!canvasArea) return;
    const width = canvasArea?.clientWidth ?? 0;
    const height = canvasArea?.clientHeight ?? 0;

    const stage = new Konva.Stage({
      container: canvasArea,
      width: width,
      height: height,
    });

    const layer = new Konva.Layer();

    stage.add(layer);

    initializeCanvas(stage, layer);

  }, [initializeCanvas]);


  useEffect(() => {

    apiServices.getData("a1s2").then((data) => {
      initializeUniverse(data);
    });

    setTimeout(() => {
      if (konvaStage && konvaLayer) {
        const rect = new Konva.Rect({
          x: 20,
          y: 20,
          width: 100,
          height: 50,
          fill: 'red',
          stroke: 'black',
          strokeWidth: 2,
          draggable: true,
        });
        konvaLayer.current.add(rect);
        konvaLayer.current.draw();
      }
    }, 5000);
  }, [initializeUniverse, isCanvasReady, konvaLayer, konvaStage]);

  return (
    <div className="layer-1" ref={canvasElement}>    </div>
  );
};

export default MainCanvas;

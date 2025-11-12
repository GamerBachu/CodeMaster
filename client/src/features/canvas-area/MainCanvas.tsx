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

    apiServices.getData("api-uid").then((data) => {
      initializeUniverse(data);

    });
  }, [initializeUniverse]);

  return (
    <div className="layer-1" ref={canvasElement}>    </div>
  );
};

export default MainCanvas;

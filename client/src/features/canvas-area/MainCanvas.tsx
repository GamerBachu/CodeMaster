import React, { useEffect, useRef, useState } from "react";
import useUniverseCanvas from "./hooks/useUniverseCanvas";
import type { IUniverseCanvasContext } from "./interfaces";
import apiServices from "./apis";
import { CanvasScroll } from "../../lib/fabricJs";

const MainCanvas: React.FC = () => {

  const layerElement = useRef<HTMLDivElement>(null);
  const canvasElement = useRef<HTMLCanvasElement>(null);

  const { initializeCanvas, initializeUniverse, canvas }: IUniverseCanvasContext = useUniverseCanvas();

  const [area, setArea] = useState<{ width: number; height: number; }>({ width: 0, height: 0 });

  useEffect(() => {
    const canvasArea = layerElement.current;
    const canvasEle = canvasElement.current;
    if (!canvasEle) return;
    if (!canvasArea) return;
    const width = canvasArea?.clientWidth ?? 0;
    const height = canvasArea?.clientHeight ?? 0;
    if (!width || !height) return;
    setArea({ width, height });
    initializeCanvas(canvasEle, width, height);
  }, [initializeCanvas]);

  useEffect(() => {
    apiServices.getData("api-uid").then((data) => {
      initializeUniverse(data);
    });
  }, [initializeUniverse]);

  return (
    <div className="layer-1" ref={layerElement}>
      <CanvasScroll area={area} canvas={canvas.current} />
      <canvas ref={canvasElement} />
    </div>
  );
};

export default MainCanvas;

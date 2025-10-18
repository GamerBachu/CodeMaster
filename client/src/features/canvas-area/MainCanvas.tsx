import React, { useEffect } from 'react';
import Konva from "konva";
import useUniverseCanvas from './hooks/useUniverseCanvas';

const MainCanvas: React.FC = () => {

  const canvasElement = React.useRef<HTMLDivElement | null>(null);
  const { dispatch, state } = useUniverseCanvas();

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

    dispatch({ type: 'SET_KONVA_STAGE', payload: stage });
    dispatch({ type: 'SET_KONVA_LAYER', payload: layer });





  }, [dispatch]);
  useEffect(() => {

    setTimeout(() => {


      if (state.konvaStage && state.konvaLayer) {
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
        state.konvaLayer.add(rect);
        state.konvaLayer.draw();
      }
    }, 5000);
  }, [state.konvaStage, state.konvaLayer, state]);

  return (
    <div className="layer-1" ref={canvasElement}>    </div>
  );
};

export default MainCanvas;

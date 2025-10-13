import { useEffect, useRef } from "react";
import Konva from "konva";

const SampleCanvas = () => {
    const stageRef = useRef<Konva.Stage>(undefined);
    const layerRef = useRef<Konva.Layer>(undefined);

    useEffect(() => {
        const container = document.getElementById("canvas-container");
        if (!container) return;

        const stage = new Konva.Stage({
            container: "canvas-container", // id of container <div>
            width: 500,
            height: 500,
        });
        stageRef.current = stage;
        // then create layer
        const layer = new Konva.Layer();
        layerRef.current = layer;
        stage.add(layer);

        const rect1 = new Konva.Rect({
            x: 20,
            y: 20,
            width: 100,
            height: 50,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true,
        });
        layer.add(rect1);

        const rect2 = new Konva.Rect({
            x: 150,
            y: 40,
            width: 100,
            height: 50,
            fill: 'red',
            shadowBlur: 10,
            cornerRadius: 10,
            draggable: true,
        });
        layer.add(rect2);

        const rect3 = new Konva.Rect({
            x: 50,
            y: 120,
            width: 100,
            height: 100,
            fill: 'blue',
            cornerRadius: [0, 10, 20, 30]
            , draggable: true,
        });
        rect3.on('mouseover', function () {
            this.opacity(1);
        });

        rect3.on('mouseout', function () {
            this.opacity(0.5);
        });

        layer.add(rect3);

        stage.add(layer);

    }, []);

    const onClickDownload = () => {

        if (stageRef.current === undefined) return;
        const stage = stageRef.current;
        if (layerRef.current === undefined) return;

        const json = stage.toJSON();
        console.log(JSON.parse(json));
    };

    const onClickLoad = () => {

        if (stageRef.current === undefined) return;
        if (layerRef.current === undefined) return;

        const json =
            '{"attrs":{"width":578,"height":200},"className":"Stage","children":[{"attrs":{},"className":"Layer","children":[{"attrs":{"x":100,"y":100,"sides":6,"radius":70,"fill":"red","stroke":"black","strokeWidth":4},"className":"RegularPolygon"}]}]}';



        console.log(json);
    };

    const addShape = () => {

        const shapes = [
            { className: 'Rect', attrs: { position: { x: 0, y: 0 }, size: { width: 60, height: 60 }, fill: 'cyan' } },
            { className: 'Rect', attrs: { position: { x: 12, y: 12 }, size: { width: 40, height: 60 }, rotation: 45, fill: 'magenta' } },
            { className: 'Star', attrs: { position: { x: 40, y: 40 }, numPoints: 6, innerRadius: 40, outerRadius: 70, rotation: 97, fill: 'lime' } },
            { className: 'Circle', attrs: { position: { x: 60, y: 60 }, radius: 10, fill: 'red' } },
            { className: 'Ellipse', attrs: { position: { x: 80, y: 80 }, radius: { x: 100 }, radiusX: 100, radiusY: 60, fill: 'yellow' } },
            { className: 'Wedge', attrs: { position: { x: 90, y: 90 }, radius: 100, angle: 60, fill: 'blue', rotation: -60 } },
            { className: 'Ring', attrs: { position: { x: 100, y: 100 }, innerRadius: 40, outerRadius: 100, angle: 60, fill: 'gold', rotation: -60 } },

        ];

        for (const shape of shapes) {
            const currentShape = Konva.Node.create(shape);
            currentShape.draggable(true);
            layerRef.current?.add(currentShape);
        }

    };


    return (
        <>
            <div className="d-flex justify-content-center my-3">
                <button onClick={onClickDownload}>onClickDownload</button>
                <button onClick={onClickLoad}>onClickLoad</button>
                <button onClick={addShape}>addShapeaddShape</button>
            </div>
            <div className="canvas-container" id={"canvas-container"}></div>
        </>
    );
};

export default SampleCanvas;
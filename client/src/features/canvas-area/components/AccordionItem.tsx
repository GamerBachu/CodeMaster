import Konva from "konva";
import useUniverseCanvas from "../hooks/useUniverseCanvas";
import type { IAccordionData } from "../interfaces";

type Props = {
    child: IAccordionData;
};

const AccordionItem = ({ child }: Props) => {
    const {
        isCanvasReady,
        konvaLayer
    } = useUniverseCanvas();


    const onClick = (data: IAccordionData) => {

        if (isCanvasReady) {
          //  console.log("Adding to canvas:", data);
            Konva.Image.fromURL(data.src, (image) => {
                image.setAttrs({
                    x: 50,
                    y: 50,
                    width: 100,
                    height: 100,
                    draggable: true,
                });
                konvaLayer.current.add(image);
                konvaLayer.current.draw();
            });
        }
    };




    return (
        <div className="col mb-2">
            <section
                className="card border-secondary align-items-center"
                data-test-id={`a-c-${child.id}`}
                id={`a-c-${child.id}`}
                onClick={() => { onClick(child); }}

            >
                <img
                    className="card-img-top object-fit-fill border rounded mt-1"
                    src={child.src}
                    title={child.title}
                    alt={child.alt}
                ></img>
                <div className="card-body p-1 small">
                    <small className="card-title fw-bold  d-inline-block text-truncate"> {child.title}</small>
                    <p className="card-text">
                        <small>{child.description}</small>
                    </p>
                </div>
            </section>
        </div>
    );
};

export default AccordionItem;

import { FabricImage } from "fabric";
import useUniverseCanvas from "../hooks/useUniverseCanvas";
import type { IAccordionData } from "../interfaces";

type Props = {
    child: IAccordionData;
};

const AccordionItem = ({ child }: Props) => {
    const {
        isCanvasReady,
        canvas
    } = useUniverseCanvas();


    const onClick = (data: IAccordionData) => {

        if (isCanvasReady && canvas.current) {
            console.log("Adding to canvas:", data);
            try {
                FabricImage.fromURL(data.src).then((image) => {
                    image.set({
                        left: 50,
                        top: 50,
                        selectable: true,
                    });
                    canvas.current!.add(image);
                    canvas.current!.renderAll();
                });

            } catch (error) {
                console.error("Error loading image:", error);
            }
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

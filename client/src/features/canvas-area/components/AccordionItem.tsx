import { FabricImage } from "fabric";
import useUniverseCanvas from "../hooks/useUniverseCanvas";
import type { IAccordionData } from "../interfaces";
import { getCenterPoint } from "../../../lib/fabricJs";
import logger from "../../../utils/logger";

type Props = {
    child: IAccordionData;
};

const AccordionItem = ({ child }: Props) => {
    const { isCanvasReady, canvas } = useUniverseCanvas();

    const onClick = (data: IAccordionData) => {
        if (isCanvasReady && canvas.current !== undefined) {
            try {
                FabricImage.fromURL(data.src).then((image) => {
                    //get canvas center position with current zoom and viewport transform
                    const centerPoint = getCenterPoint(canvas.current);

                    image.set({
                        left: centerPoint.x - (image.width ? image.width / 2 : 0),
                        top: centerPoint.y - (image.height ? image.height / 2 : 0),
                    });
                    canvas.current!.add(image);
                    logger.info(
                        "Image added to canvas", {
                        file: "AccordionItem.tsx",
                        block: "onClick",
                    });
                    canvas.current!.renderAll();
                });
            } catch (error) {
                logger.error(
                    "Error loading image:", error, {
                    file: "AccordionItem.tsx",
                    block: "onClick",
                });
            }
        }
    };

    return (
        <div className="col mb-2">
            <section
                className="card border-secondary align-items-center"
                data-test-id={`a-c-${child.id}`}
                id={`a-c-${child.id}`}
                onClick={() => {
                    onClick(child);
                }}
            >
                <img
                    className="card-img-top object-fit-fill border rounded mt-1"
                    src={child.src}
                    title={child.title}
                    alt={child.alt}
                ></img>
                <div className="card-body p-1 small">
                    <small className="card-title fw-bold  d-inline-block text-truncate">
                        {" "}
                        {child.title}
                    </small>
                    <p className="card-text">
                        <small>{child.description}</small>
                    </p>
                </div>
            </section>
        </div>
    );
};

export default AccordionItem;

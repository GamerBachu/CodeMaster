import type { IAccordionData } from "../interfaces";

type Props = {
    child: IAccordionData;
};

const AccordionItem = ({ child }: Props) => {
    return (
        <div className="col mb-2">
            <div
                className="card border-secondary align-items-center"
                data-test-id={`a-c-${child.id}`}
                id={`a-c-${child.id}`}
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
            </div>
        </div>
    );
};

export default AccordionItem;

import AccordionItem from "../../../components/accordion/AccordionItem";
import Update from "./Update";


type stockAvailabilityProps = {
    id: string;
    productId: string;
};

const Index = ({ id, productId }: stockAvailabilityProps) => {
    return (
        <AccordionItem
            id={id}
            title={"Stock Availability"}
            isCollapse={true}
            className="border border-info-subtle mt-1"
        >
            <Update
                id={id}
                productId={productId}
            ></Update>
        </AccordionItem>
    );
};

export default Index;
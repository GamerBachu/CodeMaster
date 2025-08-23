import AccordionItem from "../../../components/accordion/AccordionItem";
import List from "./List";


type discountProps = {
    id: string;
    productId: string;
};

const Index = ({ id, productId }: discountProps) => {
    return (
        <AccordionItem
            id={id}
            title={"Discount"}
        >
         <List
         productId={productId}
         ></List>
        </AccordionItem>
    );
};

export default Index;
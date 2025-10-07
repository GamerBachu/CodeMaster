export interface IAccordionData {
    id: string;
    title: string;
    src: string;
    description: string;
    alt: string;
    keyword: string;
}
export interface IAccordion {
    id: string;
    title: string;
    open: boolean;
    content: IAccordionData[];
}

import React, { useEffect, useMemo, useState } from "react";

type AccordionItemProps = {
    id: string;
    title: string;
    className?: string;
    isCollapse?: boolean;
    children?: React.ReactNode;

};

const AccordionItem = ({ id, title, className = "", isCollapse = false, children }: AccordionItemProps) => {
    const { titleId, buttonId, bodyId } = useMemo(() => {
        return {
            titleId: `acd-${id}`,
            buttonId: `acd-btn-${id}`,
            bodyId: `acd-bdy-${id}`,
        };
    }, [id]);

    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        setIsOpen(!isCollapse);
    }, [isCollapse]);

    return (
        <div className={`accordion-item ${className}`} id={titleId} data-testid={titleId}>
            <h2 className="accordion-header">
                <button
                    className={`accordion-button shadow-none ${isOpen ? "" : "collapsed"}`}
                    type="button"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                    onClick={() => {setIsOpen(prev=>!prev);}}
                    id={buttonId}
                    data-testid={buttonId}
                >
                    {title}
                </button>
            </h2>
            <div className={`accordion-collapse ${isOpen ? "show" : "collapse"}`}>
                <div className="accordion-body " id={bodyId} data-testid={bodyId}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AccordionItem;

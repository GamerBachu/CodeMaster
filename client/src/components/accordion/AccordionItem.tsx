import React, { useMemo, useState } from "react";

type AccordionItemProps = {
    id: string;
    title: string;
    children?: React.ReactNode;
};

const AccordionItem = ({ id, title, children }: AccordionItemProps) => {
    const { titleId, buttonId, bodyId } = useMemo(() => {
        return {
            titleId: `acd-${id}`,
            buttonId: `acd-btn-${id}`,
            bodyId: `acd-bdy-${id}`,
        };
    }, [id]);

    const [isCollapse, setIsCollapse] = useState(true);
    return (
        <div className="accordion-item" id={titleId} data-testid={titleId}>
            <h2 className="accordion-header">
                <button
                    className={`accordion-button ${isCollapse ? "" : "collapsed"}`}
                    type="button"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                    onClick={() => {
                        setIsCollapse(!isCollapse);
                    }}
                    id={buttonId}
                    data-testid={buttonId}
                >
                    {title}
                </button>
            </h2>
            <div className={`accordion-collapse ${isCollapse ? "show" : "collapse"}`}>
                <div className="accordion-body" id={bodyId} data-testid={bodyId}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AccordionItem;

import { useEffect, useState } from 'react';
import type { IAccordion } from '../interfaces';
import AccordionItem from './AccordionItem';

const Accordion = () => {

    const [accordionData, setAccordionData] = useState<IAccordion[]>([]);
    useEffect(() => {
        setAccordionData(
            [
                {
                    "id": "section1",
                    "title": "Batch 1: Product Images",
                    "open": true,
                    "content": [
                        { "id": "0000010001", "title": "Red Hoodie", "src": "/images/batch-1/1.png", "description": "A classic red hoodie .", alt: "red", keyword: "red" },
                        { "id": "0000010002", "title": "Blue Jeans", "src": "/images/batch-1/2.png", "description": "Straight-fit blue denim jeans with a vintage wash.", alt: "red", keyword: "red" },
                        { "id": "0000010003", "title": "White T-Shirt", "src": "/images/batch-1/3.png", "description": "A basic white crewneck t-shirt, perfect for everyday wear.", alt: "red", keyword: "red" },
                        { "id": "0000010004", "title": "Leather Jacket", "src": "/images/batch-1/4.png", "description": "High-quality leather jacket with a modern slim fit.", alt: "red", keyword: "red" },
                        { "id": "0000010005", "title": "Running Shoes", "src": "/images/batch-1/4512537.png", "description": "Lightweight and supportive shoes for running and training.", alt: "red", keyword: "red" },
                        { "id": "0000010006", "title": "Sunglasses", "src": "/images/batch-1/4512537.png", "description": "Aviator-style sunglasses with polarized lenses.", alt: "red", keyword: "red" },
                        { "id": "0000010007", "title": "Laptop Bag", "src": "/images/batch-1/4512537.png", "description": "A durable and stylish bag to carry your laptop and essentials.", alt: "red", keyword: "red" },
                        { "id": "0000010008", "title": "Hiking Backpack", "src": "/images/batch-1/4512537.png", "description": "Spacious and ergonomic backpack for hiking adventures.", alt: "red", keyword: "red" },
                        { "id": "0000010009", "title": "Wool Scarf", "src": "/images/batch-1/4512537.png", "description": "A soft and warm wool scarf for cold weather.", alt: "red", keyword: "red" },
                        { "id": "0000010010", "title": "Digital Watch", "src": "/images/batch-1/4512537.png", "description": "A sleek digital watch with multiple features.", alt: "red", keyword: "red" }
                    ]
                },
                {
                    "id": "section2",
                    "title": "Batch 2: UI Icons",
                    "open": false,
                    "content": [
                        { "id": "0000020001", "title": "User Profile Icon", "src": "/images/batch-1/4512537.png", "description": "An icon representing a user profile or account settings.", alt: "red", keyword: "red" },
                        { "id": "0000020002", "title": "Notification Bell Icon", "src": "/images/batch-1/4512537.png", "description": "An icon to indicate new notifications or alerts.", alt: "red", keyword: "red" },
                        { "id": "0000020003", "title": "Shopping Cart Icon", "src": "/images/batch-1/4512537.png", "description": "An icon representing a shopping cart or checkout process.", alt: "red", keyword: "red" },
                        { "id": "0000020004", "title": "Settings Gear Icon", "src": "/images/batch-1/4512537.png", "description": "An icon for accessing application settings and preferences.", alt: "red", keyword: "red" },
                        { "id": "0000020005", "title": "Search Magnifier Icon", "src": "/images/batch-1/4512537.png", "description": "An icon for initiating a search function.", alt: "red", keyword: "red" },
                        { "id": "0000020006", "title": "Download Arrow Icon", "src": "/images/batch-1/4512537.png", "description": "An icon used for downloading files or content.", alt: "red", keyword: "red" },
                        { "id": "0000020007", "title": "Heart Like Icon", "src": "/images/batch-1/4512537.png", "description": "An icon to signify a 'like' or 'favorite' action.", alt: "red", keyword: "red" },
                        { "id": "0000020008", "title": "Message Bubble Icon", "src": "/images/batch-1/4512537.png", "description": "An icon for displaying messages or comments.", alt: "red", keyword: "red" },
                        { "id": "0000020009", "title": "Share Icon", "src": "/images/batch-1/4512537.png", "description": "An icon for sharing content to other users or platforms.", alt: "red", keyword: "red" },
                        { "id": "0000020010", "title": "Home House Icon", "src": "/images/batch-1/4512537.png", "description": "An icon representing the home page or dashboard.", alt: "red", keyword: "red" }
                    ]
                },
                {
                    "id": "section3",
                    "title": "Batch 3: Product Mockups",
                    "open": false,
                    "content": [
                        { "id": "0000030001", "title": "Website Mockup", "src": "/images/batch-1/4512537.png", "description": "A clean and modern website layout mockup.", alt: "red", keyword: "red" },
                        { "id": "0000030002", "title": "Mobile App UI", "src": "/images/batch-1/4512537.png", "description": "A user interface mockup for a mobile application.", alt: "red", keyword: "red" },
                        { "id": "0000030003", "title": "Landing Page Design", "src": "/images/batch-1/4512537.png", "description": "A full-page design mockup for a product landing page.", alt: "red", keyword: "red" },
                        { "id": "0000030004", "title": "E-Commerce Page", "src": "/images/batch-1/4512537.png", "description": "A mockup of a product listing and checkout page for an online store.", alt: "red", keyword: "red" },
                        { "id": "0000030005", "title": "Dashboard Design", "src": "/images/batch-1/4512537.png", "description": "A data-heavy dashboard interface mockup for analytics.", alt: "red", keyword: "red" },
                        { "id": "0000030006", "title": "Social Media Feed", "src": "/images/batch-1/4512537.png", "description": "A mockup of a social media application feed.", alt: "red", keyword: "red", },
                        { "id": "0000030007", "title": "Portfolio Website", "src": "/images/batch-1/4512537.png", "description": "A minimal and elegant portfolio website layout mockup.", alt: "red", keyword: "red" },
                        { "id": "0000030008", "title": "Blog Post Template", "src": "/images/batch-1/4512537.png", "description": "A mockup for a blog post layout with typography and image placement.", alt: "red", keyword: "red", },
                        { "id": "0000030009", "title": "Login Page", "src": "/images/batch-1/4512537.png", "description": "A minimalist login and signup form mockup.", alt: "red", keyword: "red" },
                        { "id": "0000030010", "title": "Checkout Flow", "src": "/images/batch-1/4512537.png", "description": "A multi-step checkout process mockup.", alt: "red", keyword: "red" }
                    ]
                }
            ]

        );

        return () => {
            setAccordionData([]);
        };
    }, []);


    const onCollapseClick = (id: string) => {
        setAccordionData((prev) =>
            prev.map((section) =>
                section.id === id ? { ...section, open: !section.open } : { ...section, open: false }
            )
        );
    };

    return (
        <div className="accordion" data-test-id="a-1" >
            {accordionData.map((parent: IAccordion) => (
                <div className="accordion-item border border-primary-subtle mt-1" key={parent.id}>
                    <h2 className="accordion-header" data-test-id={`a-1-h-${parent.id}`} id={`a-1-h-${parent.id}`}>
                        <button
                            className={`accordion-button shadow-none ${parent.open ? '' : 'collapsed'}`}
                            type="button"
                            aria-expanded={parent.open ? 'true' : 'false'}
                            aria-controls={`a-1-b-${parent.id}`}
                            onClick={() => onCollapseClick(parent.id)}
                        >
                            {parent.title}
                        </button>
                    </h2>
                    <div
                        id={`a-1-b-${parent.id}`}
                        className={`accordion-collapse collapse${parent.open ? ' show' : ''}`}
                        aria-labelledby={`a-1-h-${parent.id}`}
                    >
                        <div className="accordion-body p-1 d-flex gap-1 flex-column">
                            {parent.content?.map((child) => (
                                <AccordionItem child={child} key={child.id}  ></AccordionItem>
                            ))}
                        </div>
                    </div>
                </div>
            ))
            }
        </div >
    );
};

export default Accordion;
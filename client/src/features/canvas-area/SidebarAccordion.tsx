import React from 'react';

const accordionData = [
  { id: 'section1', title: 'Section 1', content: 'Content for section 1.' },
  { id: 'section2', title: 'Section 2', content: 'Content for section 2.' },
  { id: 'section3', title: 'Section 3', content: 'Content for section 3.' },
];

const SidebarAccordion: React.FC = () => {
  return (
    <div className="accordion" id="sidebarAccordion">
      {accordionData.map(({ id, title,  }, idx) => (
        <div className="accordion-item" key={id}>
          <h2 className="accordion-header" id={`heading-${id}`}>
            <button
              className={`accordion-button${idx !== 0 ? ' collapsed' : ''}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse-${id}`}
              aria-expanded={idx === 0 ? 'true' : 'false'}
              aria-controls={`collapse-${id}`}
            >
              {title}
            </button>
          </h2>
          <div
            id={`collapse-${id}`}
            className={`accordion-collapse collapse${idx === 0 ? ' show' : ''}`}
            aria-labelledby={`heading-${id}`}
            data-bs-parent="#sidebarAccordion"
          >
            <div className="accordion-body">

              <img src="/images/batch-1/4512537.png"></img>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SidebarAccordion;

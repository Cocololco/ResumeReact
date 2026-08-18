import React from 'react';

const TimelineDetails = ({entry}) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header ">
        <button className={`accordion-button ${entry.active ? "" : "collapsed"} `} 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target={`#collapse${entry.id}`}
          aria-expanded="true" 
          aria-controls={`collapse${entry.id}`} 
        >
          <span>{entry.company} - {entry.title}</span>
        </button>
      </h2>
      <div id={`collapse${entry.id}`}
      className={`accordion-collapse collapse ${entry.active ? "show" : ""}`} 
      aria-labelledby={`heading${entry.id}`}
      data-bs-parent="#accordionExample">
        <div className="accordion-body">
          <strong>{entry.title}</strong><br />
          <span className="opacity-50 text-nowrap" >{entry.dateStart}-{entry.dateEnd}</span><br />
          <ul>
            {entry.details.map((detail, index) => (
              Array.isArray(detail) ? (
                <ul key={index}>
                  {detail.map((item, subIndex) => (
                    <li key={subIndex}>{item}</li>
                  ))}
                </ul>
              ) : (
                <li key={index}>{detail}</li>
              )
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TimelineDetails;
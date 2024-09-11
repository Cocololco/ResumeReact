import React from 'react';

const TimelineCard = ({entry}) => {
  return (
    <div className="card mb-0 p-3" style={{maxWidth: '1080px'}}>
      <div className="d-flex gap-2 w-100 justify-content-between"
        data-bs-toggle="collapse" 
          data-bs-target={`#collapse${entry.id}`}
          aria-expanded="true" 
          aria-controls="collapse"
        >
          <div style={{width:"40%"}}>
            <img src={`img/experiences/${entry.image}`} alt="twbs" height="25" className="rounded flex-shrink-0" />
            <h6 className="mb-0">{entry.title}</h6>
            <small className="opacity-50 text-nowrap">{entry.location}</small>
          </div>
          <div style={{width:"60%"}}>
            <p className="mb-0 opacity-75">{entry.content}</p>
            <div className="d-flex gap-2 justify-content-center">
              <small className="opacity-50 text-nowrap">{entry.dateStart}</small>
              <small className="opacity-50 text-nowrap">{entry.dateEnd}</small>
            </div>
          </div>
      </div>
    </div>  
  );
};

export default TimelineCard;
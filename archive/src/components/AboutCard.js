import React from 'react';

const AboutCard = ({entry}) => {
  return (
    <div className="card mb-3" style={{maxWidth: '1080px'}}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={entry.imagePath} className="container rounded mx-auto d-block" alt="" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{entry.title}</h5>
            <p className="card-text">{entry.content}</p>
            <p className="card-text text-body-secondary">{entry.subtext}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
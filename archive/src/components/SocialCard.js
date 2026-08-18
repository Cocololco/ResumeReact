import React from 'react';

const SocialCard = ({ title, imageName,username,link }) => {
  return (
    <div className="card mb-3 p-2" style={{maxWidth: '1080px'}}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={`img/social/${imageName}`} height="90" className="rounded mx-auto d-block" alt=""/>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text"><a target="_blank" rel="noopener noreferrer" href={link}>{username}</a></p>
          </div>
        </div>
      </div>
    </div>  
  );
};

export default SocialCard;
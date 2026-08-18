// src/components/Navbar.js
import React from 'react';
import { useLocation } from 'react-router-dom'; 

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Corentin Hillion</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            {location.pathname !== '/game' ? (
              <>
                <li className="nav-item"><a className="nav-link" href="/about">About Me</a></li>
                <li className="nav-item"><a className="nav-link" href="/experiences">Experiences</a></li>
                <li className="nav-item"><a className="nav-link" href="/skills">Skills Matrix</a></li>
                <li className="nav-item"><a className="nav-link" href="/contact">Contact</a></li>
                <li className="nav-item"><a className="nav-link" href="/game">JS Game</a></li>
              </>
            ):(
              <li className="nav-item"><a className="nav-link" href="/">Back</a></li>
            )}
            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

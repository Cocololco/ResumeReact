import React, { useEffect } from 'react';
import Main from '../Main';
import '../assets/css/canon.css';  
import HighscoreTable from '../components/HighscoreTable';

function Game() {
  useEffect(() => {
    document.title = 'Canon';
  }, []); // This will run when the component is mounted
  useEffect(() => {
    // Check if the script is already added
    const existingScript = document.querySelector('script[src="js/canon.js"]');
  
    if (!existingScript) {
      // Dynamically load the external JS file
      const script = document.createElement('script');
      script.src = "js/canon.js"; // Specify the correct path to canon.js
      script.async = true;
      document.body.appendChild(script);
  
      // Cleanup script when the component is unmounted
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);
  return (
    <div>
      <Main>
        <div className="game-container">
          <div className="playground" id="playground">
          </div>
          <button id="resetButton" className="btn btn-secondary mt-1">Reset</button>
          <div id="infoBox"></div>
          {/* <HighscoreTable title="Best Time"/>
          <HighscoreTable title="Best Bullets Usage"/>
          <HighscoreTable title="Least Block Broken"/> */}
        </div>
      </Main>
    </div>
  );
  
}

export default Game;
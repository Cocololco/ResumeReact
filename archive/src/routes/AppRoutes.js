import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from '../pages/About';
import Experiences from '../pages/Experiences';
import Skills from '../pages/Skills';
import Contact from '../pages/Contact';
import Game from '../pages/Game';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<About />} />
      <Route path="/about" element={<About />} />
      <Route path="/experiences" element={<Experiences />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  </Router>
);

export default AppRoutes;
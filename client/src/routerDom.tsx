import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import RoutePage from './route';
import About from './about';

const RouterDom: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoutePage />}/> {/* Проложение маршрута */}
        <Route path="/about" element={<About />}/> {/* О проекте */}
        <Route path="/zo/contacts" element={<About />}/> {/* Информаия о деканатах */}
        <Route path="/contacts" element={<About />}/>  {/* Информация о корпусах */}
      </Routes>
    </Router>
  );
}

export default RouterDom;

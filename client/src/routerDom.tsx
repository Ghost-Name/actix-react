import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import RoutePage from './route';
import About from './about';
import Buildings from './buildings';
import Dekanat from './dekanat';

const RouterDom: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<About />}/> {/* О проекте */}
        <Route path="/about" element={<About />}/> {/* О проекте */}
        <Route path="/zo/contacts" element={<Dekanat />}/> {/* Информаия о деканатах */}
        <Route path="/contacts" element={<Buildings />}/>  {/* Информация о корпусах */}
        <Route path="/navigation" element= {<RoutePage />}/> {/* Проложение маршрута */}
      </Routes>
    </Router>
  );
}

export default RouterDom;

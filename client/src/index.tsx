import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import Header from './components/header';
import MainContainer from './components/main_container';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    
    <Header>
      ''
    </Header> 
    <MainContainer>
      ''
    </MainContainer>
  </React.StrictMode>
);

reportWebVitals();

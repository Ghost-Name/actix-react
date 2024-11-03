import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import LineBox from './components/line_box';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <LineBox>
        <button></button>
      </LineBox> 
  </React.StrictMode>
);

reportWebVitals();

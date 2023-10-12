import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

//let counter = 1;
const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
  <React.StrictMode>
    <App /* counter={counter} */ />
  </React.StrictMode>
);

/* const refresh = () => {
}; */

/* refresh()
counter += 1
refresh()
counter += 1
refresh() */



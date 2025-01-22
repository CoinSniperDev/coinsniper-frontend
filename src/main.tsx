import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ReactGA from 'react-ga4';
import './index.css'; // optional global styles

// TODO: Remove debug here
// ReactGA.initialize('G-1CK1JC1EQ5');
ReactGA.initialize('G-1CK1JC1EQ5', {
  gaOptions: {
    debug_mode: true,
  },
  gtagOptions: {
    debug_mode: true,
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

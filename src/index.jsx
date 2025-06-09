import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Importar validador de políticas AdSense (apenas em desenvolvimento)
if (import.meta.env.DEV) {
  import('./utils/adSensePolicyValidator.js');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

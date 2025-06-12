import React from 'react';
import ReactDOM from 'react-dom/client'; // Importe createRoot do 'react-dom/client'
import App from './App'; // Importa o seu componente principal App

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

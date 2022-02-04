// == Import npm
import React from 'react';

// == Import
import ytrema from './logo-ytrema-site.png';
import './styles.css';

// == Composant
const App = () => (
  <div className="app">
    <img src={ytrema} alt="ÿtrema logo" />
    <h1>Bienvenue sur ÿ tréma</h1>
  </div>
);

// == Export
export default App;

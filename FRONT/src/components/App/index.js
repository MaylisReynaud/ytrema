// == Import npm
import React from 'react';


// == Import
import Navbar from '../Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import './styles.css';
import { FontStyles } from '../../fonts/fontStyles';

// == Composant
const App = () => (
  <div className="app">
    <FontStyles/>
    <Router>
      <Navbar/>
      <h1>Bienvenue sur ÿ tréma</h1>
    </Router>
  
  </div>
);

// == Export
export default App;

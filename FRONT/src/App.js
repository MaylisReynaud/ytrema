// == Import npm
import React from 'react';
import { Navbar } from "./components/Navbar";
import { Test } from "./components/Test";

// == Import
import './App.scss';
console.log (Test);
// == Composant
const App = () => {
  return (
    <div className="app">
    <Test />
   </div>
  )
};


// == Export
export default App;

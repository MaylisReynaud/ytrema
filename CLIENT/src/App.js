// == Import npm
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Navbar } from './components/Navbar';
import { DeviceSize } from '../src/components/Navbar/Responsive';
import { MobileBottomNavLinks } from './components/Navbar/MobileBottomNavLinks';



// == Import
import './App.scss';

// == Composant
const App = () => {
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  return (
    <div className="app">
    <Navbar />
    {isMobile &&  <MobileBottomNavLinks />}
   </div>
  )
};


// == Export
export default App;

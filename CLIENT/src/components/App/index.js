// == Import npm
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Navbar } from '../Navbar';
import { DeviceSize } from '../Navbar/Responsive';
import { MobileBottomNavLinks } from '../Navbar/MobileBottomNavLinks';



// == Import
import './style';

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

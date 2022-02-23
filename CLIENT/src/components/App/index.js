// == Import npm
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Navbar } from '../Navbar';
import { DeviceSize } from '../Navbar/Responsive';
import { MobileBottomNavLinks } from '../Navbar/MobileBottomNavLinks';
import { Slider } from '../Carousel';
import { Homepage } from '../Homepage';
import { AppContainer } from './style';
import { MobileNavLinks } from '../Navbar/MobileNavLinks';





// == Composant
const App = () => {
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  return (
    <div className="app">
      <Navbar />
    {isMobile && 
      <AppContainer>
        <Homepage />
        <MobileBottomNavLinks />
      </AppContainer>
    }

     </div>
  )
};


// == Export
export default App;

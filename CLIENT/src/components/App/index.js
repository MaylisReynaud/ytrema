// == Import npm
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Navbar } from '../Navbar';
import { DeviceSize } from '../Navbar/Responsive';
import { MobileBottomNavLinks } from '../Navbar/MobileBottomNavLinks';
import { Homepage } from '../Homepage';
import { MobileHomepage } from '../MobileHomepage';
import { AppContainer } from './style';
import { MobileNavLinks } from '../Navbar/MobileNavLinks';






// == Composant
const App = () => {
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  
  const isTablet = useMediaQuery({ minWidth: DeviceSize.tablet });
 
  return (
    <div className="app">
      <Navbar />
    {isMobile && 
      <AppContainer>
        <MobileHomepage />
        <MobileBottomNavLinks />
      </AppContainer>
    }
     {isTablet &&  <Homepage />}

     </div>
  )
};


// == Export
export default App;

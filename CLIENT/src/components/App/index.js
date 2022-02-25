// == Import npm
import React from 'react';
import {  Route, Routes, Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Navbar } from '../Navbar';
import { DeviceSize } from '../Navbar/Responsive';
import { MobileBottomNavLinks } from '../Navbar/MobileBottomNavLinks';
import { Homepage } from '../Homepage';
import { MobileHomepage } from '../MobileHomepage';
import { AppContainer } from './style';
import { MobileNavLinks } from '../Navbar/MobileNavLinks';
import { Registrationpage } from '../Registrationpage';






// == Composant
const App = () => {
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  
  const isTablet = useMediaQuery({ minWidth: DeviceSize.tablet });
 
  return (
    <>
        <Navbar/>
          <Routes>
            { isTablet && <Route  path='/' element={<Homepage />} /> }
            { isMobile && <Route  path='/' element={<MobileHomepage />} /> }
            <Route  path='/connexion' element={<Registrationpage />} />
            <Route  path='/inscription' element={<Registrationpage />} />
          </Routes>

    
    {isMobile && 
      <AppContainer>
        <MobileHomepage />
        <MobileBottomNavLinks />
      </AppContainer>
    }

  </>
  )
};


// == Export
export default App;

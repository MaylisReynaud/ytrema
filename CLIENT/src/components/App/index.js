// == Import npm
import React from 'react';
import {  Route, Routes, Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Navbar } from '../Navbar';
import { DeviceSize } from '../Navbar/Responsive';
import { MobileBottomNavLinks } from '../Navbar/MobileBottomNavLinks';
import { Homepage } from '../Homepage';
import { Footer } from '../Footer';
import { AppContainer, MobileAppContainer } from './style';

import { Registrationpage } from '../Registrationpage';
import { Fabric } from '../Fabric';






// == Composant
const App = () => {
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  
  const isTablet = useMediaQuery({ minWidth: DeviceSize.tablet });
 
  return (
    <>
    <AppContainer>
      <Navbar/>
            <Routes>
              <Route  path='/' element={<Homepage />} /> 
              <Route  path='/connexion' element={<Registrationpage />} />
              <Route  path='/inscription' element={<Registrationpage />} />
              <Route  path='/tissus' element={<Fabric />} />
              {/* <Route  path='/equipe' element={<Equipe />} />
              <Route  path='/contact' element={<Contact />} />
              <Route  path='/mentionslegales' element={<Contact />} /> */}

            </Routes>
            {!isMobile && <Footer />}

    </AppContainer>
        
    
    {isMobile && 
      <MobileAppContainer>
        <MobileBottomNavLinks />
      </MobileAppContainer>
    }

  </>
  )
};


// == Export
export default App;

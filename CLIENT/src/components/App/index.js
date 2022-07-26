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
import { Login } from '../Registrationpage/Login';
import { Signup } from '../Registrationpage/Signup';
import { Fabric } from '../ArticlesPage/Fabric';
import { Haberdashery } from '../ArticlesPage/Haberdashery';
import { Pattern } from '../ArticlesPage/Pattern';
import { Profil } from '../ArticlesPage/Profil';
import { FabricCard } from '../ArticlesPage/Fabric/Card';
import { HaberdasheryCard } from '../ArticlesPage/Haberdashery/Card';
import { NotFound } from '../NotFound';
import { ToastContainer} from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import { defaultState } from '../../store/state/authSlice';
import { LoginForm } from '../Registrationpage/RegisterBox/Forms/LoginForm';



// == Composant
const App = () => {
  const dispatch = useDispatch();
  const removePersistStore = () => {
    if(!sessionStorage.getItem("token") ) {
      localStorage.clear();
      dispatch(defaultState('initialState'));
    }
  };
  removePersistStore();

  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
 
  return (
    <>
    <AppContainer>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
/>
      <Navbar/>
            <Routes>
              <Route  path='/' element={<Homepage />} /> 
              <Route  path='/connexion' element={<Login />} />
              <Route  path='/inscription' element={<Signup />} /> 
              <Route  path='/tissus' element={<Fabric />} />
              <Route  path='/tissus/:id' element={<FabricCard /> } />
              <Route  path='/mercerie' element={<Haberdashery />} />
              <Route  path='/mercerie/:id' element={<HaberdasheryCard /> } />
              <Route  path='/patrons' element={<Pattern />} />
              <Route  path='/profil' element={<Profil />} />
              <Route  path='*' element={<NotFound />} />
              


              
              {/* <Route  path='/equipe' element={<Equipe />} />
              <Route  path='/contact' element={<Contact />} />
              <Route  path='/mentionslegales' element={<Contact />} /> */}

            </Routes>
            {isDesktop && <Footer />}

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

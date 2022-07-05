import React from 'react';
import { Slider } from '../Carousel';
import { useMediaQuery } from 'react-responsive';
import { DeviceSize } from '../Navbar/Responsive';
import { HomepageContainer } from './style';
import { LoginForm } from '../Registrationpage/RegisterBox/Forms/LoginForm';




export function Homepage (props) {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });

    return (
        <>
        <HomepageContainer>
            {isMobile && <Slider />  }
            {isMobile && <LoginForm />}
            {!isMobile && <Slider />}
        </HomepageContainer>

        </>
    )
};

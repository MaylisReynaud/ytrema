import React from 'react';
import { Slider } from '../Carousel';
import { useMediaQuery } from 'react-responsive';
import { DeviceSize } from '../Navbar/Responsive';
import { HomepageContainer } from './style';
import { Login } from '../Registrationpage/Login';




export function Homepage (props) {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });

    return (
        <>
        <HomepageContainer>
            {isMobile && <Login />}
            {!isMobile && <Slider />}
        </HomepageContainer>

        </>
    )
};

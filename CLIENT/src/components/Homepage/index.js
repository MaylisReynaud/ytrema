import React from 'react';
import { Slider } from '../Carousel';
import { Registrationpage } from '../Registrationpage';
import { RegisterBox } from '../Registrationpage/RegisterBox';
import { useMediaQuery } from 'react-responsive';
import { DeviceSize } from '../Navbar/Responsive';
import { HomepageContainer } from './style';




export function Homepage (props) {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });

    return (
        <>
        <HomepageContainer>
            {isMobile && <Slider />}
            {isMobile && <RegisterBox />}
            {!isMobile && <Slider />}
        </HomepageContainer>

        </>
    )
};

import React from 'react';
import { Slider } from '../Carousel';
import { Registrationpage } from '../Registrationpage';
import { MobileRegisterBox } from '../MobileRegisterBox';
import { useMediaQuery } from 'react-responsive';
import { DeviceSize } from '../Navbar/Responsive';




export function Homepage (props) {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });

    return (
        <>
        {isMobile && <Slider />}
        {isMobile && <MobileRegisterBox />}
        {!isMobile && <Slider />}
        </>
    )
};

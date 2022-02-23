import React from 'react';
import { Slider } from '../Carousel';
import { RegisterBox } from '../RegisterBox';
import { useMediaQuery } from 'react-responsive';
import { DeviceSize } from '../Navbar/Responsive';


export function Homepage (props) {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    return (
        <>
        {isMobile && <Slider />}
        {isMobile && <RegisterBox />}
        </>
    )
};

import React from 'react';
import { Slide, makeCarousel } from 'react-reveal'
import { CarouselContainer
} from './style';


const CarouselUI = ({ children }) => <CarouselContainer>{children}</CarouselContainer>;
export const width = '300px', height='150px';
export const Carousel = makeCarousel(CarouselUI);


render (
  <Carousel defaultWait={1000} /*wait for 1000 milliseconds*/ >
    <Slide right>
      <div>
        <h1>Slide 1</h1>
        <p>Slide Description</p>
      </div>
    </Slide>
    <Slide right>
      <div>
        <h1>Slide 2</h1>
        <p>Slide Description</p>
      </div>
    </Slide>
  </Carousel>
);


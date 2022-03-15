import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import { Carousel } from 'react-responsive-carousel';
import { Slide, 
         SlideImg,
         SlideOverlay,
         SlideOverlayH2,
         SlideOverlayH1,
         SlideOverlayText,
         SlideButton,
         SlideButtonContainer
} from './style';
import { sliderData } from '../../utils/sliderData';




export function Slider() {
    

  return (
        <Carousel
            autoPlay
            interval={5000}
            transitionTime={500}
            swipeScrollTolerance={5}
            infiniteLoop
            showStatus={false}
            showThumbs={false}
            stopOnHover={true}
            showIndicators={false}
            swipeable={true}
            dynamicHeight={true}
            animationHandler={'fade'}
        >
            {sliderData.map(slide => (
                <Slide key={slide.id}>
                    <SlideImg src={slide.image} alt={slide.alt} />
                    <SlideOverlay>
                        <SlideOverlayH2>
                            {slide.header}
                        </SlideOverlayH2>
                        <SlideOverlayH1>
                            {slide.title}
                        </SlideOverlayH1>
                        <SlideOverlayText>
                            {slide.text}
                        </SlideOverlayText>
                        <SlideButtonContainer>
                        <SlideButton>
                            {slide.button}
                        </SlideButton>
                    </SlideButtonContainer>
                    </SlideOverlay>
                </Slide>
            ))}
        </Carousel>
    
  )
};
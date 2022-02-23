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
    
    // const sliderData = [
    //     {
    //         id: 1,
    //         image: 'CLIENT/src/assets/images/carousel/tissus.png',
    //         alt: 'tissuthèque',
    //         header: 'DIGITALISEZ VOTRE',
    //         title: 'TISSUTHEQUE',
    //         text: 'Accédez à tout moment à votre stock de tissus classé par type, couleurs, designers ...',
    //         button: 'Je crée ma tissuthèque'
    //     },
    //     {
    //         id: 2,
    //         image: '/home/maylis/ytrema/CLIENT/src/assets/images/carousel/mercerie.png',
    //         alt: 'merceriethèque',
    //         header: 'DIGITALISEZ VOTRE',
    //         title: 'MERCERIETHEQUE',
    //         text: "Accédez à tout moment à votre stock d'articles de mercerie classé par type, couleurs, designers... ",
    //         button: 'Je crée ma merceriethèque'
    //     },
    //     {
    //         id: 3,
    //         image: '../assets/images/carousel/patron.png',
    //         alt: 'patronthèque',
    //         header: 'DIGITALISEZ VOTRE',
    //         title: 'PATRONTHEQUE',
    //         text: 'Accédez à tout moment à votre librairie de patrons classée par type, designer, genre...',
    //         button: 'Je crée ma patronthèque'
    //     },
    //     {
    //         id: 4,
    //         image: '../assets/images/carousel/projet.png',
    //         header: 'DIGITALISEZ VOTRE',
    //         alt: 'projet couture digitalisé',
    //         title: 'PROJET',
    //         text: "Créez votre projet couture en ligne, associez tissus, mercerie et patrons, ajoutez des notes personnelles et des photos. Calcul automatique des stocks et coût de revient.",
    //         button: 'Je crée mon projet'
    //     },
    // ];

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
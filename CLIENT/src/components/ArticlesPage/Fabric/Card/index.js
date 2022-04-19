import React, {useRef, useEffect, useCallback }  from 'react';
import { useMediaQuery } from 'react-responsive';
import { DeviceSize } from '../../../Navbar/Responsive';
import { CardContainer, 
         CardTitle, 
         CloseButton, 
         Container,
         ImageCard,
         ImageContainer,
         InformationContainer,
         InformationForm,
         InformationInput,
         InformationContent,
         InformationLabel,
         ModifyButton,
         ReturnArrow,
         TitleContainer,
         ProjectContainer,
         ProjectImageContainer,
         ProjectImage,
         ProjectTitle, 
        } from './style';
import { fabricData } from '../../../../utils/fabricData';
import { fabricInputs } from '../../../../utils/fabricInputs';


export const Card = ({showCard, setShowCard, fabricImage}) => {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
    const cardRef = useRef();
    const closeCard = event => {
        if (cardRef.current === event.target) {
            setShowCard(false);
        }
    };
    const keyPress = useCallback(event => {
        if(event.key === 'Escape' && showCard) {
            setShowCard(false)
        }
    },  [setShowCard, showCard]);

    useEffect(() => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress)
    }, [keyPress])
  return (
    <>
    
    {isMobile && 
        <Container>
        <CardContainer>
            <ReturnArrow
                aria-label='Close card'
                ref= {cardRef}
                onClick={closeCard}
            />
            <CloseButton
                aria-label='Delete card'
                ref= {cardRef}
                onClick={closeCard}
            />
            <ModifyButton />
            <TitleContainer>
                <CardTitle>
                    Titre du tissu - Designer
                </CardTitle>
            </TitleContainer>
            <ImageContainer>
                <ImageCard 
                    src='http://react-responsive-carousel.js.org/assets/2.jpeg'
                />
            </ImageContainer>
            <InformationContainer>
                <InformationForm>
                    {fabricInputs.map((input, index) => (
                        <InformationContent>
                            <InformationLabel
                                key = {input.id}
                            >
                            {input.label}
                            </InformationLabel>
                            <InformationInput
                                key= {input.index}
                            >
                            </InformationInput>
                        </InformationContent>
                        
                    ))}
                    
                </InformationForm>
                <ProjectContainer>
                <ProjectTitle> 
                    Projets avec ce tissu
                </ProjectTitle>
                <ProjectImageContainer>
                    <ProjectImage
                        src='http://react-responsive-carousel.js.org/assets/2.jpeg'
                    />
                    <ProjectImage
                        src='http://react-responsive-carousel.js.org/assets/2.jpeg'
                    />
                    <ProjectImage
                        src='http://react-responsive-carousel.js.org/assets/2.jpeg'
                    />
                </ProjectImageContainer>
               
                
            </ProjectContainer>
            </InformationContainer>
            
        </CardContainer>

    </Container>
    }

    {isDesktop && 
        <Container>
        <CardContainer>
            <ReturnArrow
                aria-label='Close card'
                ref= {cardRef}
                onClick={closeCard}
            />
            <CloseButton
                aria-label='Delete card'
                ref= {cardRef}
                onClick={closeCard}
            />
            <ModifyButton />
           
            <ImageContainer>
                <ImageCard 
                    src='http://react-responsive-carousel.js.org/assets/2.jpeg'
                />
            </ImageContainer>

            <InformationContainer>
                <TitleContainer>
                    <CardTitle>
                        Titre du tissu - Designer
                    </CardTitle>
                </TitleContainer>
                <InformationForm>
                    {fabricInputs.map((input, index) => (
                        <InformationContent>
                            <InformationLabel
                                key = {input.id}
                            >
                            {input.label}
                            </InformationLabel>
                            <InformationInput
                                key= {input.index}
                                
                                
                            >
                        
                            </InformationInput>
                        </InformationContent>
                        
                    ))}
                    
                </InformationForm>
                <ProjectContainer>
                <ProjectTitle> 
                    Projets avec ce tissu
                </ProjectTitle>
                <ProjectImageContainer>
                    <ProjectImage
                        src='http://react-responsive-carousel.js.org/assets/2.jpeg'
                    />
                    <ProjectImage
                        src='http://react-responsive-carousel.js.org/assets/2.jpeg'
                    />
                    <ProjectImage
                        src='http://react-responsive-carousel.js.org/assets/2.jpeg'
                    />
                </ProjectImageContainer>
               
                
            </ProjectContainer>
            </InformationContainer>
            
        </CardContainer>

    </Container>
    }
        
    
        
   
    </>
  )
};




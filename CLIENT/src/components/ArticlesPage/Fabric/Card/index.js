import React, { useRef, useEffect, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useDispatch, useSelector } from 'react-redux';
import { DeviceSize } from '../../../Navbar/Responsive';
import {
    CardContainer,
    CardTitle,
    TrashButton,
    ButtonsContainer,
    ReturnArrowContainer,
    ModifyDeleteContainer,
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
import { useParams, useNavigate } from 'react-router-dom';
// import { useGetAllFabricsQuery } from "../../../../src/store/api/ytremaApi";
// import {
//     updateFabric,
//     deleteFabric,
//   } from "../../../store/state/fabricSlice";

export const Card = (fabric) => {
    const { id } = useParams();
    console.log(id, 'ici ID')
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
    const cardRef = useRef();
    let navigate = useNavigate();


    const dispatch = useDispatch();
    //read info from store
    const { persistedReducer } = useSelector((state) => state);
    //   const auth = persistedReducer.auth;
    const fabrics = persistedReducer.fabrics;
    //   const isLogged = auth.isLogged;
    //   const { data, error, isLoading, isSuccess } = useGetAllFabricsQuery(auth.id);


    const fabricCard = fabrics.value.find((fabric) => fabric.id == id);

    // const closeCard = event => {
    //     if (cardRef.current === event.target) {
    //         setShowCard(false);
    //     }
    // };
    // const keyPress = useCallback(event => {
    //     if(event.key === 'Escape' && showCard) {
    //         setShowCard(false)
    //     }
    // },  [setShowCard, showCard]);

    // useEffect(() => {
    //     document.addEventListener('keydown', keyPress);
    //     return () => document.removeEventListener('keydown', keyPress)
    // }, [keyPress])
    return (
        <>

            {isMobile &&
                <Container>
                    <CardContainer>
                        <ButtonsContainer>
                            <ReturnArrowContainer>
                                <ReturnArrow
                                    aria-label='Close card'
                                    ref={cardRef}
                                    onClick={() => {
                                        navigate("/Tissus");
                                    }}
                                />
                            </ReturnArrowContainer>
                            <ModifyDeleteContainer>
                                <ModifyButton />
                                <TrashButton
                                    aria-label='Delete card'
                                    ref={cardRef}
                                // onClick={deleteCard}
                                />
                            </ModifyDeleteContainer>
                            
                        </ButtonsContainer>
                        
                        <TitleContainer>
                            <CardTitle>
                                {fabricCard.name} - {fabricCard.designer}
                            </CardTitle>
                        </TitleContainer>
                        <ImageContainer>
                            <ImageCard
                                src={fabricCard.photo}
                            />
                        </ImageContainer>
                        <InformationContainer>
                            <InformationForm>
                                {fabricInputs.map((input, index) => (
                                    index !== 0 ? (
                                        <InformationContent
                                        key={input.id}
                                        >
                                            <InformationLabel>
                                                {input.label}
                                            </InformationLabel>
                                            <InformationInput
                                                value={fabricCard[(input.info)]}
                                                disabled='disabled'
                                                type= {input.id === 5 ? 'color' : input.type}
                                            >

                                            </InformationInput>
                                        </InformationContent>
                                    ) : null
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
                            ref={cardRef}
                            onClick={closeCard}
                        />
                        <CloseButton
                            aria-label='Delete card'
                            ref={cardRef}
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
                                            key={input.id}
                                        >
                                            {input.label}
                                        </InformationLabel>
                                        <InformationInput
                                            key={input.index}


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




import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useDispatch, useSelector } from 'react-redux';
import { DeviceSize } from '../../../Navbar/Responsive';
import {
    CardContainer,
    CardTitle,
    DesignerTitle,
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
import { useDeleteOneFabricMutation } from "../../../../../src/store/api/ytremaApi";
import {
    // updateFabric,
    deleteFabric,
} from "../../../../store/state/fabricSlice";

export const Card = (fabric, isOpenModal, setShowModal, showModal) => {
    const { id } = useParams();
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
    const cardRef = useRef();
    let navigate = useNavigate();


    const dispatch = useDispatch();
    const { persistedReducer } = useSelector((state) => state);
    const auth = persistedReducer.auth;
    const fabrics = persistedReducer.fabrics;
    const fabricCard = fabrics.value.find((fabric) => fabric.id == id);
    const [deleteOneFabric, { data, isLoading, isSuccess, isError }] = useDeleteOneFabricMutation(fabricCard.id, auth.id);




    const deleteCard = () => {
        const urlParams = {
            memberId: auth.id,
            fabricId: fabricCard.id
        }
        deleteOneFabric(urlParams);
        dispatch(deleteFabric(fabricCard.id));
        navigate('/Tissus');
    };


    // useEffect( () => {
    //     console.log('coucou avant is success')
    //     if (isSuccess) { 
    //         console.log('coucou dans is success')


    //     }
    // }, [fabrics]);

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
                                    onClick={deleteCard}
                                />
                            </ModifyDeleteContainer>

                        </ButtonsContainer>

                        <TitleContainer>
                            <CardTitle>
                                {fabricCard.name}
                            </CardTitle>
                            <DesignerTitle>
                                {fabricCard.designer}
                            </DesignerTitle>
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
                                                type={input.id === 5 ? 'color' : input.type}
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
                                onClick={deleteCard}
                            />
                        </ModifyDeleteContainer>

                    </ButtonsContainer>
                    <CardContainer>
                        <ImageContainer>
                            <ImageCard
                                src={fabricCard.photo}
                            />
                        </ImageContainer>

                        <InformationContainer>
                            <TitleContainer>
                                <CardTitle>
                                {fabricCard.name} -  {fabricCard.designer}
                                </CardTitle>
                            </TitleContainer>
                            <InformationForm>
                                {fabricInputs.map((input, index) => (
                                    index !== 0 ? (
                                    <InformationContent>
                                        <InformationLabel
                                            key={input.id}
                                        >
                                            {input.label}
                                        </InformationLabel>
                                        <InformationInput
                                            value={fabricCard[(input.info)]}
                                            disabled='disabled'
                                            type={input.id === 5 ? 'color' : input.type}
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

        </>
    )
};




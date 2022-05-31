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
    ButtonForm,
    ModifyButton,
    ReturnArrow,
    TitleContainer,
    ProjectContainer,
    ProjectImageContainer,
    ProjectImage,
    ProjectTitle,
    InformationSelect,
} from './style';
import { fabricData } from '../../../../utils/fabricData';
import { fabricInputs } from '../../../../utils/fabricInputs';
import { useParams, useNavigate } from 'react-router-dom';
import { useDeleteOneFabricMutation, useUpdateOneFabricMutation } from "../../../../../src/store/api/ytremaApi";
import {
    updateFabric,
    deleteFabric,
} from "../../../../store/state/fabricSlice";
import { ErrorMessage } from '../Input/Input.style';

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
    const [deleteOneFabric] = useDeleteOneFabricMutation(fabricCard.id, auth.id);
    const [updateOneFabric, { data, isLoading, isSuccess, error }] = useUpdateOneFabricMutation(fabricCard.id, auth.id);
    const [updateFabric, setUpdateFabric] = useState(true);


    const deleteCard = () => {
        const urlParams = {
            memberId: auth.id,
            fabricId: fabricCard.id
        }
        deleteOneFabric(urlParams);
        dispatch(deleteFabric(fabricCard.id));
        navigate('/Tissus');
    };

    const [values, setValues] = useState({
        photo: fabricCard.photo,
        name: fabricCard.name,
        website: fabricCard.website,
        designer: fabricCard.designer,
        color: fabricCard.color,
        precise_color: fabricCard.precise_color,
        fabric: fabricCard.fabric,
        composition: fabricCard.composition,
        weight: fabricCard.weight,
        quantity: fabricCard.quantity,
        width: fabricCard.width,
        price: fabricCard.price,
    });
    //handle error message
    const [isError, setIsError] = useState(false);

    // const handleBlur = (event, pattern) => {
    //     if (!event.target.value) {
    //         setIsError(true);
    //     } else {
    //         // Vérifier la value
    //         const regex = new RegExp(pattern);

    //         // console.log(regex.test(event.target.value));
    //         if (!regex.test(event.target.value)) {
    //             // console.log("C'est faux on balance la phrase");
    //             setIsError(true);
    //         } else {
    //             setIsError(false);
    //         }
    //     }
    //     console.log(pattern, event,'<-ici pattern / event')
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const valuesToSend = values;
        // valuesToSend.photo = photoURL;
        const urlParams = {
            memberId: auth.id,
            fabricId: fabricCard.id,
            body: valuesToSend
        }

        await updateOneFabric(urlParams);
    };



    const onChange = (event) => {
        
        setValues({ ...values, [event.target.name]: event.target.value });
    
        //ici on check avec un switch les patterns et on affiche les messages d'erreur en fonction
        // if (event.target.name === 'photo') {
        //     onSelectFile(event);
        //     if (!event.target.files || event.target.files.length > 0) {
        //         handleUpload(event.target.files[0]);
        //     }

        // }
    };

    const updateCard = () => {

    }

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
                            {updateFabric ?
                                <InformationForm
                                    onSubmit={handleSubmit}
                                >
                                    {fabricInputs.map((input, index) => (
                                        index !== 0 ? (
                                            <InformationContent
                                                key={input.id}
                                            >
                                                <InformationLabel
                                                    htmlFor={input.htmlFor}
                                                >
                                                    {input.label}
                                                </InformationLabel>
                                                {input.type !== 'select' ?
                                                    <InformationInput
                                                        placeholder={values[(input.info)]}
                                                        onChange={onChange}
                                                        type={input.type}
                                                        name={input.name}
                                                        onBlur={(event) => {
                                                            if (!event.target.value) {
                                                                setIsError(true);
                                                            } else {
                                                                // Vérifier la value
                                                                const regex = new RegExp(input.pattern);

                                                                // console.log(regex.test(event.target.value));
                                                                if (!regex.test(event.target.value)) {
                                                                    // console.log("C'est faux on balance la phrase");
                                                                    setIsError(true);
                                                                } else {
                                                                    setIsError(false);
                                                                }
                                                            }

                                                        }}
                                                        className={isError && 'input-false'}
                                                        pattern={input.pattern}
                                                    ></InformationInput>
                                                    :
                                                    <InformationSelect
                                                        placeholder={values[(input.info)]}
                                                        onChange={onChange}
                                                        name={input.name}
                                                        type={input.type}
                                                        id={input.htmlFor}
                                                        defaultValue={values[(input.info)]}
                                                    // onBlur={handleBlur}
                                                    >
                                                        {/* <option value={values[(input.info)]} defaultValue={values[(input.info)]} disabled hidden  >--Choisissez votre {input.label.toLowerCase()}--</option> */}
                                                        {input.optionsList.sort().map((option, index) => (
                                                            option === values[(input.info)] ?
                                                                <option key={index} value={option} >
                                                                    {option}
                                                                </option>
                                                                :
                                                                <option key={index} value={option}>
                                                                    {option}
                                                                </option>
                                                        ))}
                                                    </InformationSelect>
                                                }
                                                {isError ? <ErrorMessage>{input.errorMessage}</ErrorMessage> : null}


                                            </InformationContent>
                                        ) : null
                                    ))}
                                    <ButtonForm>Enregistrer</ButtonForm>
                                </InformationForm>
                                :
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
                            }

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




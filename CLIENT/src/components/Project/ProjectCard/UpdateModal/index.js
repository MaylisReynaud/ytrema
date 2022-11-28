import React, { useRef, useEffect, useCallback } from 'react';
import {
    Background,
    Container,
    ModalWrapper,
    ModalContent,
    CloseModalButton,
    UpdateButton,
    UpdateContainer,
    UpdateTitle,
    ButtonsContainer,
    CancelContainer,
    CancelButton,
} from './style';

import {
    FormContainer,
    Form,
    LabelInputContainer,
    InformationLabel,
    InformationInput,
    InformationSelect
} from '../../AddProject/style';



export const UpdateModal = ({ showUpdateModal, setShowUpdateModal, updateAction, word, onChange, values, setValues, handleSubmit, projectCard }) => {
    console.log(values, "<--values");

    const closeUpdateModal = () => {
        setShowUpdateModal(false);
    };

    const keyPress = useCallback(event => {
        if (event.key === 'Escape' && showUpdateModal) {
            setShowUpdateModal(false)
        }
    }, [setShowUpdateModal, showUpdateModal]);

    useEffect(() => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress)
    }, [keyPress])
    return (
        <>
            {showUpdateModal ? (
                <Container
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}

                >
                    <Background
                    // onClick={closeUpdateModal}
                    >
                        <ModalWrapper
                            showUpdateModal={showUpdateModal}
                        >
                            <ModalContent>
                                <UpdateTitle>{word}</UpdateTitle>

                                <FormContainer>
                                    <Form>
                                        <LabelInputContainer>
                                            <InformationLabel 
                                                htmlFor="name"
                                                className='update'
                                            >
                                                Nom du projet
                                                </InformationLabel>
                                            <InformationInput
                                                id="name"
                                                type="text"
                                                name="name"
                                                className='update'
                                                onChange={onChange}
                                                placeholder={values.name}
                                            // onChange={onChange}
                                            ></InformationInput>
                                        </LabelInputContainer>
                                        <LabelInputContainer>
                                        <InformationLabel 
                                                htmlFor="status"
                                                className='update'
                                            >
                                                Statut
                                                </InformationLabel>
                                            <InformationSelect
                                                id="status"
                                                name="status"
                                                className='update'
                                                onChange={onChange}
                                            //add a key
                                            >
                                                <option value={values.status} defaultValue>
                                                    --Choisissez votre statut--
                                                </option>
                                                <option value="Découpe du patron">Découpe du patron</option>
                                                <option value="Découpe du tissu">Découpe du tissu</option>
                                                <option value="Couture">Couture</option>
                                                <option value="Terminé">Terminé</option>
                                            </InformationSelect>
                                        </LabelInputContainer>
                                    </Form>
                                </FormContainer>
                                <ButtonsContainer>
                                    <CancelContainer>
                                        <CancelButton
                                            onClick={closeUpdateModal}
                                        >
                                            Annuler
                                        </CancelButton>
                                    </CancelContainer>
                                    <UpdateContainer>
                                        <UpdateButton
                                            onClick={(event) => {
                                                handleSubmit(event);
                                                closeUpdateModal();
                                            }}

                                        >
                                            Mettre à jour
                                        </UpdateButton>


                                    </UpdateContainer>
                                </ButtonsContainer>


                            </ModalContent>
                            <CloseModalButton
                                aria-label='Close modal'
                                onClick={closeUpdateModal}
                            />
                        </ModalWrapper>
                    </Background>
                </Container>
            ) : null}
        </>
    )
};


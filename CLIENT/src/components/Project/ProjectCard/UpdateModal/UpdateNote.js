import React, { useEffect, useCallback } from 'react';
import {
    Background,
    Container,
    ModalWrapper,
    ModalContent,
    CloseModalButton,
    ButtonsContainer,
    CancelContainer,
    CancelButton,
    UpdateButton,
    UpdateContainer,
    UpdateTitle,
    InformationContainer,
    TitleContainer,
    CloseButtonContainer,
    NoteTextArea
} from '../AddArticleModal/style';

import {
    FormContainer,
    Preview,
    PreviewContainer,
    Form,
    PreviewButtonContainer,
    PictureInputContainer,
    PictureInput,
    Text

} from '../../AddProject/style';

import { useSelector } from "react-redux";

export const UpdateNote = (props) => {
    const {
        showUpdateModal,
        setShowUpdateModal,
        word,
        noteOnChange,
        noteValues,
        setNoteValues,
        handleNoteSubmit,
        pictureURL,
        setPictureURL,
        preview,
        photosArrayId,
        noteInfo
    } = props

    const { persistedReducer } = useSelector((state) => state);

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
                    >
                        <ModalWrapper
                            className='addNote'
                        >
                            <CloseButtonContainer>
                                <CloseModalButton
                                    aria-label='Close modal'
                                    onClick={() => setShowUpdateModal(prev => !prev)}
                                />
                            </CloseButtonContainer>
                            <ModalContent
                                className='addNote'
                            >

                                <TitleContainer
                                    className='addNote'
                                >
                                    <UpdateTitle>{word}</UpdateTitle>
                                </TitleContainer>

                                <FormContainer
                                    className='addNote'
                                >
                                    <Form>
                                        {/* CHOISIR UNE PHOTO DE PROFIL AU PROJET */}
                                        <PreviewContainer>

                                            <Text>Illustrer avec une photo (optionnel)</Text>

                                            <PreviewButtonContainer>
                                                
                                                    <Preview
                                                        className='addNote'
                                                        src={preview ? preview : noteValues.photo}></Preview>
                                            </PreviewButtonContainer>
                                            <PictureInputContainer
                                                className='addNote'
                                            >
                                                <label htmlFor="photo"></label>
                                                <PictureInput
                                                    htmlFor="photo"
                                                    accept="image/*"
                                                    placeholder="Photo du projet"
                                                    type="file"
                                                    name="photo"
                                                    onChange={noteOnChange}
                                                >
                                                </PictureInput>
                                            </PictureInputContainer>
                                        </PreviewContainer>
                                        <InformationContainer
                                            className='addNote'
                                        >
                                            <NoteTextArea
                                                htmlFor="personal_notes"
                                                name="personal_notes"
                                                rows={'10'}
                                                onChange={noteOnChange}
                                                placeholder={noteValues.personal_notes}
                                                values={noteValues.personal_notes}

                                            >

                                            </NoteTextArea>
                                        </InformationContainer>
                                        {/* </AddOneArticleContainer> */}
                                    </Form>
                                </FormContainer>
                                <ButtonsContainer
                                    className='addNote'
                                >
                                    <CancelContainer
                                        className='addNote'
                                    >
                                        <CancelButton
                                            onClick={closeUpdateModal}
                                        >
                                            Annuler
                                        </CancelButton>
                                    </CancelContainer>
                                    <UpdateContainer
                                        className='addNote'
                                    >
                                        <UpdateButton
                                            className='addNote'
                                            onClick={(event) => {
                                                handleNoteSubmit(event);
                                                closeUpdateModal();
                                            }}

                                        >
                                            Ajouter
                                        </UpdateButton>
                                    </UpdateContainer>
                                </ButtonsContainer>
                            </ModalContent>
                        </ModalWrapper>
                    </Background>
                </Container>
            ) : null}
        </>
    )
};



import React, { useEffect, useCallback, useState } from 'react';
import {
    AddOneArticleContainer,
    FormContainer,
    Preview,
    PreviewContainer,
    Form,
    PreviewButtonContainer,
    PictureInputContainer,
    PictureInput,
    Text
} from '../../AddProject/style';
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
} from './style';

import YtremaLogo from "../../../../assets/images/logo.png";




export const AddNoteModal = (props) => {
    const {
        showAddNoteModal,
        setShowAddNoteModal,
        word,
        addNoteOnChange,
        addNoteValues,
        setAddNoteValues,
        handleAddNoteSubmit,
        preview,
        pictureURL,
        setPictureURL
    } = props;

    const closeAddNoteModal = () => {
        setShowAddNoteModal(false);
    };

    const keyPress = useCallback(event => {
        if (event.key === 'Escape' && showAddNoteModal) {
            setShowAddNoteModal(false)
        }
    }, [setShowAddNoteModal, showAddNoteModal]);

    useEffect(() => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress)
    }, [keyPress]);



    return (
        <>
            {showAddNoteModal ? (
                <Container
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}

                >
                    <Background>
                        <ModalWrapper
                            className='addNote'
                            showNoteModal={showAddNoteModal}
                        >
                            <CloseButtonContainer>
                                <CloseModalButton
                                    aria-label='Close modal'
                                    onClick={() => setShowAddNoteModal(prev => !prev)}
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
                                        {/* <AddOneArticleContainer> */}
                                        {/* CHOISIR UNE PHOTO DE PROFIL AU PROJET */}
                                        <PreviewContainer>

                                            <Text>Illustrer avec une photo (optionnel)</Text>

                                            <PreviewButtonContainer>
                                                {addNoteValues.photo ?
                                                    <Preview
                                                        className='addNote'
                                                        src={preview}></Preview>
                                                    :
                                                    <Preview
                                                        className='addNote'
                                                        src={YtremaLogo}></Preview>
                                                }

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
                                                    onChange={addNoteOnChange}
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
                                                onChange={addNoteOnChange}
                                                placeholder={'écrivez votre note ici ...'}

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
                                            onClick={closeAddNoteModal}
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
                                                handleAddNoteSubmit(event);
                                                closeAddNoteModal();
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


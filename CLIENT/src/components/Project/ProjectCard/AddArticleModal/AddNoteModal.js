
import React, { useRef, useEffect, useCallback } from 'react';
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
        word
    } = props;

    const modalRef = useRef();
    const closeModal = (event) => {
        if (modalRef.current === event.target) {
            setShowAddNoteModal(false);
        }
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
                    <Background
                        ref={modalRef}
                        onClick={closeModal}
                    >
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

                                            <PreviewButtonContainer
                                            // className="firstShow"
                                            >
                                                {/* {values.photo ?
                                                    <Preview src={preview}></Preview>
                                                    : */}
                                                <Preview
                                                    className='addNote'
                                                    src={YtremaLogo}></Preview>
                                                {/* } */}


                                            </PreviewButtonContainer>
                                            <PictureInputContainer
                                                className='addNote'
                                            >
                                                <label htmlFor="projectPicture"></label>
                                                <PictureInput
                                                    htmlFor="projectPicture"
                                                    accept="image/*"
                                                    placeholder="Photo du projet"
                                                    type="file"
                                                    name="photo"
                                                // onChange={onChange}
                                                >
                                                </PictureInput>
                                            </PictureInputContainer>
                                        </PreviewContainer>
                                        <InformationContainer
                                            className='addNote'
                                        >
                                            <NoteTextArea
                                                rows={'10'}
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
                                            onClick={closeModal}
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
                                                // handleAddFabricSubmit(event);
                                                closeModal();
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


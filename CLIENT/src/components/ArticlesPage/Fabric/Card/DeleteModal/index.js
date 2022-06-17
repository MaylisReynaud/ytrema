import React, { useRef, useEffect, useCallback } from 'react';
import {
    Background,
    Container,
    ModalWrapper,
    ModalContent,
    CloseModalButton,
    DeleteButton,
    DeleteContainer,
    DeleteParagraph,
    DeleteTitle,
    ButtonsContainer,
    CancelContainer,
    CancelButton,

} from './style';



export const DeleteFabricModal = ({ showDeleteModal, setShowDeleteModal, deleteCard }) => {
    const deleteModalRef = useRef();
    const closeDeleteModal = () => {
            setShowDeleteModal(false);
    };

    const keyPress = useCallback(event => {
        if (event.key === 'Escape' && showDeleteModal) {
            setShowDeleteModal(false)
        }
    }, [setShowDeleteModal, showDeleteModal]);

    useEffect(() => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress)
    }, [keyPress])
    return (
        <>
            {showDeleteModal ? (
                <Container
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}

                >
                    <Background
                        // ref={deleteModalRef}
                        onClick={closeDeleteModal}
                    >
                        <ModalWrapper
                            showDeleteModal={showDeleteModal}
                        >
                            <ModalContent>

                                <DeleteTitle>SUPPRIMER CE TISSU</DeleteTitle>
                                <DeleteParagraph>Cette action est irréversible, êtes vous sûr(e)? </DeleteParagraph>
                                <ButtonsContainer>
                                    <CancelContainer>
                                        <CancelButton
                                            onClick={closeDeleteModal}
                                        >
                                            Annuler
                                        </CancelButton>
                                    </CancelContainer>
                                    <DeleteContainer>
                                        <DeleteButton
                                            onClick={deleteCard}
                                        >
                                            Supprimer
                                        </DeleteButton>
                                    </DeleteContainer>
                                </ButtonsContainer>


                            </ModalContent>
                            <CloseModalButton
                                aria-label='Close modal'
                                onClick={closeDeleteModal}
                            />
                        </ModalWrapper>
                    </Background>
                </Container>
            ) : null}
        </>
    )
};


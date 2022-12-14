import React, { useRef, useEffect, useCallback, useState } from 'react';
import { DeleteModal } from '.';
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



export const DeleteAllProject = ({ showDeleteModal, setShowDeleteModal, deleteAction, word, deleteAll, setDeleteAll, isOpeningDeleteModal }) => {
    useEffect(() => {
        if(deleteAll) {
            console.log("coucou dans use effect")
            setShowDeleteModal(true)
        }
    }, [deleteAll])


    console.log(deleteAll, "<--deleteAll")
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
            {(showDeleteModal && deleteAll == false ) ? ( 
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
                            className='deleteAll'
                            showDeleteModal={showDeleteModal}
                        >
                            <ModalContent>

                                <DeleteTitle>{word}</DeleteTitle>
                                
                                    <>
                                        <DeleteParagraph>
                                            Souhaitez-vous remettre dans votre stock l'ensemble des articles utilisés sur ce projet?
                                        </DeleteParagraph>
                                        <ButtonsContainer
                                            className='deleteAll'
                                        >
                                            <CancelContainer>
                                                <DeleteButton
                                                    onClick={() => {
                                                        setDeleteAll(false)
                                                    }}
                                                    className="returnStock"
                                                >
                                                    Remettre en stock
                                                </DeleteButton>
                                            </CancelContainer>
                                            <DeleteContainer>
                                                <DeleteButton
                                                    onClick={() => {
                                                        setDeleteAll(true)
                                                        setShowDeleteModal(true)
                                                    }}

                                                >
                                                    Supprimer tout
                                                </DeleteButton>
                                               
                                              
                                                



                                            </DeleteContainer>
                                        </ButtonsContainer>
                                  </>
                            </ModalContent>
                            <CloseModalButton
                                aria-label='Close modal'
                                onClick={closeDeleteModal}
                            />
                        </ModalWrapper>
                    </Background>
                </Container>
            ) : 
            ( (showDeleteModal == true && deleteAll ) ? (
                <DeleteModal
                setShowDeleteModal={setShowDeleteModal}
                showDeleteModal={showDeleteModal}
                deleteAction={deleteAction}
                word={'SUPPRIMER CE PROJET'}
            />
            ) : null
               
            )
            }
        </>
    )
};


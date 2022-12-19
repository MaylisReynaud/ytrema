import React, { useEffect, useCallback, useState } from 'react';
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



export const DeleteAllProject = (props) => {
    const {
        showDeleteModal, 
        setShowDeleteModal, 
        deleteAction, 
        word, 
        deleteAll, 
        setDeleteAll, 
        restoreAction,
        projectCard,
        entityValues,
        setEntityValues 
    } = props;

    useEffect(() => {
        if(deleteAll) {
            setShowDeleteModal(true)
        }
    }, [deleteAll]);

    // useEffect(()=> {
    //     projectCard.fabric_array.map((article) => {
    //          setEntityValues({
    //              ...entityValues,
    //              entity: "fabric",
    //              entityId: article.id
    //          })
    //      }) 
    //  }, [projectCard.fabric_array]);
   
  
   
    // const haberdasheryMap = projectCard.haberdashery_array.map((id) => {
    //     setEntityValues({
    //         ...entityValues,
    //         entity: "haberdashery",
    //         entityId: id
    //     })
    // });
    // const patternMap = projectCard.pattern_array.map((id) => {
    //     setEntityValues({
    //         ...entityValues,
    //         entity: "pattern",
    //         entityId: id
    //     })
    // });


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
                                                    onClick={async() => {
                                                           await setDeleteAll(false);
                                                           await restoreAction();
                                                           await deleteAction();
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


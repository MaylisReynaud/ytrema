import React, { useEffect, useCallback } from 'react';
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
    AddOneArticleContainer,
    PreviewContainer,
    PreviewButtonContainer,
    Preview,
    SelectedArticleInfo,
    QuantityContainer,
    QuantityInput,
    QuantityLabel
} from '../../AddProject/style';

import { useSelector } from "react-redux";

export const UpdateFabric = (props) => {
    const { 
        showUpdateModal, 
        setShowUpdateModal, 
        word, 
        fabricOnChange, 
        fabricValues, 
        setFabricValues, 
        handleFabricSubmit, 
    } = props

    const { persistedReducer } = useSelector((state) => state);

    const fabrics = persistedReducer.fabrics;
    const fabricCard = fabrics.value.find((fabric) => fabric.id == fabricValues.fabricId);


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
                            className='updateArticle'
                            showUpdateModal={showUpdateModal}
                        >
                            <ModalContent
                                className='articleUpdate       '
                            >
                                <UpdateTitle>{word}</UpdateTitle>

                                <FormContainer>
                                    <Form>
                                        <AddOneArticleContainer key={fabricCard.id}>
                                            <PreviewContainer
                                                className='articleUpdate'
                                            >
                                                <PreviewButtonContainer>
                                                    <Preview src={fabricCard.photo}></Preview>
                                                    
                                                </PreviewButtonContainer>

                                                <SelectedArticleInfo>
                                                    {fabricCard.name} - {fabricCard.designer} - quantité en stock : {" "}
                                                    {fabricCard.stock_qty} cm
                                                </SelectedArticleInfo>
                                                <QuantityContainer>
                                                    <QuantityLabel htmlFor="fabric_used_size">
                                                        Quantité
                                                    </QuantityLabel>
                                                    <QuantityInput
                                                        type="number"
                                                        mobile
                                                        id="fabric_used_size"
                                                        data-selectedfabricid={fabricCard.id}
                                                        name="used_size"
                                                        max={fabricCard.stock_qty}
                                                        step="1"
                                                        placeholder={
                                                            fabricValues.old_used_size
                                                        }
                                                        onChange={fabricOnChange}
                                                    ></QuantityInput>
                                                </QuantityContainer>
                                            </PreviewContainer>
                                        </AddOneArticleContainer>
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
                                                handleFabricSubmit(event);
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


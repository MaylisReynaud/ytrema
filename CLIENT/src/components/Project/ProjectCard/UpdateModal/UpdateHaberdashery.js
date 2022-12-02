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

export const UpdateHaberdashery = (props) => {
    const { 
        showUpdateModal, 
        setShowUpdateModal, 
        word, 
        haberdasheryOnChange, 
        haberdasheryValues, 
        setHaberdasheryValues, 
        handleHaberdasherySubmit, 
    } = props

    const { persistedReducer } = useSelector((state) => state);

    const haberdasheries = persistedReducer.haberdasheries;
    const haberdasheryCard = haberdasheries.value.find((haberdashery) => haberdashery.id == haberdasheryValues.haberdasheryId);


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
                                className='articleUpdate'
                            >
                                <UpdateTitle>{word}</UpdateTitle>

                                <FormContainer>
                                    <Form>
                                        <AddOneArticleContainer key={haberdasheryCard.id}>
                                            <PreviewContainer
                                                className='articleUpdate'
                                            >
                                                <PreviewButtonContainer>
                                                    <Preview src={haberdasheryCard.photo}></Preview>
                                                    
                                                </PreviewButtonContainer>

                                                <SelectedArticleInfo>
                                                    {haberdasheryCard.name} - quantité en stock : {" "}
                                                    {haberdasheryCard.stock_qty}
                                                </SelectedArticleInfo>
                                                <QuantityContainer>
                                                    <QuantityLabel htmlFor="haberdashery_used_size">
                                                        Quantité
                                                    </QuantityLabel>
                                                    <QuantityInput
                                                        type="number"
                                                        mobile
                                                        id="haberdashery_used_size"
                                                        data-selectedhaberdasheryid={haberdasheryCard.id}
                                                        name="used_size"
                                                        max={haberdasheryCard.stock_qty}
                                                        step="1"
                                                        placeholder={
                                                            haberdasheryValues.old_used_size
                                                        }
                                                        onChange={haberdasheryOnChange}
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
                                                handleHaberdasherySubmit(event);
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


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
    AddOneArticleContainer,
    PreviewContainer,
    PreviewButtonContainer,
    Preview,
    SelectedArticleInfo,
    QuantityContainer,
    QuantityInput,
    QuantityLabel
} from '../../AddProject/style';

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const UpdateArticle = (props) => {
    const { 
        showUpdateModal, 
        setShowUpdateModal, 
        updateAction, 
        word, 
        onChange, 
        values, 
        setValues, 
        handleSubmit, 
        fabric 
    } = props
    console.log(values, "<--values");
    const { id } = useParams();
    const { persistedReducer } = useSelector((state) => state);
    const auth = persistedReducer.auth;
    const fabrics = persistedReducer.fabrics;
    const fabricCard = fabrics.value.find((fabric) => fabric.id == id);
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
                            className='updateArticle'
                            showUpdateModal={showUpdateModal}
                        >
                            <ModalContent
                                className='articleUpdate'
                            >
                                <UpdateTitle>{word}</UpdateTitle>

                                <FormContainer>
                                    <Form>
                                        <AddOneArticleContainer key={fabric.id}>
                                            <PreviewContainer
                                                className='articleUpdate'
                                            >
                                                <PreviewButtonContainer>
                                                    <Preview src={fabric.photo}></Preview>
                                                    
                                                </PreviewButtonContainer>

                                                <SelectedArticleInfo>
                                                    {fabricCard.name} - {fabricCard.designer} - quantité en stock : 
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
                                                        data-selectedfabricid={fabric.id}
                                                        name="fabric_used_size"
                                                        max={fabric.stock_qty}
                                                        step="1"
                                                        placeholder={
                                                            fabric.used_size
                                                        }
                                                        onChange={onChange}
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


import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
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
    Text,
    AddButton,
    SelectedArticleInfo,
    QuantityContainer,
    QuantityInput,
    QuantityLabel,
    AllFabricsContainer,
    CardsMapContainer,
    CardContainer,
    ImgContainer,
    CardImg,
    CardText,
} from '../../AddProject/style';

import { addAllFabrics } from '../../../../store/state/fabricSlice';
import { useGetAllFabricsQuery } from '../../../../store/api/ytremaApi';

export const AddArticleModal = (props) => {
    const {
        showAddArticleModal,
        setShowAddArticleModal,
        addFabricOnChange,
        addFabricValues,
        setAddFabricValues,
        handleAddFabricSubmit,
        word
    } = props

    const { persistedReducer } = useSelector((state) => state);
    const dispatch = useDispatch();
    const auth = persistedReducer.auth;
    const fabrics = persistedReducer.fabrics;
    const { data, error, isLoading, isSuccess, isError } = useGetAllFabricsQuery(auth.id);
    // const fabricCard = fabrics.value.find((fabric) => fabric.id == addFabricValues.fabricId);

    useEffect(() => {
        if (isSuccess && data) {
            dispatch(addAllFabrics(data.fabrics));
        }
    }, [data]);



    const closeAddArticleModal = () => {
        setShowAddArticleModal(false);
        setSelectedFabric({
            id: "",
            name: "",
            fabric: "",
            photo: "",
            stock_qty: "",
            price: ""
        })
    };

    const keyPress = useCallback(event => {
        if (event.key === 'Escape' && showAddArticleModal) {
            setShowAddArticleModal(false);
        }
    }, [setShowAddArticleModal, showAddArticleModal]);

    useEffect(() => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress)
    }, [keyPress]);

    const [selectedFabric, setSelectedFabric] = useState({
        id: "",
        name: "",
        fabric: "",
        photo: "",
        stock_qty: "",
        price: ""
    })
    console.log(selectedFabric, "<--selectedfabric");
    return (
        <>
            {showAddArticleModal ? (
                <Container
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}

                >
                    <Background>
                        <ModalWrapper
                            className='addArticle'
                            showAddArticleModal={showAddArticleModal}
                        >
                            <ModalContent
                                className='addArticle'
                            >
                                <UpdateTitle>{word}</UpdateTitle>

                                <FormContainer
                                    className='addArticle'
                                >
                                    <Form>
                                        {fabrics && selectedFabric.id == "" && (
                                            <AllFabricsContainer
                                                className='addArticle'
                                            >
                                                {fabrics.value.map((fabric) => (
                                                    <CardsMapContainer
                                                        className="AddArticle"
                                                        key={fabric.id}
                                                        onClick={() => {
                                                            setSelectedFabric({
                                                                ...selectedFabric,
                                                                id: fabric.id,
                                                                name: fabric.name,
                                                                fabric: fabric.fabric,
                                                                photo: fabric.photo,
                                                                stock_qty: fabric.stock_qty,
                                                                price: fabric.price

                                                            }),
                                                                setAddFabricValues({
                                                                    ...addFabricValues,
                                                                    fabricId: fabric.id,
                                                                    article_cost: fabric.price
                                                                })

                                                        }}
                                                    >
                                                        <CardContainer key={fabric.id}>
                                                            <ImgContainer>
                                                                <CardImg src={fabric.photo} alt={fabric.alt} />
                                                            </ImgContainer>

                                                            <CardText>
                                                                {fabric.name} - {fabric.fabric} - {fabric.stock_qty} cm
                                                            </CardText>
                                                        </CardContainer>
                                                    </CardsMapContainer>
                                                ))}
                                            </AllFabricsContainer>
                                        )}
                                        {selectedFabric.id !== "" && (
                                            <AddOneArticleContainer key={selectedFabric.id}>
                                                <PreviewContainer
                                                    className='articleUpdate'
                                                >
                                                    <PreviewButtonContainer>
                                                        <Preview src={selectedFabric.photo}></Preview>

                                                    </PreviewButtonContainer>

                                                    <SelectedArticleInfo>
                                                        {selectedFabric.fabric}
                                                        <br />
                                                        Quantité stockée : {" "}
                                                        {selectedFabric.stock_qty} cm
                                                    </SelectedArticleInfo>
                                                    <QuantityContainer>
                                                        <QuantityLabel htmlFor="fabric_used_size">
                                                            Quantité
                                                        </QuantityLabel>
                                                        <QuantityInput
                                                            type="number"
                                                            mobile
                                                            id="fabric_used_size"
                                                            name="used_size"
                                                            max={selectedFabric.stock_qty}
                                                            step="1"
                                                            // placeholder={
                                                            //     fabricValues.old_used_size
                                                            // }
                                                            onChange={addFabricOnChange}
                                                        ></QuantityInput>
                                                    </QuantityContainer>
                                                </PreviewContainer>
                                            </AddOneArticleContainer>
                                        )}

                                    </Form>
                                </FormContainer>
                                <ButtonsContainer
                                    className='addArticle'
                                >
                                    <CancelContainer>
                                        <CancelButton
                                            onClick={closeAddArticleModal}
                                        >
                                            Annuler
                                        </CancelButton>
                                    </CancelContainer>
                                    <UpdateContainer>
                                        <UpdateButton
                                        // onClick={(event) => {
                                        //     handleFabricSubmit(event);
                                        //     closeUpdateModal();
                                        // }}

                                        >
                                            Ajouter
                                        </UpdateButton>


                                    </UpdateContainer>
                                </ButtonsContainer>


                            </ModalContent>
                            <CloseModalButton
                                aria-label='Close modal'
                                onClick={closeAddArticleModal}
                            />
                        </ModalWrapper>
                    </Background>
                </Container>
            ) : null}
        </>
    )
};
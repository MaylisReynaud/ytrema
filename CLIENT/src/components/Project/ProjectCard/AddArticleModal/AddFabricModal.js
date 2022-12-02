import React, { useState, useEffect, useCallback } from 'react';
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
    NoStockContainer,
    NoStockImg,
    NoStockText
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
    QuantityLabel,
    AllFabricsContainer,
    CardsMapContainer,
    CardContainer,
    ImgContainer,
    CardImg,
    CardText,
} from '../../AddProject/style';

export const AddFabricModal = (props) => {
    const {
        showAddArticleModal,
        setShowAddArticleModal,
        addFabricOnChange,
        addFabricValues,
        setAddFabricValues,
        handleAddFabricSubmit,
        word,
        fabricsFiltered
    } = props

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
                                {fabricsFiltered.length !== 0 ? (
                                    <>
                                        <UpdateTitle>{word}</UpdateTitle>

                                        <FormContainer
                                            className='addArticle'
                                        >
                                            <Form>
                                                {fabricsFiltered && selectedFabric.id == "" && (
                                                    <AllFabricsContainer
                                                        className='addArticle'
                                                    >
                                                        {fabricsFiltered.map((fabric) => (
                                                            fabric.stock_qty !== "0" && (
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
                                                                                fabric_id: fabric.id,
                                                                                fabric_price: fabric.price
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
                                                            )
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
                                                                    name="fabric_used_size"
                                                                    max={selectedFabric.stock_qty}
                                                                    step="1"
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
                                                    onClick={(event) => {
                                                        handleAddFabricSubmit(event);
                                                        closeAddArticleModal();
                                                    }}

                                                >
                                                    Ajouter ce tissu
                                                </UpdateButton>
                                            </UpdateContainer>
                                        </ButtonsContainer>
                                    </>
                                ) :
                                    (
                                        <>
                                        <UpdateTitle>LE STOCK DE TISSUS</UpdateTitle>
                                        <NoStockContainer>
                                            <NoStockImg
                                                src="https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Illustrations%2Fno-stock-ytrema.png?alt=media&token=6741d96a-551b-4141-893c-72c783bbc452"
                                            />
                                            <NoStockText>
                                                Il semble que toutes les références de tissus soient déjà présentes dans votre projet !  
                                            </NoStockText>
                                        </NoStockContainer>
                                        <ButtonsContainer
                                        className='noStock'
                                    >
                                        <UpdateContainer
                                        className='noStock'>
                                            <UpdateButton
                                                className='noStock'
                                               onClick={closeAddArticleModal}
                                            >
                                                Retourner au projet
                                            </UpdateButton>
    
    
                                        </UpdateContainer>
                                    </ButtonsContainer>
                                        </>
                                    )}

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
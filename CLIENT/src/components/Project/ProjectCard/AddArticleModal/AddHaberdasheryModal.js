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
    NoStockText,
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


export const AddHaberdasheryModal = (props) => {
    const {
        showAddArticleModal,
        setShowAddArticleModal,
        addHaberdasheryOnChange,
        addHaberdasheryValues,
        setAddHaberdasheryValues,
        handleAddHaberdasherySubmit,
        word,
        haberdasheriesFiltered
    } = props

    const closeAddArticleModal = () => {
        setShowAddArticleModal(false);
        setSelectedHaberdashery({
            id: "",
            name: "",
            haberdashery: "",
            is_cut: "",
            is_a_set: "",
            article_qty: "",
            size: "",
            unity: "",
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

    const [selectedHaberdashery, setSelectedHaberdashery] = useState({
        id: "",
        name: "",
        haberdashery: "",
        is_cut: "",
        is_a_set: "",
        article_qty: "",
        size: "",
        unity: "",
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
                                {haberdasheriesFiltered.length !== 0 ? (
                                    <>
                                <UpdateTitle>{word}</UpdateTitle>
                                <FormContainer
                                className='addArticle'
                            >
                                <Form>
                                    {haberdasheriesFiltered && selectedHaberdashery.id == "" && (
                                        <AllFabricsContainer
                                            className='addArticle'
                                        >
                                            {haberdasheriesFiltered.map((haberdashery) => (
                                                haberdashery.stock_qty !== "0" && (
                                                    <CardsMapContainer
                                                        className="AddArticle"
                                                        key={haberdashery.id}
                                                        onClick={() => {
                                                            setSelectedHaberdashery({
                                                                ...setSelectedHaberdashery,
                                                                id: haberdashery.id,
                                                                name: haberdashery.name,
                                                                haberdashery: haberdashery.haberdashery,
                                                                is_cut: haberdashery.is_cut,
                                                                is_a_set: haberdashery.is_a_set,
                                                                article_qty: haberdashery.article_qty,
                                                                size: haberdashery.size,
                                                                unity: haberdashery.unity,
                                                                photo: haberdashery.photo,
                                                                stock_qty: haberdashery.stock_qty,
                                                                price: haberdashery.price
                                                            }),
                                                                setAddHaberdasheryValues({
                                                                    ...addHaberdasheryValues,
                                                                    haberdashery_id: haberdashery.id,
                                                                    haberdashery_is_cut: haberdashery.is_cut,
                                                                    haberdashery_is_a_set: haberdashery.is_a_set,
                                                                    haberdashery_article_qty: haberdashery.article_qty,
                                                                    haberdashery_size: haberdashery.size,
                                                                    haberdashery_price: Number(haberdashery.price)

                                                                })

                                                        }}
                                                    >
                                                        <CardContainer key={haberdashery.id}>
                                                            <ImgContainer>
                                                                <CardImg src={haberdashery.photo} alt={haberdashery.alt} />
                                                            </ImgContainer>

                                                            <CardText>

                                                                {haberdashery.name} <br />
                                                                stock : {haberdashery.stock_qty}
                                                            </CardText>
                                                        </CardContainer>
                                                    </CardsMapContainer>
                                                )

                                            ))}
                                        </AllFabricsContainer>
                                    )}
                                    {selectedHaberdashery.id !== "" && (
                                        <AddOneArticleContainer key={selectedHaberdashery.id}>
                                            <PreviewContainer
                                                className='articleUpdate'
                                            >
                                                <PreviewButtonContainer>
                                                    <Preview 
                                                        className='project'
                                                        src={selectedHaberdashery.photo}
                                                    ></Preview>

                                                </PreviewButtonContainer>

                                                <SelectedArticleInfo>
                                                    {selectedHaberdashery.haberdashery}
                                                    <br />
                                                    Quantité stockée : {" "}
                                                    {selectedHaberdashery.stock_qty}
                                                </SelectedArticleInfo>
                                                <QuantityContainer>
                                                    <QuantityLabel htmlFor="haberdashery_used_size">
                                                        Quantité
                                                    </QuantityLabel>
                                                    <QuantityInput
                                                        type="number"
                                                        mobile
                                                        id="haberdashery_used_size"
                                                        name="haberdashery_used_size"
                                                        max={selectedHaberdashery.stock_qty}
                                                        step="1"
                                                        onChange={addHaberdasheryOnChange}
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
                                                handleAddHaberdasherySubmit(event);
                                                closeAddArticleModal();
                                            }}

                                        >
                                            Ajouter cet article
                                        </UpdateButton>


                                    </UpdateContainer>
                                </ButtonsContainer>

                            </>
                                ) : (
                                    <>
                                    <UpdateTitle>LE STOCK DE MERCERIE</UpdateTitle>
                                    <NoStockContainer>
                                        <NoStockImg
                                            src="https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Illustrations%2Fno-stock-ytrema.png?alt=media&token=6741d96a-551b-4141-893c-72c783bbc452"
                                        />
                                        <NoStockText>
                                            Il semble que toutes les références de mercerie soient déjà présentes dans votre projet !  
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
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

export const AddPatternModal = (props) => {
    const {
        showAddArticleModal,
        setShowAddArticleModal,
        addPatternOnChange,
        addPatternValues,
        setAddPatternValues,
        handleAddPatternSubmit,
        word,
        patternsFiltered
    } = props

    const closeAddArticleModal = () => {
        setShowAddArticleModal(false);
        setSelectedPattern({
            id: "",
            name: "",
            clothing: "",
            photo: "",
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

    const [selectedPattern, setSelectedPattern] = useState({
        id: "",
        name: "",
        clothing: "",
        photo: "",
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
                                {patternsFiltered.length !== 0 ? (
                                    <>
                                        <UpdateTitle>{word}</UpdateTitle>

                                        <FormContainer
                                            className='addArticle'
                                        >
                                            <Form>
                                                {patternsFiltered && selectedPattern.id == "" && (
                                                    <AllFabricsContainer
                                                        className='addArticle'
                                                    >
                                                        {patternsFiltered.map((pattern) => (
                                                            patternsFiltered.length > 0 && (
                                                                <CardsMapContainer
                                                                    className="AddArticle"
                                                                    key={pattern.id}
                                                                    onClick={() => {
                                                                        setSelectedPattern({
                                                                            ...selectedPattern,
                                                                            id: pattern.id,
                                                                            name: pattern.name,
                                                                            clothing: pattern.clothing,
                                                                            photo: pattern.photo,
                                                                            price: pattern.price
                                                                        }),
                                                                            setAddPatternValues({
                                                                                ...addPatternValues,
                                                                                pattern_id: pattern.id,
                                                                                pattern_price: pattern.price
                                                                            })

                                                                    }}
                                                                >
                                                                    <CardContainer key={pattern.id}>
                                                                        <ImgContainer>
                                                                            <CardImg src={pattern.photo} alt={pattern.alt} />
                                                                        </ImgContainer>

                                                                        <CardText>
                                                                            {pattern.name} -  {pattern.brand} - {pattern.clothing} 
                                                                        </CardText>
                                                                    </CardContainer>
                                                                </CardsMapContainer>
                                                            )
                                                        ))}
                                                    </AllFabricsContainer>
                                                )}
                                                {selectedPattern.id !== "" && (
                                                    <AddOneArticleContainer key={selectedPattern.id}>
                                                        <PreviewContainer
                                                            className='articleUpdate'
                                                        >
                                                            <PreviewButtonContainer>
                                                                <Preview src={selectedPattern.photo}></Preview>

                                                            </PreviewButtonContainer>

                                                            <SelectedArticleInfo>
                                                                {selectedPattern.name}
                                                                <br />
                                                                {selectedPattern.clothing}
                                                            </SelectedArticleInfo>
                                                            <QuantityContainer>
                                                                {/* <QuantityLabel htmlFor="fabric_used_size">
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
                                                                ></QuantityInput> */}
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
                                                        handleAddPatternSubmit(event);
                                                        closeAddArticleModal();
                                                    }}

                                                >
                                                    Ajouter ce patron
                                                </UpdateButton>
                                            </UpdateContainer>
                                        </ButtonsContainer>
                                    </>
                                ) :
                                    (
                                        <>
                                            <UpdateTitle>LE STOCK DE PATRONS</UpdateTitle>
                                            <NoStockContainer>
                                                <NoStockImg
                                                    src="https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Illustrations%2Fno-stock-ytrema.png?alt=media&token=6741d96a-551b-4141-893c-72c783bbc452"
                                                />
                                                <NoStockText>
                                                    Il semble que toutes les références de patrons soient déjà présentes dans votre projet !
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
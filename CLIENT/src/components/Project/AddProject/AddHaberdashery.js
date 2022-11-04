import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    AddButton,
    CardsMapContainer,
    CardContainer,
    ImgContainer,
    CardImg,
    CardText,
    Section,
    TitleSection,
    TitleSectionContainer,
    AddOneArticleContainer,
    AllFabricsContainer,
    PreviewContainer,
    Preview,
    Text,
    SelectedArticleInfo,
    QuantityLabel,
    QuantityInput,
    QuantityContainer,
    AddOneMoreButton,
    RemoveButton,
    MinusIcon,
    PlusIcon,
    ReturnButton,
    AddReturnButtonContainer,
    CardsContainer,
    PreviewButtonContainer,
    ButtonForm,
    PictureInputContainer,
    PictureInput
} from "./style";
import YtremaLogo from "../../../assets/images/logo.png";
import { addAllHaberdasheries } from "../../../store/state/haberdasherySlice";
import { useGetAllHaberdasheriesQuery } from "../../../store/api/ytremaApi";


export const AddHaberdashery = (props) => {
    const dispatch = useDispatch();
    const { persistedReducer } = useSelector((state) => state);
    const haberdasheries = persistedReducer.haberdasheries;
    const auth = persistedReducer.auth;
    const { data, error, isLoading, isSuccess, isError } = useGetAllHaberdasheriesQuery(auth.id);


    const {
        values,
        setValues,
        onChange,
        showAddOneMoreButton,
        setShowAddOneMoreButton
      } = props;


    useEffect(() => {
        if (isSuccess && data) {
            dispatch(addAllHaberdasheries(data.haberdasheries));
        }
    }, [data, haberdasheries]);

    //show haberdashery section
    const [showHaberdasherySection, setShowHaberdasherySection] = useState(false);
    const isOpeningHaberdasherySection = () => {
        setShowHaberdasherySection((prev) => !prev);
    };
    //Show all haberdasheries
    const [showAllHaberdasheries, setShowAllHaberdasheries] = useState(false);
    const [haberdasheriesFiltered, setHaberdasheriesFiltered] = useState([]);

    const isOpeningHaberdasheriesCards = () => {
        setShowAllHaberdasheries((prev) => !prev);

        // Create array with all haberdasheries remaining 
        if (selectedHaberdashery.length > 0) {
            let haberdasheriesFilteredArray = [];
            let selectedHaberdasheryIdsArray = selectedHaberdashery.map(elem => elem.id);

            haberdasheries.value.map(haberdashery => {
                !selectedHaberdasheryIdsArray.includes(haberdashery.id) && haberdasheriesFilteredArray.push(haberdashery);
            })

            setHaberdasheriesFiltered(haberdasheriesFilteredArray);
        }
    };

    const isOpeningOneMoreHaberdashery = (event) => {
        setShowAddOneMoreButton(false);
        !showAddOneMoreHaberdashery && event.preventDefault();
        setShowAddOneMoreHaberdashery((prev) => !prev);
    };

    //Close the section to add one more haberdashery but show the button to add one haberdashery
    const isClosingAddOneMoreHaberdashery = (event) => {
        !showAddOneMoreHaberdashery && event.preventDefault();
        setShowAddOneMoreHaberdashery(false);
        setShowAllHaberdasheries(false);
        setShowAddOneMoreButton(true);
    };

    //Haberdashery Preview
    const [selectedHaberdashery, setSelectedHaberdashery] = useState([]);
    const [haberdasheryPreview, setHaberdasheryPreview] = useState();
    const [addHaberdasheryPreview, setAddHaberdasheryPreview] = useState();
    const [showAddOneMoreHaberdashery, setShowAddOneMoreHaberdashery] = useState(false);
return(
    <>
        <Section>
        <TitleSectionContainer>
            <TitleSection>MERCERIE</TitleSection>
            {showHaberdasherySection ? (
                <MinusIcon onClick={isOpeningHaberdasherySection} />
            ) : (
                <PlusIcon onClick={isOpeningHaberdasherySection} />
            )}
        </TitleSectionContainer>
        {showHaberdasherySection && (
            <>
                <AddOneArticleContainer>
                    {/* AFFICHAGE DE LA MERCERIE DEJA SELECTIONNES */}
                    <PreviewContainer
                        className="haberdashery"
                    >
                        {selectedHaberdashery.length == 0 && (
                            <>
                                <Text>Sélectionnez votre premier article</Text>
                                <PreviewButtonContainer
                                    className="firstShow"
                                >
                                    <Preview src={YtremaLogo}></Preview>
                                    <AddButton
                                        onClick={isOpeningHaberdasheriesCards}
                                        className="Alone" />
                                </PreviewButtonContainer>

                            </>
                        )}
                    </PreviewContainer>
                </AddOneArticleContainer>

                {selectedHaberdashery.length > 0 ? (
                    <>
                        {selectedHaberdashery.map((selectedHab, index) => (
                            <AddOneArticleContainer key={selectedHab.id}>
                                <PreviewContainer
                                    className="haberdashery"
                                >
                                    <Text>Mercerie sélectionnée n°{index + 1}</Text>
                                    <PreviewButtonContainer>
                                        <Preview src={selectedHab.photo}></Preview>
                                        <RemoveButton
                                            onClick={() => {
                                                setSelectedHaberdashery((current) =>
                                                    current.filter((haberdashery) => {
                                                        return haberdashery.id !== selectedHab.id;
                                                    })
                                                );
                                                let updatedHaberdasheries = values.haberdasheries.filter(
                                                    (haberdashery) => {
                                                        return haberdashery.haberdashery_id != selectedHab.id;
                                                    }
                                                );
                                                let valuesUpdated = values;
                                                valuesUpdated.haberdasheries = updatedHaberdasheries;
                                                setValues(valuesUpdated);
                                            }}
                                        />
                                    </PreviewButtonContainer>

                                    <SelectedArticleInfo>
                                        {selectedHab.name} - {selectedHab.size} {" "}{selectedHab.unity} - qté:{" "}
                                        {selectedHab.quantity}
                                    </SelectedArticleInfo>
                                    <QuantityContainer>
                                        <QuantityLabel>
                                            Quantité
                                        </QuantityLabel>
                                        <QuantityInput
                                            type="number"
                                            id="haberdashery_used_size"
                                            data-selectedhaberdasheryid={selectedHab.id}
                                            // data-selectedhaberdasheryiscut={selectedHab.is_cut}
                                            // data-selectedhaberdasheryisaset={selectedHab.isaset}
                                            // data-selectedhaberdasherypurchaseqty={selectedHab.purchase_qty}
                                            // data-selectedhaberdasheryqtystock={selectedHab.qty_stock}
                                            // data-selectedhaberdasheryprice={selectedHab.price}
                                            name="haberdashery_used_size"
                                            max={selectedHab.quantity}
                                            step="1"
                                            placeholder={
                                                values.haberdasheries.find(
                                                    (elem) => elem.haberdashery_id == selectedHab.id
                                                )
                                                    ? values.haberdasheries[values.haberdasheries.indexOf(values.haberdasheries.find(
                                                        (elem) => elem.haberdashery_id == selectedHab.id
                                                    ))].haberdashery_used_size
                                                    : null
                                            }
                                            onChange={onChange}
                                        ></QuantityInput>
                                    </QuantityContainer>
                                </PreviewContainer>
                            </AddOneArticleContainer>
                        ))}
                    </>
                ) : null}

                {/* AJOUT MERCERIE SUPP */}

                {showAddOneMoreHaberdashery && (
                    <>
                        <AddOneArticleContainer>
                            <PreviewContainer
                                className="haberdashery"
                            >
                                <Text>Sélectionnez votre article</Text>
                                <PreviewButtonContainer
                                    className="firstShow"
                                >
                                    <Preview
                                        src={
                                            addHaberdasheryPreview !== undefined
                                                ? addHaberdasheryPreview
                                                : YtremaLogo
                                        }
                                    ></Preview>
                                    <AddReturnButtonContainer>
                                        <ReturnButton
                                            onClick={isClosingAddOneMoreHaberdashery}
                                            className="AddOneMoreSection"
                                        />
                                        <AddButton
                                            onClick={isOpeningHaberdasheriesCards}
                                            className="AddOneMoreSection"
                                        />
                                    </AddReturnButtonContainer>

                                </PreviewButtonContainer>
                            </PreviewContainer>
                        </AddOneArticleContainer>

                        {selectedHaberdashery >= 1 && (
                            <>
                                <SelectedArticleInfo>
                                    {selectedHaberdashery[selectedHaberdashery.length - 1].name} -{" "}
                                    {
                                        selectedHaberdashery[selectedHaberdashery.length - 1]
                                            .size
                                    }{" "}
                                    {" "}
                                    {
                                        selectedHaberdashery[selectedHaberdashery.length - 1]
                                            .unity
                                    }{" - "}
                                    qté:
                                    {
                                        selectedHaberdashery[selectedHaberdashery.length - 1]
                                            .quantity
                                    }{" "}
                                </SelectedArticleInfo>
                                <QuantityContainer>
                                    <QuantityLabel htmlFor="haberdashery_used_size">
                                        Quantité
                                    </QuantityLabel>
                                    <QuantityInput
                                        type="number"
                                        id="haberdashery_used_size"
                                        data-selectedhaberdasheryid={
                                            selectedHaberdashery[selectedHaberdashery.length - 1].id
                                        }
                                        // data-selectedhaberdasheryiscut={
                                        //     selectedHaberdashery[selectedHaberdashery.length - 1].is_cut
                                        // }
                                        // data-selectedhaberdasheryisaset={
                                        //     selectedHaberdashery[selectedHaberdashery.length - 1].is_a_set
                                        // }
                                        // data-selectedhaberdasherypurchaseqty={
                                        //     selectedHaberdashery[selectedHaberdashery.length - 1]
                                        //         .purchase_qty
                                        // }
                                        // data-selectedhaberdasheryqtystock={
                                        //     selectedHaberdashery[selectedHaberdashery.length - 1].qty_stock
                                        // }
                                        // data-selectedhaberdasheryprice={
                                        //     selectedHaberdashery[selectedHaberdashery.length - 1]
                                        //         .price
                                        // }
                                        name="haberdashery_used_size"
                                        max={
                                            selectedHaberdashery[selectedHaberdashery.length - 1]
                                                .quantity
                                        }
                                        step="1"
                                        placeholder="ex: 120"
                                        onChange={onChange}
                                    ></QuantityInput>
                                </QuantityContainer>
                            </>
                        )}
                    </>
                )}

                {/* AFFICHAGE DES ARTCLES DE MERCERIE A SELECTIONNER AU DEMARRAGE */}
                {haberdasheries && showAllHaberdasheries && selectedHaberdashery.length == 0 && (
                    <CardsContainer>
                        {haberdasheries.value.map((haberdashery) => (
                            <CardsMapContainer
                                key={haberdashery.id}
                                onClick={() => {
                                    isOpeningHaberdasheriesCards();
                                    let habObject = selectedHaberdashery;
                                    habObject.push(haberdashery);
                                    setSelectedHaberdashery(habObject);
                                    setHaberdasheryPreview(haberdashery.photo);
                                    showAddOneMoreHaberdashery && isOpeningOneMoreHaberdashery();
                                }}
                            >
                                <CardContainer key={haberdashery.id} >
                                    <ImgContainer>
                                        <CardImg src={haberdashery.photo} alt={haberdashery.alt} />
                                    </ImgContainer>
                                    <CardText>
                                        {haberdashery.haberdashery} - {haberdashery.name} - {haberdashery.size} {haberdashery.unity} - qté : {haberdashery.quantity}
                                    </CardText>
                                </CardContainer>
                            </CardsMapContainer>
                        ))}
                    </CardsContainer>
                )}

                {/* AFFICHAGE FILTRE DES ARTICLES DE MERCERIE RESTANTS A SELECTIONNER */}
                {showAllHaberdasheries && selectedHaberdashery.length > 0 && (
                    <CardsContainer>
                        {haberdasheriesFiltered.map((haberdashery) => (
                            <CardsMapContainer
                                key={haberdashery.id}
                                onClick={() => {
                                    isOpeningHaberdasheriesCards();
                                    let habObject = selectedHaberdashery;
                                    habObject.push(haberdashery);
                                    setSelectedHaberdashery(habObject);
                                    setHaberdasheryPreview(haberdashery.photo);
                                    showAddOneMoreHaberdashery && isOpeningOneMoreHaberdashery();
                                }}
                            >
                                <CardContainer key={haberdashery.id}>
                                    <ImgContainer>
                                        <CardImg src={haberdashery.photo} alt={haberdashery.alt} />
                                    </ImgContainer>

                                    <CardText>
                                        {haberdashery.haberdashery} - {haberdashery.name} - {haberdashery.size} {haberdashery.unity} - qté : {haberdashery.quantity}
                                    </CardText>
                                </CardContainer>
                            </CardsMapContainer>
                        ))}
                    </CardsContainer>
                )}

                {showAddOneMoreButton && selectedHaberdashery.length > 0 && (
                    <AddOneMoreButton onClick={isOpeningOneMoreHaberdashery}>
                        Sélectionner un article supplémentaire
                    </AddOneMoreButton>
                )}
            </>
        )}
        </Section>
    </>
)
}
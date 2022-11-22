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
} from "./style";
import YtremaLogo from "../../../assets/images/logo.png";
import { addAllPatterns } from "../../../store/state/patternSlice";
import { useGetAllPatternsQuery } from "../../../store/api/ytremaApi";


export const AddPattern = (props) => {
    const dispatch = useDispatch();
    const { persistedReducer } = useSelector((state) => state);
    const auth = persistedReducer.auth;
    const patterns = persistedReducer.patterns;
    const { data, error, isLoading, isSuccess, isError } = useGetAllPatternsQuery(auth.id);


    const {
        values,
        setValues,
        onChange,
        showAddOneMoreButton,
        setShowAddOneMoreButton
    } = props;

    console.log(values, 'values')

    useEffect(() => {
        if (isSuccess && data) {
            dispatch(addAllPatterns(data.patterns));
        }
    }, [data]);

    //show pattern section
    const [showPatternSection, setShowPatternSection] = useState(false);
    const isOpeningPatternSection = () => {
        setShowPatternSection((prev) => !prev);
    };
    //Show all patterns
    const [showAllPatterns, setShowAllPatterns] = useState(false);
    const [patternsFiltered, setPatternsFiltered] = useState([]);

    const isOpeningPatternsCards = () => {
        setShowAllPatterns((prev) => !prev);

        // Create array with all patterns remaining 
        if (selectedPattern.length > 0) {
            let patternsFilteredArray = [];
            let selectedPatternIdsArray = selectedPattern.map(elem => elem.id);

            patterns.value.map(pattern => {
                !selectedPatternIdsArray.includes(pattern.id) && patternsFilteredArray.push(pattern);
            })

            setPatternsFiltered(patternsFilteredArray);
        }
    };

    const isOpeningOneMorePattern = (event) => {
        // setShowAddOneMoreButton(true);
        setShowAddOneMoreButton(false);
        !showAddOneMorePattern && event.preventDefault();
        setShowAddOneMorePattern((prev) => !prev);
    };

    //Close the section to add one more pattern but show the button to add one pattern
    const isClosingAddOneMorePattern = (event) => {
        !showAddOneMorePattern && event.preventDefault();
        setShowAddOneMorePattern(false);
        setShowAllPatterns(false);
        setShowAddOneMoreButton(true);
    };

    //Pattern Preview
    const [selectedPattern, setSelectedPattern] = useState([]);
    const [patternPreview, setPatternPreview] = useState();
    const [addPatternPreview, setAddPatternPreview] = useState();
    const [showAddOneMorePattern, setShowAddOneMorePattern] = useState(false);


    return (
        <>
            <Section>
                <TitleSectionContainer>
                    <TitleSection>PATRONS</TitleSection>
                    {showPatternSection ? (
                        <MinusIcon onClick={isOpeningPatternSection} />
                    ) : (
                        <PlusIcon onClick={isOpeningPatternSection} />
                    )}
                </TitleSectionContainer>
                {showPatternSection && (
                    <>
                        <AddOneArticleContainer>
                            {/* AFFICHAGE DES PATRONS DEJA SELECTIONNES */}
                            <PreviewContainer
                                className="pattern"
                            >
                                {selectedPattern.length == 0 && (
                                    <>
                                        <Text>Sélectionnez votre premier patron</Text>
                                        <PreviewButtonContainer
                                            className="firstShow"
                                        >
                                            <Preview src={YtremaLogo}></Preview>
                                            <AddButton
                                                onClick={isOpeningPatternsCards}
                                                className="Alone" />
                                        </PreviewButtonContainer>

                                    </>
                                )}
                            </PreviewContainer>
                        </AddOneArticleContainer>
                        {selectedPattern.length > 0 ? (
                            <>
                                {selectedPattern.map((selectedPat, index) => (
                                    <AddOneArticleContainer key={selectedPat.id}>
                                        <PreviewContainer
                                            className="pattern"
                                        >
                                            <Text>Patron sélectionné n°{index + 1}</Text>
                                            <PreviewButtonContainer>
                                                <Preview
                                                    src={selectedPat.photo}
                                                    data-selectedpatternid={selectedPat.id}
                                                ></Preview>
                                                <RemoveButton
                                                    onClick={() => {
                                                        setSelectedPattern((current) =>
                                                            current.filter((pattern) => {
                                                                return pattern.id !== selectedPat.id;
                                                            })
                                                        );
                                                        let updatedPatterns = values.patterns.filter(
                                                            (pattern) => {
                                                                return pattern.pattern_id != selectedPat.id;
                                                            }
                                                        );
                                                        let valuesUpdated = values;
                                                        valuesUpdated.patterns = updatedPatterns;
                                                        setValues(valuesUpdated);
                                                    }}
                                                />
                                            </PreviewButtonContainer>

                                            <SelectedArticleInfo
                                                className="pattern"
                                            >
                                                {selectedPat.clothing} {" "} {selectedPat.name} {" - "} {selectedPat.brand}
                                            </SelectedArticleInfo>
                                        </PreviewContainer>
                                    </AddOneArticleContainer>
                                ))}
                            </>
                        ) : null}

                        {/* AJOUT PATRON SUPP */}
                        {showAddOneMorePattern && (
                            <>
                                <AddOneArticleContainer>
                                    <PreviewContainer
                                        className="pattern"
                                    >
                                        <Text>Sélectionnez votre patron</Text>
                                        <PreviewButtonContainer
                                            className="firstShow"
                                        >
                                            <Preview
                                                src={
                                                    addPatternPreview !== undefined
                                                        ? addPatternPreview
                                                        : YtremaLogo
                                                }
                                            ></Preview>
                                            <AddReturnButtonContainer>
                                                <ReturnButton
                                                    onClick={isClosingAddOneMorePattern}
                                                    className="AddOneMoreSection"
                                                />
                                                <AddButton
                                                    onClick={isOpeningPatternsCards}
                                                    className="AddOneMoreSection"
                                                />
                                            </AddReturnButtonContainer>

                                        </PreviewButtonContainer>
                                    </PreviewContainer>
                                </AddOneArticleContainer>

                                {selectedPattern >= 1 && (
                                    <SelectedArticleInfo
                                        className="pattern"
                                        data-selectedpatternid={
                                            selectedPattern[selectedPattern.length - 1].id
                                        }
                                    >
                                        {selectedPattern[selectedPattern.length - 1].name} -{" "}
                                    </SelectedArticleInfo>
                                )}
                            </>
                        )}

                        {/* AFFICHAGE DES PATRONS A SELECTIONNER AU DEMARRAGE */}
                        {patterns && showAllPatterns && selectedPattern.length == 0 && (
                            <CardsContainer>
                                {patterns.value.map((pattern) => (
                                    <CardsMapContainer
                                        key={pattern.id}
                                        onClick={() => {
                                            isOpeningPatternsCards();
                                            let patObject = selectedPattern;
                                            patObject.push(pattern);
                                            setSelectedPattern(patObject);
                                            setPatternPreview(pattern.photo);
                                            showAddOneMorePattern && isOpeningOneMorePattern();
                                            let patternObject = values;
                                            patternObject.patterns.push({
                                                pattern_id: pattern.id,
                                                pattern_price: pattern.price
                                            });

                                            // keep last pattern object with the same id
                                            let patternsResult = [
                                                ...patternObject.patterns
                                                    .reduce((acc, cur) => {
                                                        return acc.set(cur.pattern_id, cur);
                                                    }, new Map())
                                                    .values(),
                                            ];
                                            patternObject.patterns = patternsResult;
                                            setValues(patternObject);
                                            setShowAddOneMoreButton(true);
                                        }}

                                    >
                                        <CardContainer
                                            key={pattern.id}
                                        >
                                            <ImgContainer>
                                                <CardImg src={pattern.photo} alt={pattern.alt} />
                                            </ImgContainer>
                                            <CardText>
                                                {pattern.clothing} - {pattern.name} - {pattern.brand}
                                            </CardText>
                                        </CardContainer>
                                    </CardsMapContainer>
                                ))}
                            </CardsContainer>
                        )}

                        {/* AFFICHAGE FILTRE DES PATRONS RESTANTS A SELECTIONNER */}
                        {showAllPatterns && selectedPattern.length > 0 && (
                            <CardsContainer>
                                {patternsFiltered.map((pattern) => (
                                    <CardsMapContainer
                                        key={pattern.id}
                                        onClick={() => {
                                            isOpeningPatternsCards();
                                            let patObject = selectedPattern;
                                            patObject.push(pattern);
                                            setSelectedPattern(patObject);
                                            setPatternPreview(pattern.photo);
                                            showAddOneMorePattern && isOpeningOneMorePattern();
                                            let patternObject = values;
                                            patternObject.patterns.push({
                                                pattern_id: pattern.id,
                                                pattern_price: pattern.price
                                            });

                                            // keep last pattern object with the same id
                                            let patternsResult = [
                                                ...patternObject.patterns
                                                    .reduce((acc, cur) => {
                                                        return acc.set(cur.pattern_id, cur);
                                                    }, new Map())
                                                    .values(),
                                            ];
                                            patternObject.patterns = patternsResult;
                                            setValues(patternObject);
                                            setShowAddOneMoreButton(true);
                                        }}
                                    >
                                        <CardContainer key={pattern.id}>
                                            <ImgContainer>
                                                <CardImg src={pattern.photo} alt={pattern.alt} />
                                            </ImgContainer>

                                            <CardText>
                                                {pattern.clothing} - {pattern.name} - {pattern.brand}
                                            </CardText>
                                        </CardContainer>
                                    </CardsMapContainer>
                                ))}
                            </CardsContainer>
                        )}
                       
                        {showAddOneMoreButton && selectedPattern.length > 0 && (
                            <AddOneMoreButton onClick={isOpeningOneMorePattern}>
                                Sélectionner un patron supplémentaire
                            </AddOneMoreButton>
                        )}
                    </>
                )}
            </Section>
        </>
    )
}

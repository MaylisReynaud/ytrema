import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { DeviceSize } from "../../Navbar/Responsive";
import { useSelector, useDispatch } from "react-redux";

import {
    CardsContainer,
    CardContainer,
    ModifyDeleteContainer,
    TrashContainer,
    TrashButton,
    ModifyContainer,
    ModifyButton,
    Section,
    ImgContainer,
    CardText,
    CardImg,
    SectionTitle,
    InfoCardContainer,
    MinusIcon,
    PlusIcon,
    TitleContainer,
    AddButton,
    AddReturnButtonContainer,
} from "./style";
import { AddPatternModal } from "./AddArticleModal/AddPatternModal";
import { addPatternProject } from "../../../store/state/projectSlice";

export const PatternProject = (props) => {
    const {
        patternArray,
        handleAddPatternSubmit,
        addPatternOnChange,
        addPatternValues,
        setAddPatternValues
    } = props;
    const { id } = useParams();
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { persistedReducer } = useSelector((state) => state);
    const auth = persistedReducer.auth;
    const projects = persistedReducer.projects;
    const projectCard = projects.value.find((project) => project.id == id);

       // SHOW SECTION
    const [showSection, setShowSection] = useState(true);
    const isOpeningSection = () => {
        setShowSection((prev) => !prev);
    };

    //ADD PATTERN
    const patterns = persistedReducer.patterns;
    const [showAddArticleModal, setShowAddArticleModal] = useState(false);
    const isOpeningAddPatternModal = () => {
        setShowAddArticleModal(!showAddArticleModal);
    };
    const patternsStock = patterns.value.map(pattern => pattern.id);


    const [patternsFiltered, setPatternsFiltered] = useState([]);


    const removePatternsUsed = () => {
        // Create array with all fabrics remaining 
        if (patternsStock.length > 0) {
            let patternsFilteredArray = [];
            let selectedPatternIdsArray = patternArray.map(elem => elem.id);

            patterns.value.map(pattern => {
                !selectedPatternIdsArray.includes(pattern.id) && patternsFilteredArray.push(pattern);
            })

            setPatternsFiltered(patternsFilteredArray);
        }
    }


    return (
        <Section
            id='patron'
            className="patron"
        >
             <AddReturnButtonContainer>
            <TitleContainer
                className="showSection"
            >
                <SectionTitle
                    className="patron">
                    PATRON
                </SectionTitle>
                <AddButton
                        onClick={() => {
                            isOpeningAddPatternModal();
                            removePatternsUsed();
                        }}
                        className="AddOneMoreNote"
                    />
                    <AddPatternModal
                        setShowAddArticleModal={setShowAddArticleModal}
                        showAddArticleModal={showAddArticleModal}
                        word={'AJOUTER UN PATRON'}
                        addPatternOnChange={addPatternOnChange}
                        addPatternValues={addPatternValues}
                        setAddPatternValues={setAddPatternValues}
                        handleAddPatternSubmit={handleAddPatternSubmit}
                        patternsFiltered={patternsFiltered}
                    />
                {showSection ? (
                    <MinusIcon onClick={isOpeningSection} />
                ) : (
                    <PlusIcon onClick={isOpeningSection} />
                )}
            </TitleContainer>
            </AddReturnButtonContainer>
            {showSection && (
                <CardsContainer>
                    {patternArray.map((pattern) => (
                        <CardContainer 
                            key={pattern.id}
                        >
                            <ModifyDeleteContainer>
                                <TrashContainer>
                                    <TrashButton />
                                </TrashContainer>
                            </ModifyDeleteContainer>
                            <Link to={`/pattern/${pattern.id}`}>
                                <InfoCardContainer>
                                    <ImgContainer
                                     
                                    >
                                        <CardImg
                                            src={pattern.photo}
                                            alt={pattern.name}
                                        />
                                    </ImgContainer>
                                    <CardText
                                       
                                    >{pattern.clothing} - {pattern.name} </CardText>
                                </InfoCardContainer>

                            </Link>
                        </CardContainer>
                    ))}
                </CardsContainer>
            )}
        </Section>
    )
} 

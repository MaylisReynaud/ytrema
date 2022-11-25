import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { DeviceSize } from "../../Navbar/Responsive";
import { useSelector, useDispatch } from "react-redux";
import {
    useDeleteOneProjectMutation,
    useUpdateOneProjectMutation
} from "../../../store/api/ytremaApi";
import {
    updateProject,
    deleteProject
} from "../../../store/state/projectSlice";

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
    TitleContainer
} from "./style";
import { DeleteModal } from "../../DeleteModal";

export const PatternProject = () => {
    const { id } = useParams();
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { persistedReducer } = useSelector((state) => state);
    const auth = persistedReducer.auth;
    const projects = persistedReducer.projects;
    const projectCard = projects.value.find((project) => project.id == id);
    const [showSection, setShowSection] = useState(true);
    const isOpeningSection = () => {
        setShowSection((prev) => !prev);
    }

    return (
        <Section
            id='patron'
            className="patron"
        >
            <TitleContainer
                className="showSection"
            >
                <SectionTitle
                    className="patron">
                    PATRON
                </SectionTitle>
                {showSection ? (
                    <MinusIcon onClick={isOpeningSection} />
                ) : (
                    <PlusIcon onClick={isOpeningSection} />
                )}
            </TitleContainer>
            {showSection && (
                <CardsContainer>
                    {projectCard.pattern_array.map((pattern) => (
                        <CardContainer key={pattern.id}>
                            <ModifyDeleteContainer>
                                <ModifyContainer>
                                    <ModifyButton />
                                </ModifyContainer>
                                <TrashContainer>
                                    <TrashButton />
                                </TrashContainer>
                            </ModifyDeleteContainer>
                            <Link to={`/pattern/${pattern.id}`}>
                                <InfoCardContainer>
                                    <ImgContainer
                                        className="patron"
                                    >
                                        <CardImg
                                            src={pattern.photo}
                                            alt={pattern.name}
                                        />
                                    </ImgContainer>
                                    <CardText
                                        className="patron"
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

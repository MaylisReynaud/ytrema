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

export const HaberdasheryProject = () => {
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
            id='mercerie'
            className="mercerie"
        >
             <TitleContainer
                className="showSection"
            >
            <SectionTitle
                className="mercerie">
                MERCERIE
            </SectionTitle>
            {showSection ? (
                <MinusIcon onClick={isOpeningSection} />
            ) : (
                <PlusIcon onClick={isOpeningSection} />
            )}
            </TitleContainer>
            {showSection && (
            <CardsContainer>
                {projectCard.haberdashery_array.map((haberdashery) => (
                    <CardContainer key={haberdashery.id}>
                        <ModifyDeleteContainer>
                            <ModifyContainer>
                                <ModifyButton />
                            </ModifyContainer>
                            <TrashContainer>
                                <TrashButton />
                            </TrashContainer>
                        </ModifyDeleteContainer>
                        <Link to={`/mercerie/${haberdashery.id}`}>
                            <InfoCardContainer>
                                <ImgContainer>
                                    <CardImg
                                        src={haberdashery.photo}
                                        alt={haberdashery.name}
                                    />
                                </ImgContainer>
                                <CardText
                                    className="mercerie"
                                >quantité : {haberdashery.used_size}</CardText>
                            </InfoCardContainer>
                        </Link>
                    </CardContainer>
                ))}
            </CardsContainer>
            )}
        </Section>
    )
} 

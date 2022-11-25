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
} from "./style";
import { DeleteModal } from "../../DeleteModal";

export const FabricProject = () => {
    const { id } = useParams();
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { persistedReducer } = useSelector((state) => state);
    const auth = persistedReducer.auth;
    const projects = persistedReducer.projects;
    const projectCard = projects.value.find((project) => project.id == id);


    return (
        <Section
            id='"tissus'
            className="tissus"
        >
            <SectionTitle>
                TISSUS
            </SectionTitle>
            <CardsContainer>
                {projectCard.fabric_array.map((fabric) => (
                    <CardContainer key={fabric.id}>
                        <ModifyDeleteContainer>
                            <ModifyContainer>
                                <ModifyButton />
                            </ModifyContainer>
                            <TrashContainer>
                                <TrashButton />
                            </TrashContainer>
                        </ModifyDeleteContainer>
                        <Link to={`/tissus/${fabric.id}`} >
                            <InfoCardContainer>

                                <ImgContainer >
                                    <CardImg
                                        src={fabric.photo}
                                        alt={fabric.name}
                                    />
                                </ImgContainer>
                                <CardText>
                                    {fabric.fabric} - {fabric.used_size} cm
                                </CardText>
                            </InfoCardContainer>
                        </Link>

                    </CardContainer>
                ))}
            </CardsContainer>
        </Section>
    )
} 

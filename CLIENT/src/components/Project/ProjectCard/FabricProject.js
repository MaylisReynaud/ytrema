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
import { UpdateArticle } from "./UpdateModal/UpdateArticle";

export const FabricProject = (props) => {
    const {
        onChange,
        handleSubmit,
        values,
        setValues
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
    const [showSection, setShowSection] = useState(true);
    const isOpeningSection = () => {
        setShowSection((prev) => !prev);
    }
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const isOpeningUpdateModal = () => {
        setShowUpdateModal(!showUpdateModal);
    }

    return (
        <Section
            id='"tissus'
            className="tissus"
        >
            <TitleContainer
                className="showSection"
            >
                <SectionTitle>
                    TISSUS
                </SectionTitle>
                {showSection ? (
                    <MinusIcon onClick={isOpeningSection} />
                ) : (
                    <PlusIcon onClick={isOpeningSection} />
                )}
            </TitleContainer>
            {showSection && (
                <CardsContainer>
                    {projectCard.fabric_array.map((fabric) => (
                        <CardContainer key={fabric.id}>
                            <ModifyDeleteContainer>
                                <ModifyContainer>
                                    <ModifyButton
                                        aria-label="Modifier ce projet"
                                        onClick={isOpeningUpdateModal}
                                    />
                                </ModifyContainer>
                                <UpdateArticle
                                        setShowUpdateModal={setShowUpdateModal}
                                        showUpdateModal={showUpdateModal}
                                        word={'MODIFIER CE TISSU'}
                                        onChange={onChange}
                                        values={values}
                                        setValues={setValues}
                                        handleSubmit={handleSubmit}
                                        fabric={fabric}
                                    />
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
            )}
        </Section>
    )
} 

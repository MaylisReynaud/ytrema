import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { projectCardLinks } from "../../../utils/projectCardLinks";
import {
    ArrowContainer,
    Container,
    ReturnArrow,
    TitleContainer,
    HeaderContainer,
    ProjectTitle,
    ProjectLinksContainer,
    LinksWrapper,
    LinkItem,
    LinkStyle,
    NavProject,
    ActiveLinkStyle,
    ProjectMenuLinks,
    ArrowTitleContainer,
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
    TextContainer,

} from "./style";
import { ImageCard } from "../../ArticlesPage/Fabric/Card/style";
export const ProjectCard = () => {
    const { id } = useParams();
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { persistedReducer } = useSelector((state) => state);
    const auth = persistedReducer.auth;
    const isLogged = auth.isLogged;
    const activeSession = sessionStorage.getItem("token");
    const projects = persistedReducer.projects;
    const projectCard = projects.value.find((project) => project.id == id);
    const [deleteOneProject] = useDeleteOneProjectMutation(projectCard.id, auth.id);
    const [updateOneProject] = useUpdateOneProjectMutation(projectCard.id, auth.id);
    const [updateProjectInfo, setUpdateProjectInfo] = useState(false);


    return (
        <>
            {/* cs site sezane */}
            <Container className="container">
                {isLogged === true && activeSession && (
                    <>
                        <HeaderContainer>
                            <ArrowTitleContainer className="title container">
                                <ArrowContainer className="returnArrow">
                                    <ReturnArrow />
                                </ArrowContainer>
                                <TitleContainer>
                                    <ProjectTitle
                                        className="ProjectName">
                                        {projectCard.name}
                                    </ProjectTitle>
                                </TitleContainer>
                            </ArrowTitleContainer>
                            <NavProject>
                                <ProjectLinksContainer className="ItemList">
                                    <LinksWrapper className="Menubar">
                                        {projectCardLinks.map((projectLink) => {
                                            return (
                                                <LinkItem
                                                    key={projectLink.id}
                                                >
                                                    <ProjectMenuLinks
                                                        to={projectLink.id}
                                                        spy={true}
                                                        smooth={true}
                                                        duration={500}
                                                        exact="true"
                                                    >
                                                        {projectLink.name}
                                                    </ProjectMenuLinks>
                                                </LinkItem>
                                            )
                                        })}
                                    </LinksWrapper>
                                </ProjectLinksContainer>
                            </NavProject>
                        </HeaderContainer>
                        <Section
                            id='tissus'
                        >
                            {projectCard.fabric_array.map((fabric) => (
                                <CardsContainer key={fabric.id}>
                                <CardContainer className="Card">
                                    <ModifyDeleteContainer className="ModifyDeleteContainer">
                                        <ModifyContainer>
                                            <ModifyButton />
                                        </ModifyContainer>
                                        <TrashContainer>
                                            <TrashButton />
                                        </TrashContainer>
                                    </ModifyDeleteContainer>

                                    <ImgContainer className="ImgContainer">
                                        <CardImg
                                            className="ItemPicture"
                                            src={fabric.photo}
                                            alt={fabric.name}
                                        />
                                    </ImgContainer>
                               
                                        <CardText>{fabric.name} - {fabric.fabric} - {fabric.used_size} cm</CardText>
                                

                                </CardContainer>
                            </CardsContainer>
                           ) )}
                        </Section>
                        <Section
                            id='mercerie'
                        >
                            {projectCard.haberdashery_array.map((haberdashery) => (
                                <CardsContainer key={haberdashery.id}>
                                <CardContainer>
                                    <ModifyDeleteContainer>
                                        <ModifyContainer>
                                            <ModifyButton />
                                        </ModifyContainer>
                                        <TrashContainer>
                                            <TrashButton />
                                        </TrashContainer>
                                    </ModifyDeleteContainer>

                                    <ImgContainer>
                                        <CardImg
                                            src={haberdashery.photo}
                                            alt={haberdashery.name}
                                        />
                                    </ImgContainer>
                               
                                        <CardText>{haberdashery.name} - {haberdashery.used_size} utilisé</CardText>
                                

                                </CardContainer>
                            </CardsContainer>
                           ) )}
                        </Section>
                    </>
                )
                }
            </Container >
        </>
    )
} 
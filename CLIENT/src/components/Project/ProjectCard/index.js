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
    SectionTitle,

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
            <Container >
                {isLogged === true && activeSession && (
                    <>
                        <HeaderContainer>
                            <ArrowTitleContainer>
                                <ArrowContainer 
                                     onClick={() => {
                                        navigate("/Projets");
                                      }}
                                >
                                    <ReturnArrow />
                                </ArrowContainer>
                                <TitleContainer>
                                    <ProjectTitle>
                                        {projectCard.name}
                                    </ProjectTitle>
                                </TitleContainer>
                            </ArrowTitleContainer>
                            <NavProject>
                                <ProjectLinksContainer>
                                    <LinksWrapper>
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
                            className="tissus"
                        >
                            <SectionTitle>
                                TISSUS
                            </SectionTitle>
                            {projectCard.fabric_array.map((fabric) => (
                                <CardsContainer key={fabric.id}>
                                <CardContainer>
                                    <ModifyDeleteContainer>
                                        <ModifyContainer>
                                            <ModifyButton />
                                        </ModifyContainer>
                                        <TrashContainer>
                                            <TrashButton />
                                        </TrashContainer>
                                    </ModifyDeleteContainer>

                                    <ImgContainer >
                                        <CardImg
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
                            <SectionTitle
                            className="mercerie">
                                MERCERIE
                            </SectionTitle>
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
                               
                                        <CardText
                                            className="mercerie"
                                        >{haberdashery.name} - {haberdashery.used_size} utilisé</CardText>
                                

                                </CardContainer>
                            </CardsContainer>
                           ) )}
                        </Section>
                        <Section
                            id='patron'
                            className="patron"
                        >
                            <SectionTitle
                            className="patron">
                                PATRON
                            </SectionTitle>
                            {projectCard.pattern_array.map((pattern) => (
                                <CardsContainer key={pattern.id}>
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
                                            src={pattern.photo}
                                            alt={pattern.name}
                                        />
                                    </ImgContainer>
                               
                                        <CardText
                                            className="patron"
                                        >{pattern.clothing} -{pattern.name} - {pattern.brand} </CardText>
                                

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
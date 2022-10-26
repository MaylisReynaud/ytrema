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
import YtremaLogo from "../../../assets/images/logo.png";
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
    CardParagraph,
    CostTab,
    CostTabCell,
    CostTabRow,
    CostTabHeadCell,
    CostPicture

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
                                                        offset={100}
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
                            ))}
                        </Section>
                        <Section
                            id='mercerie'
                            className="mercerie"
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
                            ))}
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
                                        >{pattern.clothing} - {pattern.name} - {pattern.brand} - {pattern.format} </CardText>


                                    </CardContainer>
                                </CardsContainer>
                            ))}
                        </Section>
                        <Section
                            id='notes'
                            className="notes"
                        >
                            <SectionTitle
                                className="notes">
                                NOTES
                            </SectionTitle>
                            {projectCard.photos_array.map((notes) => (
                                <CardsContainer key={notes.id}>
                                    <CardContainer>
                                        <ModifyDeleteContainer>
                                            <ModifyContainer>
                                                <ModifyButton />
                                            </ModifyContainer>
                                            <TrashContainer>
                                                <TrashButton />
                                            </TrashContainer>
                                        </ModifyDeleteContainer>

                                        <ImgContainer
                                            className="notes"
                                        >
                                            <CardImg
                                                src={notes.photo != undefined ? notes.photo : YtremaLogo}
                                                alt={notes.name}
                                            />
                                        </ImgContainer>

                                        <CardParagraph
                                            className="patron"
                                        >
                                            {notes.personal_notes}
                                        </CardParagraph>


                                    </CardContainer>
                                </CardsContainer>
                            ))}
                        </Section>
                        <Section
                            id='cout'
                            className="cout"
                        >
                            <SectionTitle
                                className="cout">
                                COÛT DU PROJET
                            </SectionTitle>


                            <CardsContainer
                                className="cout"
                            >
                                <CardContainer
                                    className="cout"
                                >

                                    <CostTab>
                                        <thead>
                                            <CostTabRow>
                                                <CostTabHeadCell className="photo"> Photo </CostTabHeadCell>
                                                <CostTabHeadCell className="name">Nom </CostTabHeadCell>
                                                <CostTabHeadCell className="quantity"> Quantité </CostTabHeadCell>
                                                <CostTabHeadCell className="price"> Coût </CostTabHeadCell>
                                            </CostTabRow>
                                        </thead>
                                        <tbody>
                                            <CostTabRow
                                                className="info"
                                            >
                                                <CostTabCell className="photo"><CostPicture src={projectCard.fabric_array[1].photo} ></CostPicture>  </CostTabCell>
                                                <CostTabCell className="name">{projectCard.fabric_array[1].name} </CostTabCell>
                                                <CostTabCell className="quantity"> {projectCard.fabric_array[1].used_size} </CostTabCell>
                                                <CostTabCell className="price"> Coût </CostTabCell>
                                            </CostTabRow>
                                        </tbody>
                                    </CostTab>

                                </CardContainer>
                            </CardsContainer>

                        </Section>
                    </>
                )
                }
            </Container >
        </>
    )
} 
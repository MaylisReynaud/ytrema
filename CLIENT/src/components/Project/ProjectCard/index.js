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
    CostPicture,
    AddReturnButtonContainer,
    AddButton,
    ReturnButton

} from "./style";
import { ImageCard } from "../../ArticlesPage/Fabric/Card/style";
import { NoteModal } from "./NoteModal";

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

    //Show adding note modal
    const [showNoteModal, setShowNoteModal] = useState(false);
    const isOpeningNoteModal = () => {
        setShowNoteModal((prev) => !prev);
    }

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
                            {/* <NavProject>
                                <ProjectLinksContainer>
                                    <LinksWrapper>
                                        {projectCardLinks.map((projectLink) => {
                                            return (
                                                <LinkItem
                                                    key={projectLink.id}
                                                >
                                                    <ProjectMenuLinks
                                                    href={projectLink.id}
                                                       
                                                    >
                                                        {projectLink.name}
                                                    </ProjectMenuLinks>
                                                </LinkItem>
                                            )
                                        })}
                                    </LinksWrapper>
                                </ProjectLinksContainer>
                            </NavProject> */}
                        </HeaderContainer>
                        <Section
                            id='"tissus'
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
                                        >{haberdashery.name} - {haberdashery.used_size} utilisé(es)</CardText>


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
                           
                            <AddReturnButtonContainer>

                            <SectionTitle
                                className="notes">
                                NOTES
                            </SectionTitle>
                                <AddButton
                                    onClick={isOpeningNoteModal}
                                    className="AddOneMoreNote"
                                />
                                <NoteModal
                                    showNoteModal={showNoteModal}
                                    setShowNoteModal={setShowNoteModal}
                                />
                            </AddReturnButtonContainer>
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
                                        {projectCard.fabric_array ? projectCard.fabric_array.map((fabric) => (
                                            <CostTabRow
                                                className="info"
                                                key={fabric.id}
                                            >
                                                <CostTabCell className="photo"><CostPicture src={fabric.photo != undefined ? fabric.photo : null} ></CostPicture>  </CostTabCell>
                                                <CostTabCell className="name">{fabric.name} </CostTabCell>
                                                <CostTabCell className="quantity"> {fabric.used_size} </CostTabCell>
                                                <CostTabCell className="price"> {fabric.article_cost} € </CostTabCell>
                                            </CostTabRow>
                                        ))
                                            : null}

                                        {projectCard.haberdashery_array ? projectCard.haberdashery_array.map((haberdashery) => (
                                            <CostTabRow
                                                className="info"
                                                key={haberdashery.id}
                                            >
                                                <CostTabCell className="photo"><CostPicture src={haberdashery.photo != undefined ? haberdashery.photo : null} ></CostPicture>  </CostTabCell>
                                                <CostTabCell className="name">{haberdashery.name} </CostTabCell>
                                                <CostTabCell className="quantity"> {haberdashery.used_size} </CostTabCell>
                                                <CostTabCell className="price"> {haberdashery.article_cost} € </CostTabCell>
                                            </CostTabRow>
                                        ))
                                            : null}

                                        {projectCard.pattern_array ? projectCard.pattern_array.map((pattern) => (
                                            <CostTabRow
                                                className="info"
                                                key={pattern.id}
                                            >
                                                <CostTabCell className="photo"><CostPicture src={pattern.photo != undefined ? pattern.photo : null} ></CostPicture>  </CostTabCell>
                                                <CostTabCell className="name">{pattern.name} </CostTabCell>
                                                <CostTabCell className="quantity"> 1 </CostTabCell>
                                                <CostTabCell className="price"> {pattern.article_cost} € </CostTabCell>
                                            </CostTabRow>
                                        ))
                                            : null}
                                        <CostTabRow className="totalCost">
                                            <CostTabCell className="totalCostName"> COUT TOTAL</CostTabCell>
                                            <CostTabCell className="totalCost€"> {projectCard.cost_price} €</CostTabCell>
                                        </CostTabRow>
                                    </tbody>
                                </CostTab>

                            </CardContainer>


                        </Section>
                    </>
                )
                }
            </Container >
        </>
    )
} 

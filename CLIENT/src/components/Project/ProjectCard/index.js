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
import { projectCardLinks } from "../../../utils/projectCardLinks";
import YtremaLogo from "../../../assets/images/logo.png";
import {
    ArrowContainer,
    Container,
    ReturnArrow,
    TitleContainer,
    HeaderContainer,
    ProjectTitle,
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
    SectionTitle,
    CardParagraph,
    CostPicture,
    AddReturnButtonContainer,
    AddButton,
    StatusContainer,
    Status,
    InfoCardContainer,
    CostTable,
    RowTable,
    ColTable,
    CostPictureContainer

} from "./style";
import { NoteModal } from "./NoteModal";
import { DeleteModal } from "../../DeleteModal";

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
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const isOpenDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    }

    //Show adding note modal
    const [showNoteModal, setShowNoteModal] = useState(false);
    const isOpeningNoteModal = () => {
        setShowNoteModal((prev) => !prev);
    }

    const deleteCard = () => {
        const urlParams = {
            memberId: auth.id,
            projectId: projectCard.id,
        };
        deleteOneProject(urlParams);
        dispatch(deleteProject(projectCard.id));
        setShowDeleteModal(!showDeleteModal);
        navigate("/projets");
        toast.success('Projet supprimé avec succès👌', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            role: "alert"
        });
    };

    const updateCard = () => {
        setUpdateProjectInfo(true);
    };

    const [values, setValues] = useState({
        name: projectCard.name,
        date: projectCard.date,
        status: projectCard.status,
        cost_price: projectCard.cost_price,
    });

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const valuesToSend = values;

        const urlParams = {
            memberId: auth.id,
            projectId: projectCard.id,
            body: valuesToSend,
        };

        const { updatedProjectData } = await updateOneProject(urlParams).unwrap();

        //  Mettre à jour le store
        dispatch(updateProject(updatedProjectData));
        setUpdateProjectInfo(false);
        toast.success('Projet modifié avec succès👌', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            role: "alert"
        });
    };

    return (
        <>

            <Container >
                {isLogged === true && activeSession && (
                    <>
                        <HeaderContainer>
                            <ArrowTitleContainer>
                                <ArrowContainer>
                                    <ReturnArrow
                                        aria-label="Retourner à la liste des projets"
                                        onClick={() => {
                                            navigate("/Projets");
                                        }}
                                    />
                                </ArrowContainer>
                                <ModifyDeleteContainer>
                                    <ModifyContainer>
                                        <ModifyButton
                                            aria-label="Modifier ce projet"
                                            onClick={updateCard}
                                        />
                                    </ModifyContainer>
                                    <TrashContainer>
                                        <TrashButton
                                            aria-label="Supprimer ce projet"
                                            onClick={isOpenDeleteModal}
                                        />
                                    </TrashContainer>
                                    <DeleteModal
                                        setShowDeleteModal={setShowDeleteModal}
                                        showDeleteModal={showDeleteModal}
                                        deleteAction={deleteCard}
                                        word={'SUPPRIMER CE PROJET'}
                                    />
                                </ModifyDeleteContainer>

                            </ArrowTitleContainer>
                            <TitleContainer>
                                <ProjectTitle>
                                    {projectCard.name}
                                </ProjectTitle>
                            </TitleContainer>
                            <StatusContainer>

                                <Status>Statut : {projectCard.status} </Status>
                            </StatusContainer>
                        </HeaderContainer>
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
                        <Section
                            id='mercerie'
                            className="mercerie"
                        >
                            <SectionTitle
                                className="mercerie">
                                MERCERIE
                            </SectionTitle>
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
                        </Section>
                        <Section
                            id='patron'
                            className="patron"
                        >
                            <SectionTitle
                                className="patron">
                                PATRON
                            </SectionTitle>
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
                            <CardsContainer >
                                {projectCard.photos_array.map((notes, index) => (
                                    <CardContainer key={notes.id}>
                                        <ModifyDeleteContainer>
                                            <ModifyContainer>
                                                <ModifyButton />
                                            </ModifyContainer>

                                            {index !== 0 && (
                                                <TrashContainer>
                                                    <TrashButton />
                                                </TrashContainer>
                                            )}
                                        </ModifyDeleteContainer>
                                        {notes.photo !== "https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Illustrations%2Fdefault-photo-project-ytrema.png?alt=media&token=8e94edb2-aedd-49cc-9519-0242941d6fc4" ? (<InfoCardContainer>
                                            <ImgContainer
                                                className="notes"
                                            >
                                                <CardImg
                                                    src={notes.photo}
                                                    alt={notes.name}
                                                />
                                            </ImgContainer>

                                            <CardParagraph>
                                                {notes.personal_notes}
                                            </CardParagraph>
                                        </InfoCardContainer>)
                                            : (
                                                <InfoCardContainer>
                                                    <CardParagraph
                                                        className="notes"
                                                    >
                                                        {notes.personal_notes}
                                                    </CardParagraph>
                                                </InfoCardContainer>
                                            )}

                                    </CardContainer>
                                ))}
                            </CardsContainer>
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
                                className="Cost"
                            >

                                <CostTable>
                                    <RowTable className="title">
                                        <ColTable
                                            className="title"
                                            size={2}
                                        >
                                            Photo
                                        </ColTable>
                                        <ColTable
                                            className="number title"
                                            size={1}
                                        >
                                            Quantité
                                        </ColTable>
                                        <ColTable
                                            className="number title "
                                            size={1}
                                        >
                                            Coût
                                        </ColTable>
                                    </RowTable>

                                    {projectCard.fabric_array ? projectCard.fabric_array.map((fabric) => (
                                        <RowTable key={fabric.id}>
                                            <ColTable>
                                                <CostPicture src={fabric.photo !== undefined ? fabric.photo : null} />  </ColTable>
                                            <ColTable className="number"> {fabric.used_size} </ColTable>
                                            <ColTable className="number"> {fabric.article_cost} €</ColTable>
                                        </RowTable>
                                    ))
                                        : null}

                                    {projectCard.haberdashery_array ? projectCard.haberdashery_array.map((haberdashery) => (
                                        <RowTable key={haberdashery.id}>
                                            <ColTable>
                                                <CostPictureContainer>
                                                    <CostPicture src={haberdashery.photo !== undefined ? haberdashery.photo : null} />
                                                </CostPictureContainer>
                                            </ColTable>
                                            <ColTable className="number"> {haberdashery.used_size} </ColTable>
                                            <ColTable className="number"> {haberdashery.article_cost} €</ColTable>
                                        </RowTable>
                                    ))
                                        : null}
                                    {projectCard.pattern_array ? projectCard.pattern_array.map((pattern) => (
                                        <RowTable key={pattern.id}>
                                            <ColTable>
                                                <CostPictureContainer>
                                                    <CostPicture src={pattern.photo !== undefined ? pattern.photo : null} />
                                                </CostPictureContainer>
                                            </ColTable>
                                            <ColTable className="number"> 1 </ColTable>
                                            <ColTable className="number"> {pattern.article_cost} €</ColTable>
                                        </RowTable>
                                    ))
                                        : null}
                                    <RowTable className="totalCost">
                                        <ColTable className="totalCost " >
                                            COÛT TOTAL
                                        </ColTable>
                                        <ColTable className="totalCost " >

                                        </ColTable>
                                        <ColTable className="number totalCost">
                                            {projectCard.cost_price} €
                                        </ColTable>
                                    </RowTable>
                                </CostTable>

                            </CardsContainer>


                        </Section>
                    </>
                )
                }
            </Container >
        </>
    )
} 

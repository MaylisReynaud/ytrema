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
    AddReturnButtonContainer,
    AddButton,
    CardParagraph,
    MinusIcon,
    PlusIcon,
    TitleContainer
} from "./style";
import { AddNoteModal } from "./AddArticleModal/AddNoteModal";
import { useGetAllPhotosQuery } from "../../../store/api/ytremaApi";
import { addAllPhotos } from "../../../store/state/projectSlice";

export const NoteProject = (props) => {
    const {
        handleAddNoteSubmit,
        addNoteOnChange,
        addNoteValues,
        setAddNoteValues,
        pictureURL,
        setPictureURL,
        preview
    } = props;
    const { id } = useParams();
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { persistedReducer } = useSelector((state) => state);
    const auth = persistedReducer.auth;
    const projects = persistedReducer.projects;
    // const photos = persistedReducer.photos;
    console.log(projects, "<--projects")
    const projectCard = projects.value.find((project) => project.id == id);


    //Show adding note modal
    const [showAddNoteModal, setShowAddNoteModal] = useState(false);
    const isOpeningNoteModal = () => {
        setShowAddNoteModal((prev) => !prev);
    }

    // SHOW SECTION
    const [showSection, setShowSection] = useState(true);
    const isOpeningSection = () => {
        setShowSection((prev) => !prev);
    }


     // ADD NOTE
     const urlParams = {
        projectId: projectCard.id,
        memberId: auth.id,
    };
    console.log(urlParams, "<-- url params auth.id,projectCard.id" )
     const { data, isSuccess } = useGetAllPhotosQuery(urlParams);
     console.log(data, "<--data all notes")

    //  console.log(useGetAllPhotosQuery(urlParams), "<--useGetAllNotesQuery(projectCard.id, auth.id)")
     useEffect(() => {
         if ((isSuccess) && data) {
            console.log("coucou dans useEffect NoteProject")
             dispatch(addAllPhotos(data.photos));
         }
     }, [data]);

    return (
        <Section
            // id='notes'
            // className="notes"
        >

            <AddReturnButtonContainer>
                <TitleContainer
                    className="showSection"
                >
                    <SectionTitle>
                        NOTES
                    </SectionTitle>
                    <AddButton
                        onClick={isOpeningNoteModal}
                    />
                    <AddNoteModal
                        showAddNoteModal={showAddNoteModal}
                        setShowAddNoteModal={setShowAddNoteModal}
                        word={"AJOUTER UNE NOTE"}
                        addNoteOnChange={addNoteOnChange}
                        addNoteValues={addNoteValues}
                        setAddNoteValues={setAddNoteValues}
                        handleAddNoteSubmit={handleAddNoteSubmit}
                        pictureURL={pictureURL}
                        setPictureURL={setPictureURL}
                        preview={preview}
                    />
                    {showSection ? (
                        <MinusIcon onClick={isOpeningSection} />
                    ) : (
                        <PlusIcon onClick={isOpeningSection} />
                    )}
                </TitleContainer>
            </AddReturnButtonContainer>
            {showSection && (
                <CardsContainer >
                    {projectCard.photos_array.map((notes, index) => (
                        <CardContainer
                            key={notes.id}
                          
                        >
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
                            {index !== 0 ? (
                                notes.photo !== "https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Illustrations%2Fdefault-photo-project-ytrema.png?alt=media&token=8e94edb2-aedd-49cc-9519-0242941d6fc4" ? (
                                    <InfoCardContainer>
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
                                    </InfoCardContainer>

                                ) : (
                                    <InfoCardContainer>
                                        <CardParagraph
                                            className="notes"
                                        >
                                            {notes.personal_notes}
                                        </CardParagraph>
                                    </InfoCardContainer>
                                )
                            ) :
                                (
                                    <InfoCardContainer>
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
                                    </InfoCardContainer>
                                )}


                        </CardContainer>
                    ))
                    }
                </CardsContainer >
            )}

        </Section >
    )
} 

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
import { UpdateNote } from "./UpdateModal/UpdateNote";
import { useDeleteOnePhotoProjectMutation, useGetAllPhotosQuery } from "../../../store/api/ytremaApi";
import { addAllPhotos } from "../../../store/state/projectSlice";
import { DeleteModal } from "../../DeleteModal";
export const NoteProject = (props, index) => {
    const {
        handleAddNoteSubmit,
        addNoteOnChange,
        addNoteValues,
        setAddNoteValues,
        pictureURL,
        setPictureURL,
        preview,
        setPreview,
        handleNoteSubmit,
        noteOnChange,
        noteValues,
        setNoteValues,
        photosArrayId,
        deleteAction,
    } = props;

    //Show adding note modal
    const [showAddNoteModal, setShowAddNoteModal] = useState(false);
    const isOpeningNoteModal = () => {
        setShowAddNoteModal((prev) => !prev);
    }

    // SHOW SECTION
    const [showSection, setShowSection] = useState(true);
    const isOpeningSection = () => {
        setShowSection((prev) => !prev);
    };


    // ADD NOTE
    const dispatch = useDispatch();
    const { persistedReducer } = useSelector((state) => state);
    const auth = persistedReducer.auth;
    const { id } = useParams();
    const projects = persistedReducer.projects;
    const projectCard = projects.value.find((project) => project.id == id);
    const urlParams = {
        projectId: projectCard.id,
        memberId: auth.id,
    };
    const { data, isSuccess } = useGetAllPhotosQuery(urlParams);

    useEffect(() => {
        if ((isSuccess) && data) {
            dispatch(addAllPhotos(data.photos));
        }
    }, [data]);

    //UPDATE NOTE
    const photo = projectCard.photos_array.map(photo => photo)

    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [noteInfo, setNoteInfo] = useState();
    const isOpeningUpdateModal = (id, photo, personal_notes) => {
        setNoteValues({
            ...noteValues,
            id: id,
            photo: photo,
            personal_notes: personal_notes
        })
        setShowUpdateModal(!showUpdateModal);
    };

    //DELETE NOTE
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const isOpeningDeleteModal = (id) => {
        setNoteValues({
            ...noteValues,
            id: id,
        })
        setShowDeleteModal(!showDeleteModal);
    };

    return (
        <Section>
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
            {showSection && data && (
                <CardsContainer >
                    {data.photos.map((notes, index) => (
                        <CardContainer
                            key={notes.id}

                        >
                            <ModifyDeleteContainer>
                                <ModifyContainer>
                                    <ModifyButton
                                        aria-label="Modifier cette note"
                                        onClick={() => {
                                            isOpeningUpdateModal(notes.id, notes.photo, notes.personal_notes)
                                        }}
                                    />
                                </ModifyContainer>

                                {index !== 0 && (

                                    <TrashContainer>
                                        <TrashButton
                                            aria-label="Supprimer cette note"
                                            onClick={() => { isOpeningDeleteModal(notes.id) }}
                                        />
                                    </TrashContainer>


                                )}
                            </ModifyDeleteContainer>
                            <InfoCardContainer>
                                <ImgContainer
                                    className="notes"
                                >
                                    <CardImg
                                        src={notes.photo !== null ? notes.photo : "https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/Illustrations%2Fdefault-photo-project-ytrema.png?alt=media&token=8e94edb2-aedd-49cc-9519-0242941d6fc4"}
                                        alt={notes.name}
                                    />
                                </ImgContainer>

                                <CardParagraph>
                                    {notes.personal_notes}
                                </CardParagraph>
                            </InfoCardContainer>
                        </CardContainer>
                    ))
                    }
                </CardsContainer >
            )}
            <UpdateNote
                setShowUpdateModal={setShowUpdateModal}
                showUpdateModal={showUpdateModal}
                word={'MODIFIER LA NOTE'}
                noteOnChange={noteOnChange}
                noteValues={noteValues}
                setNoteValues={setNoteValues}
                handleNoteSubmit={handleNoteSubmit}
                pictureURL={pictureURL}
                setPictureURL={setPictureURL}
                preview={preview}
                photosArrayId={photosArrayId}

            />
            <DeleteModal
                setShowDeleteModal={setShowDeleteModal}
                showDeleteModal={showDeleteModal}
                deleteAction={deleteAction}
                word={'SUPPRIMER CETTE NOTE'}
            />
        </Section >
    )
} 

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
    AddReturnButtonContainer,
    AddButton,
    CardParagraph,
    MinusIcon,
    PlusIcon,
    TitleContainer
} from "./style";
import { NoteModal } from "./NoteModal";

export const NoteProject = () => {
    const { id } = useParams();
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { persistedReducer } = useSelector((state) => state);
    const auth = persistedReducer.auth;
    const projects = persistedReducer.projects;
    const projectCard = projects.value.find((project) => project.id == id);
    //Show adding note modal
    const [showNoteModal, setShowNoteModal] = useState(false);
    const isOpeningNoteModal = () => {
        setShowNoteModal((prev) => !prev);
    }

    const [showSection, setShowSection] = useState(true);
    const isOpeningSection = () => {
        setShowSection((prev) => !prev);
    }

    return (
        <Section
            id='notes'
            className="notes"
        >

            <AddReturnButtonContainer>
                <TitleContainer
                    className="showSection"
                >
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
                            className="otherHeight"
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

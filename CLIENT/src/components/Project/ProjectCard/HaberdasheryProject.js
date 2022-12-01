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
    MinusIcon,
    PlusIcon,
    TitleContainer,
    AddButton,
    AddReturnButtonContainer,
} from "./style";

import { UpdateHaberdashery } from "./UpdateModal/UpdateHaberdashery";
import { AddArticleModal } from "./AddArticleModal";
import { useGetAllHaberdasheriesQuery } from "../../../store/api/ytremaApi";
import { addAllHaberdasheries } from "../../../store/state/haberdasherySlice";

export const HaberdasheryProject = (props) => {
    const {
        handleHaberdasherySubmit,
        haberdasheryOnChange,
        haberdasheryValues,
        setHaberdasheryValues,
        haberdasheryArray,
        handleAddHaberdasherySubmit,
        addHaberdasheryOnChange,
        addHaberdasheryValues,
        setAddHaberdasheryValues
    } = props;

    // SHOW SECTION
    const [showSection, setShowSection] = useState(true);
    const isOpeningSection = () => {
        setShowSection((prev) => !prev);
    };

    //UPDATE HABERDASHERY
    const dispatch = useDispatch();
    const { persistedReducer } = useSelector((state) => state);
    const auth = persistedReducer.auth;
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const isOpeningUpdateModal = (id, used_size, article_cost) => {
        setHaberdasheryValues({
            ...haberdasheryValues,
            old_used_size: used_size,
            old_article_cost: article_cost,
            haberdasheryId: id,
            used_size: ""
        });
        setShowUpdateModal(!showUpdateModal);
    };

    const { data, isSuccess } = useGetAllHaberdasheriesQuery(auth.id);
    useEffect(() => {
        if ((isSuccess) && data) {
            dispatch(addAllHaberdasheries(data.haberdasheries));
        }
    }, [data]);


    return (
        <Section
            id='mercerie'
            className="mercerie"
        >
            <AddReturnButtonContainer>
                <TitleContainer
                    className="showSection"
                >
                    <SectionTitle
                        className="mercerie">
                        MERCERIE
                    </SectionTitle>
                    <AddButton
                        // onClick={() => {
                        //     isOpeningAddFabricModal();
                        //     removeFabricsUsed();
                        // }}
                        className="AddOneMoreNote"
                    />
                    {showSection ? (
                        <MinusIcon onClick={isOpeningSection} />
                    ) : (
                        <PlusIcon onClick={isOpeningSection} />
                    )}
                </TitleContainer>
            </AddReturnButtonContainer>
            {showSection && (
                <CardsContainer>

                    {haberdasheryArray.map((haberdashery) => (
                        <CardContainer key={haberdashery.id}>
                            <ModifyDeleteContainer>
                                <ModifyContainer>
                                    <ModifyButton
                                        aria-label="Modifier cet article"
                                        onClick={() => {
                                            isOpeningUpdateModal(haberdashery.id, haberdashery.used_size, haberdashery.article_cost)
                                        }}
                                    />
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
                    ))
                    }
                    <UpdateHaberdashery
                        setShowUpdateModal={setShowUpdateModal}
                        showUpdateModal={showUpdateModal}
                        word={'MODIFIER CET ARTICLE'}
                        haberdasheryOnChange={haberdasheryOnChange}
                        haberdasheryValues={haberdasheryValues}
                        setHaberdasheryValues={setHaberdasheryValues}
                        handleHaberdasherySubmit={handleHaberdasherySubmit}
                    />
                </CardsContainer>
            )}
        </Section>
    )
} 

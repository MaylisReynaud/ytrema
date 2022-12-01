import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import { AddHaberdasheryModal } from "./AddArticleModal/AddHaberdasheryModal";
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
    const isOpeningUpdateModal = (id, is_cut, is_a_set, size, price, used_size) => {
        setHaberdasheryValues({
            ...haberdasheryValues,
            haberdashery_id: id,
            haberdashery_is_cut: is_cut,
            haberdashery_is_a_set: is_a_set,
            haberdashery_article_qty: "",
            haberdashery_size: size,
            haberdashery_price: price,
            haberdashery_used_size: "",
        });
        setShowUpdateModal(!showUpdateModal);
    };

    // ADD HABERDASHERY
    const { data, isSuccess } = useGetAllHaberdasheriesQuery(auth.id);
    useEffect(() => {
        if ((isSuccess) && data) {
            dispatch(addAllHaberdasheries(data.haberdasheries));
        }
    }, [data]);

    const haberdasheries = persistedReducer.haberdasheries;
    const [showAddArticleModal, setShowAddArticleModal] = useState(false);
    const isOpeningAddHaberdasheryModal = () => {
        setShowAddArticleModal(!showAddArticleModal);
    };
    const haberdasheriesStock = haberdasheries.value.map(haberdashery => haberdashery.id);

    const [haberdasheriesFiltered, setHaberdasheriesFiltered] = useState([]);


    const removeHaberdasheriesUsed = () => {
        // Create array with all haberdasheries remaining 
        if (haberdasheriesStock.length > 0) {
            let haberdasheriesFilteredArray = [];
            let selectedHaberdasheryIdsArray = haberdasheryArray.map(elem => elem.id);

            haberdasheries.value.map(haberdashery => {
                !selectedHaberdasheryIdsArray.includes(haberdashery.id) && haberdasheriesFilteredArray.push(haberdashery);
            })

            setHaberdasheriesFiltered(haberdasheriesFilteredArray);
        }
    }
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
                        onClick={() => {
                            isOpeningAddHaberdasheryModal();
                            removeHaberdasheriesUsed();
                        }}
                        className="AddOneMoreNote"
                    />
                    <AddHaberdasheryModal
                        setShowAddArticleModal={setShowAddArticleModal}
                        showAddArticleModal={showAddArticleModal}
                        word={'AJOUTER UNE MERCERIE'}
                        addHaberdasheryOnChange={addHaberdasheryOnChange}
                        addHaberdasheryValues={addHaberdasheryValues}
                        setAddHaberdasheryValues={setAddHaberdasheryValues}
                        handleAddHaberdasherySubmit={handleAddHaberdasherySubmit}
                        haberdasheriesFiltered={haberdasheriesFiltered}
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

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
import { useGetAllFabricsQuery } from "../../../store/api/ytremaApi";
import { addAllFabrics } from "../../../store/state/fabricSlice";
import { UpdateFabric } from "./UpdateModal/UpdateFabric";
import { AddFabricModal } from "./AddArticleModal/AddFabricModal";
import { DeleteModal } from "../../DeleteModal";

export const FabricProject = (props) => {
    const {
        handleFabricSubmit,
        fabricOnChange,
        fabricValues,
        setFabricValues,
        handleAddFabricSubmit,
        addFabricOnChange,
        addFabricValues,
        setAddFabricValues,
        fabricArray,
        setEntityValues,
        entityValues,
        deleteAction,
        projectCard
    } = props;

    // SHOW SECTION
    const [showSection, setShowSection] = useState(true);
    const isOpeningSection = () => {
        setShowSection((prev) => !prev);
    };

    //UPDATE FABRIC
    const { persistedReducer } = useSelector((state) => state);
    const auth = persistedReducer.auth;
    const dispatch = useDispatch();
    const { data, isSuccess } = useGetAllFabricsQuery(auth.id);
    useEffect(() => {
        if (isSuccess && data) {
            dispatch(addAllFabrics(data.fabrics));
        }
    }, [data]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const isOpeningUpdateModal = (id, used_size, article_cost) => {
        setFabricValues({
            ...fabricValues,
            old_used_size: used_size,
            old_article_cost: article_cost,
            fabricId: id,
            used_size: ""
        });
        setShowUpdateModal(!showUpdateModal);
    };

    //ADD FABRIC
    const fabrics = persistedReducer.fabrics;
    const [showAddArticleModal, setShowAddArticleModal] = useState(false);
    const isOpeningAddFabricModal = () => {
        setShowAddArticleModal(!showAddArticleModal);
    };
    const fabricsStock = fabrics.value.map(fabric => fabric.id);


    const [fabricsFiltered, setFabricsFiltered] = useState([]);


    const removeFabricsUsed = () => {
        // Create array with all fabrics remaining 
        if (fabricsStock.length > 0) {
            let fabricsFilteredArray = [];
            let selectedFabricIdsArray = fabricArray.map(elem => elem.id);

            fabrics.value.map(fabric => {
                !selectedFabricIdsArray.includes(fabric.id) && fabricsFilteredArray.push(fabric);
            })

            setFabricsFiltered(fabricsFilteredArray);
        }
    };

    //DELETE ARTICLE
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const isOpeningDeleteModal = (id) => {
        setEntityValues({
            ...entityValues,
            entity: "fabric",
            entityId: id
        })
        setShowDeleteModal(!showDeleteModal);
    };

    return (
        <Section
            id='"tissus'
            className="tissus"
        >
            <AddReturnButtonContainer>
                <TitleContainer
                    className="showSection"
                >
                    <SectionTitle
                        className="addArticle"
                    >
                        TISSUS
                    </SectionTitle>
                    <AddButton
                        onClick={() => {
                            isOpeningAddFabricModal();
                            removeFabricsUsed();
                        }}
                        className="AddOneMoreNote"
                    />
                    <AddFabricModal
                        setShowAddArticleModal={setShowAddArticleModal}
                        showAddArticleModal={showAddArticleModal}
                        word={'AJOUTER UN TISSU'}
                        addFabricOnChange={addFabricOnChange}
                        addFabricValues={addFabricValues}
                        setAddFabricValues={setAddFabricValues}
                        handleAddFabricSubmit={handleAddFabricSubmit}
                        fabricsFiltered={fabricsFiltered}
                    />
                    {showSection ? (
                        <MinusIcon onClick={isOpeningSection} />
                    ) : (
                        <PlusIcon onClick={isOpeningSection} />
                    )}
                </TitleContainer>
            </AddReturnButtonContainer>

            {showSection && (
                <CardsContainer
                    className="fabric"
                >
                    {fabricArray.map((fabric) => (
                        <CardContainer
                            key={fabric.id}
                            className="fabric"
                        >
                            <ModifyDeleteContainer>
                                <ModifyContainer>
                                    <ModifyButton
                                        aria-label="Modifier ce tissu"
                                        onClick={() => {
                                            isOpeningUpdateModal(fabric.id, fabric.used_size, fabric.article_cost)
                                        }}
                                    />
                                </ModifyContainer>
                                <TrashContainer>
                                    <TrashButton
                                        aria-label="Supprimer ce tissu"
                                        onClick={() => { isOpeningDeleteModal(fabric.id) }}
                                    />
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
                    <UpdateFabric
                        setShowUpdateModal={setShowUpdateModal}
                        showUpdateModal={showUpdateModal}
                        word={'MODIFIER CE TISSU'}
                        fabricOnChange={fabricOnChange}
                        fabricValues={fabricValues}
                        setFabricValues={setFabricValues}
                        handleFabricSubmit={handleFabricSubmit}
                    />
                    <DeleteModal
                        setShowDeleteModal={setShowDeleteModal}
                        showDeleteModal={showDeleteModal}
                        deleteAction={deleteAction}
                        word={'SUPPRIMER CE TISSU'}
                    />
                </CardsContainer>
            )}
        </Section>
    )
} 

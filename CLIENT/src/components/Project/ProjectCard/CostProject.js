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
    Section,
    SectionTitle,
    CostPicture,
    CostTable,
    RowTable,
    ColTable,
    CostPictureContainer,
    MinusIcon,
    PlusIcon,
    TitleContainer
} from "./style";


export const CostProject = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { persistedReducer } = useSelector((state) => state);
    const auth = persistedReducer.auth;
    const projects = persistedReducer.projects;
    const projectCard = projects.value.find((project) => project.id == id);
    const [showSection, setShowSection] = useState(true);
    const isOpeningSection = () => {
        setShowSection((prev) => !prev);
    }

    return (
        <Section
            id='cout'
            className="cout"
        >
            <TitleContainer
                className="showSection"
            >
            <SectionTitle
                className="cout">
                COÛT DU PROJET 
            </SectionTitle>
            {showSection ? (
                <MinusIcon onClick={isOpeningSection} />
            ) : (
                <PlusIcon onClick={isOpeningSection} />
            )}
            </TitleContainer>

            {showSection && (
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
                                <ColTable className="number"> {Number(fabric.article_cost).toFixed(2)} €</ColTable>
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
                                <ColTable className="number"> {Number(haberdashery.article_cost).toFixed(2)} €</ColTable>
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
                                <ColTable className="number"> {Number(pattern.article_cost).toFixed(2)} €</ColTable>
                            </RowTable>
                        ))
                            : null}
                        <RowTable className="totalCost">
                            <ColTable className="totalCostTitle " >
                                COÛT TOTAL
                            </ColTable>
                            {/* <ColTable className="totalCost " >

                            </ColTable> */}
                            <ColTable className="number totalCost">
                                {Number(projectCard.cost_price).toFixed(2)} €
                            </ColTable>
                        </RowTable>
                    </CostTable>

                </CardsContainer>
            )}



        </Section>
    )
} 

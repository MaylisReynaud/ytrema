import React, { useState } from "react";
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
    TitleContainer
} from "./style";

import { UpdateArticle } from "./UpdateModal/UpdateArticle";

export const FabricProject = (props) => {
    const {
        handleFabricSubmit,
        fabricOnChange,
        fabricValues,
        setFabricValues,
        fabricArray
    } = props;

    const [showSection, setShowSection] = useState(true);
    const isOpeningSection = () => {
        setShowSection((prev) => !prev);
    }
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
    }

    return (
        <Section
            id='"tissus'
            className="tissus"
        >
            <TitleContainer
                className="showSection"
            >
                <SectionTitle>
                    TISSUS
                </SectionTitle>
                {showSection ? (
                    <MinusIcon onClick={isOpeningSection} />
                ) : (
                    <PlusIcon onClick={isOpeningSection} />
                )}
            </TitleContainer>
            {showSection && (
                <CardsContainer>
                    {fabricArray.map((fabric) => (
                        <CardContainer key={fabric.id}>
                            <ModifyDeleteContainer>
                                <ModifyContainer>
                                    <ModifyButton
                                        aria-label="Modifier ce projet"
                                        onClick={() => {
                                            isOpeningUpdateModal(fabric.id, fabric.used_size, fabric.article_cost)
                                        }}
                                    />
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
                    <UpdateArticle
                        setShowUpdateModal={setShowUpdateModal}
                        showUpdateModal={showUpdateModal}
                        word={'MODIFIER CE TISSU'}
                        fabricOnChange={fabricOnChange}
                        fabricValues={fabricValues}
                        setFabricValues={setFabricValues}
                        handleFabricSubmit={handleFabricSubmit}
                    />
                </CardsContainer>
            )}
        </Section>
    )
} 

import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { DeviceSize } from "../../Navbar/Responsive";
import { toast } from "react-toastify";
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
    MinusIcon,
    PlusIcon,
    TitleContainer
} from "./style";
import { DeleteModal } from "../../DeleteModal";
import { UpdateArticle } from "./UpdateModal/UpdateArticle";
import { useUpdateOneFabricProjectMutation } from "../../../store/api/ytremaApi";
import { updateFabricProject } from "../../../store/state/projectSlice";

export const FabricProject = (props) => {
    const { id } = useParams();
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { persistedReducer } = useSelector((state) => state);
    const auth = persistedReducer.auth;
    const projects = persistedReducer.projects;

    const projectCard = projects.value.find((project) => project.id == id);

    const [showSection, setShowSection] = useState(true);
    const isOpeningSection = () => {
        setShowSection((prev) => !prev);
    }
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const isOpeningUpdateModal = (id, used_size, article_cost ) => {
        setValues({ 
            ...values,
            old_used_size: used_size,
            old_article_cost: article_cost,
             fabricId: id });
        setShowUpdateModal(!showUpdateModal);
    }

    const [values, setValues] = useState({
        used_size: "",
    })
    console.log(values, "values");
    const [updateFabricProject, setUpdateFabricProject] = useState(false);
    const [updateOneFabricProject] = useUpdateOneFabricProjectMutation(projectCard.id, auth.id, values.fabricId);
    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const urlParams = {
            memberId: auth.id,
            projectId: projectCard.id,
            fabricId: values.fabricId,
            body: values,
        };

        const { updatedFabricDataUsed } = await updateOneFabricProject(urlParams).unwrap();
       
        //  Mettre à jour le store
        if(updatedFabricDataUsed) {
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
        }
        
    };


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
                    {projectCard.fabric_array.map((fabric) => (
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
                        onChange={onChange}
                        values={values}
                        setValues={setValues}
                        handleSubmit={handleSubmit}
                    />
                </CardsContainer>
            )}
        </Section>
    )
} 

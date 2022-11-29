import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { DeviceSize } from "../../Navbar/Responsive";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
    useDeleteOneProjectMutation,
    useUpdateOneProjectMutation
} from "../../../store/api/ytremaApi";
import {
    updateProject,
    deleteProject
} from "../../../store/state/projectSlice";
import { useGetAllFabricsQuery } from "../../../store/api/ytremaApi";
import { addAllFabrics } from "../../../store/state/fabricSlice";
import {
    ArrowContainer,
    Container,
    ReturnArrow,
    TitleContainer,
    HeaderContainer,
    ProjectTitle,
    ArrowTitleContainer,
    ModifyDeleteContainer,
    TrashContainer,
    TrashButton,
    ModifyContainer,
    ModifyButton,
    StatusContainer,
    Status,
} from "./style";
import { DeleteModal } from "../../DeleteModal";
import { UpdateModal } from "./UpdateModal";
import { FabricProject } from "./FabricProject";
import { HaberdasheryProject } from "./HaberdasheryProject";
import { PatternProject } from "./PatternProject";
import { NoteProject } from "./NoteProject";
import { CostProject } from "./CostProject";

import { useUpdateOneFabricProjectMutation } from "../../../store/api/ytremaApi";
import { updateFabricProject } from "../../../store/state/projectSlice";

export const ProjectCard = () => {
    const { id } = useParams();
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { persistedReducer } = useSelector((state) => state);
    const auth = persistedReducer.auth;
    const isLogged = auth.isLogged;
    const activeSession = sessionStorage.getItem("token");
    const projects = persistedReducer.projects;

    // ACCESS ONE PROJECT
    const projectCard = projects.value.find((project) => project.id == id);

    const [deleteOneProject] = useDeleteOneProjectMutation(projectCard.id, auth.id);
    const [updateOneProject] = useUpdateOneProjectMutation(projectCard.id, auth.id);
    const [updateProjectInfo, setUpdateProjectInfo] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const isOpeningUpdateModal = () => {
        setShowUpdateModal(!showUpdateModal);
    }
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const isOpeningDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
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
// PROJECT

const { data, isSuccess } = useGetAllFabricsQuery(auth.id);
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

// FABRIC CARD
useEffect(() => {
    if (isSuccess && data) {
      dispatch(addAllFabrics(data.fabrics));
    }
  }, [data]);

const [fabricValues, setFabricValues] = useState({
    used_size: "",
    old_used_size: "",
    old_article_cost: "",
    fabricId: "",
});

const [updateOneFabricProject] = useUpdateOneFabricProjectMutation(projectCard.id, auth.id, fabricValues.fabricId);

const fabricOnChange = (event) => {
    setFabricValues({ ...fabricValues, [event.target.name]: event.target.value });
};

const handleFabricSubmit = async (event) => {
    event.preventDefault();

    const urlParams = {
        memberId: auth.id,
        projectId: projectCard.id,
        fabricId: fabricValues.fabricId,
        body: fabricValues,
    };

    const { updatedFabricDataUsed } = await updateOneFabricProject(urlParams).unwrap();

    //  Mettre à jour le store
    if(updatedFabricDataUsed) {
        dispatch(updateFabricProject(updatedFabricDataUsed));

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

const fabricArray = projectCard.fabric_array;
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
                                            onClick={isOpeningUpdateModal}
                                        />
                                    </ModifyContainer>
                                    <UpdateModal
                                        setShowUpdateModal={setShowUpdateModal}
                                        showUpdateModal={showUpdateModal}
                                        updateAction={updateCard}
                                        word={'MODIFIER CE PROJET'}
                                        onChange={onChange}
                                        values={values}
                                        setValues={setValues}
                                        handleSubmit={handleSubmit}
                                        projectCard={projectCard}
                                    />
                                    <TrashContainer>
                                        <TrashButton
                                            aria-label="Supprimer ce projet"
                                            onClick={isOpeningDeleteModal}
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
                        <FabricProject 
                            handleFabricSubmit={handleFabricSubmit}
                            fabricOnChange={fabricOnChange}
                            fabricValues={fabricValues}
                            setFabricValues={setFabricValues}
                            fabricArray={fabricArray}
                        />
                        <HaberdasheryProject />
                        <PatternProject />
                       <NoteProject/>
                       <CostProject />
                    </>
                )
                }
            </Container >
        </>
    )
} 

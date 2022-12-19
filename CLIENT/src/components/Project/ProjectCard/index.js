import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { DeviceSize } from "../../Navbar/Responsive";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { storage } from "../../../Firebase";
import YtremaLogo from "../../../assets/images/logo.png";
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
import { DeleteAllProject } from "../../DeleteModal/DeleteAllProject";
import { UpdateModal } from "./UpdateModal";
import { FabricProject } from "./FabricProject";
import { HaberdasheryProject } from "./HaberdasheryProject";
import { PatternProject } from "./PatternProject";
import { NoteProject } from "./NoteProject";
import { CostProject } from "./CostProject";
import {
    useDeleteOneProjectMutation,
    useUpdateOneProjectMutation,
    useUpdateOneFabricProjectMutation,
    useAddOneFabricProjectMutation,
    useUpdateOneHaberdasheryProjectMutation,
    useAddOneHaberdasheryProjectMutation,
    useAddOnePatternProjectMutation,
    useAddOnePhotoProjectMutation,
    useUpdateOnePhotoProjectMutation,
    useDeleteOnePhotoProjectMutation,
    useDeleteOneArticleProjectMutation,
    useGetOneProjectQuery,
    useGetAllProjectsQuery
} from "../../../store/api/ytremaApi";
import {
    updateProject,
    deleteProject,
    updateFabricProject,
    updateHaberdasheryProject,
    updatePatternProject,
    updatePhotoProject,
    deletePhotoProject,
    deleteArticleProject,
    addAllProjects
} from "../../../store/state/projectSlice";

export const ProjectCard = () => {

    const { id } = useParams();
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { persistedReducer } = useSelector((state) => state);
    const auth = persistedReducer.auth;
    const isLogged = auth.isLogged;
    const activeSession = sessionStorage.getItem("token");
    const projects = persistedReducer.projects;
    const { data, isSuccess } = useGetAllProjectsQuery(auth.id);
    useEffect(() => {
        if (isSuccess && data) {
            dispatch(addAllProjects(data.projects));
        }
    }, [data]);

    // ACCESS ONE PROJECT
    const projectCard = projects.value.find((project) => project.id == id);


    // UPDATE ONE PROJECT
    const [updateOneProject] = useUpdateOneProjectMutation(projectCard.id, auth.id);
    const [updateProjectInfo, setUpdateProjectInfo] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const isOpeningUpdateModal = () => {
        setShowUpdateModal(!showUpdateModal);
    }

    // DELETE ONE PROJECT
    const [deleteOneProject] = useDeleteOneProjectMutation(projectCard.id, auth.id);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteAll, setDeleteAll] = useState(false);
    const isOpeningDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    }

    const deleteCard = async() => {
        const urlParams = {
            memberId: auth.id,
            projectId: projectCard.id,
        };
        deleteOneProject(urlParams);
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

    // UPDATE FABRIC CARD
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
        if (updatedFabricDataUsed) {

            const projectUsed = updatedFabricDataUsed.find((project) => project.id == projectCard.id)

            dispatch(updateFabricProject(projectUsed));

            toast.success('Tissu modifié avec succès👌', {
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

    // ADD A NEW FABRIC TO PROJECT
    const [addFabricValues, setAddFabricValues] = useState({
        fabric_used_size: "",
        fabric_price: "",
        fabric_id: "",
    });

    const [addFabricProject] = useAddOneFabricProjectMutation(projectCard.id, auth.id, addFabricValues.fabric_id);

    const addFabricOnChange = (event) => {
        setAddFabricValues({ ...addFabricValues, [event.target.name]: event.target.value });
    };

    const handleAddFabricSubmit = async (event) => {
        event.preventDefault();

        const urlParams = {
            memberId: auth.id,
            projectId: projectCard.id,
            body: addFabricValues,
        };

        const { addFabric } = await addFabricProject(urlParams).unwrap();

        //  Mettre à jour le store
        if (addFabric) {

            const projectUsed = addFabric.find((project) => project.id == projectCard.id)
            dispatch(updateFabricProject(projectUsed));

            toast.success('Tissu ajouté avec succès👌', {
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

    // UPDATE HABERDASHERY CARD
    const [haberdasheryValues, setHaberdasheryValues] = useState({
        used_size: "",
        old_used_size: "",
        old_article_cost: "",
        haberdasheryId: "",
    });

    const [updateOneHaberdasheryProject] = useUpdateOneHaberdasheryProjectMutation(projectCard.id, auth.id, haberdasheryValues.haberdasheryId);

    const haberdasheryOnChange = (event) => {
        setHaberdasheryValues({ ...haberdasheryValues, [event.target.name]: event.target.value });
    };


    const handleHaberdasherySubmit = async (event) => {
        event.preventDefault();

        const urlParams = {
            memberId: auth.id,
            projectId: projectCard.id,
            haberdasheryId: haberdasheryValues.haberdasheryId,
            body: haberdasheryValues,
        };

        const { updatedHaberdasheryDataUsed } = await updateOneHaberdasheryProject(urlParams).unwrap();

        //  Mettre à jour le store
        if (updatedHaberdasheryDataUsed) {

            const projectUsed = updatedHaberdasheryDataUsed.find((project) => project.id == projectCard.id)

            dispatch(updateHaberdasheryProject(projectUsed));

            toast.success('Mercerie modifiée avec succès👌', {
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

    const haberdasheryArray = projectCard.haberdashery_array;

    // ADD A NEW HABERDASHERY TO PROJECT
    const [addHaberdasheryValues, setAddHaberdasheryValues] = useState({
        haberdashery_id: "",
        haberdashery_is_cut: "",
        haberdashery_is_a_set: "",
        haberdashery_article_qty: "",
        haberdashery_size: "",
        haberdashery_price: "",
        haberdashery_used_size: ""
    });

    const [addHaberdasheryProject] = useAddOneHaberdasheryProjectMutation(projectCard.id, auth.id, addHaberdasheryValues.haberdashery_id);

    const addHaberdasheryOnChange = (event) => {
        setAddHaberdasheryValues({ ...addHaberdasheryValues, [event.target.name]: event.target.value });
    };

    const handleAddHaberdasherySubmit = async (event) => {
        event.preventDefault();

        const urlParams = {
            memberId: auth.id,
            projectId: projectCard.id,
            body: addHaberdasheryValues,
        };

        const { addHaberdashery } = await addHaberdasheryProject(urlParams).unwrap();

        //  Mettre à jour le store
        if (addHaberdashery) {

            const projectUsed = addHaberdashery.find((project) => project.id == projectCard.id);
            dispatch(updateHaberdasheryProject(projectUsed));

            toast.success('Mercerie ajoutée avec succès👌', {
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

    // ADD A NEW PATTERN TO PROJECT
    const [addPatternValues, setAddPatternValues] = useState({
        pattern_id: "",
        pattern_price: "",
    });

    const [addPatternProject] = useAddOnePatternProjectMutation(projectCard.id, auth.id, addPatternValues.pattern_id);

    const addPatternOnChange = (event) => {
        setAddPatternValues({ ...addPatternValues, [event.target.name]: event.target.value });
    };

    const handleAddPatternSubmit = async (event) => {
        event.preventDefault();

        const urlParams = {
            memberId: auth.id,
            projectId: projectCard.id,
            body: addPatternValues,
        };

        const { addPattern } = await addPatternProject(urlParams).unwrap();

        //  Mettre à jour le store
        if (addPattern) {

            const projectUsed = addPattern.find((project) => project.id == projectCard.id)
            dispatch(updatePatternProject(projectUsed));

            toast.success('Patron ajouté avec succès👌', {
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
    const patternArray = projectCard.pattern_array;



    // ADD A NEW NOTE TO PROJECT
    const [addNoteValues, setAddNoteValues] = useState({
        personal_notes: "",
        photo: "",
    });
    const photosArrayId = projectCard.photos_array.map((photoId) => photoId.id);

    //PICTURE
    const [pictureURL, setPictureURL] = useState();
    const [selectedPicture, setSelectedPicture] = useState();
    const [preview, setPreview] = useState();


    useEffect(() => {
        if (!selectedPicture) {
            setPreview(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedPicture);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedPicture]);

    //propre a firebase
    const handleUpload = (picture) => {

        const uploadTask = storage.ref(`projet/${picture.name}`).put(picture);
        uploadTask.on(
            "state_changed",
            (snapshot) => { },
            (error) => {
                console.log(error);
            },
            () => {
                storage
                    .ref("projet")
                    .child(picture.name)
                    .getDownloadURL()
                    .then((url) => {
                        setPictureURL(url);
                        setPreview(url);
                    });
            }
        );
    };
    const onSelectPicture = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedPicture(undefined);
            return
        }
        // I've kept this example simple by using the first image instead of multiple
        setSelectedPicture(event.target.files[0]);
    }


    const [addPhotoProject] = useAddOnePhotoProjectMutation(projectCard.id, auth.id, photosArrayId);

    const addNoteOnChange = (event) => {
        setAddNoteValues({ ...addNoteValues, [event.target.name]: event.target.value });
        if (event.target.name === 'photo') {

            onSelectPicture(event);
            if (!event.target.files || event.target.files.length > 0) {
                handleUpload(event.target.files[0]);
            }
        }
    };

    const handleAddNoteSubmit = async (event) => {
        event.preventDefault();
        const valuesToSend = addNoteValues;
        valuesToSend.photo = pictureURL;
        const urlParams = {
            memberId: auth.id,
            projectId: projectCard.id,
            body: valuesToSend,
        };

        const { savedPhoto } = await addPhotoProject(urlParams).unwrap();

        //  Mettre à jour le store
        if (savedPhoto) {
            // dispatch(updateNoteProject(savedPhoto.project_id));

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
        setPreview(YtremaLogo);

    };

    // UPDATE NOTE CARD
    const [noteValues, setNoteValues] = useState({
        id: "",
        photo: "",
        personal_notes: ""
    });

    const [updateOnePhotoProject] = useUpdateOnePhotoProjectMutation(projectCard.id, auth.id, haberdasheryValues.haberdasheryId);

    const noteOnChange = (event) => {
        setNoteValues({ ...noteValues, [event.target.name]: event.target.value });
        if (event.target.name === 'photo') {
            onSelectPicture(event);
            if (!event.target.files || event.target.files.length > 0) {
                handleUpload(event.target.files[0]);
            }
        }
    };


    const handleNoteSubmit = async (event) => {
        event.preventDefault();
        const valuesToSend = noteValues;
        valuesToSend.photo = pictureURL;
        const urlParams = {
            memberId: auth.id,
            projectId: projectCard.id,
            photoId: valuesToSend.id,
            body: valuesToSend,
        };

        const { updatedPhotoData } = await updateOnePhotoProject(urlParams).unwrap();

        //  Mettre à jour le store
        if (updatedPhotoData) {
            dispatch(updateHaberdasheryProject(projectCard.id));

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
    //DELETE ONE NOTE
    const [deleteOnePhotoProject] = useDeleteOnePhotoProjectMutation(projectCard.id, auth.id, noteValues.id);
    const deletePhotoProject = () => {
        const urlParams = {
            memberId: auth.id,
            photoId: noteValues.id,
            projectId: projectCard.id,
        };
        deleteOnePhotoProject(urlParams);
        dispatch(updateFabricProject())
        navigate(`${"/projets/"}${projectCard.id}`);
        toast.success('Note supprimée avec succès👌', {
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

    //DELETE ONE ARTICLE

    const [entityValues, setEntityValues] = useState({
        entity: "",
        entityId: "",
    })

    const [deleteOneArticleProject] = useDeleteOneArticleProjectMutation(projectCard.id, auth.id, entityValues.entity, entityValues.entityId);
    const deleteArticleProject = () => {
        
        const urlParams = {
            memberId: auth.id,
            projectId: projectCard.id,
            entity: entityValues.entity,
            entityId: entityValues.entityId,

        };
        deleteOneArticleProject(urlParams);
        navigate(`${"/projets/"}${projectCard.id}`);
        toast.success('Article supprimé avec succès👌', {
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

    //DELETE AND RESTORE ARTICLES
    const deleteRestoreArticleProject= async () => {
        await fabricArray.map((item) => {
             const urlParams = {
                memberId: auth.id,
                projectId: projectCard.id,
                entity: "fabric",
                entityId: item.id
            }
            
           deleteOneArticleProject(urlParams);
           
    } );
    await haberdasheryArray.map((item) => {
        const urlParams = {
           memberId: auth.id,
           projectId: projectCard.id,
           entity: "haberdashery",
           entityId: item.id
       }

       deleteOneArticleProject(urlParams);
      
} );

};


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
                                    <DeleteAllProject
                                        setShowDeleteModal={setShowDeleteModal}
                                        showDeleteModal={showDeleteModal}
                                        deleteAction={deleteCard}
                                        restoreAction={deleteRestoreArticleProject}
                                        word={'SUPPRIMER CE PROJET'}
                                        setDeleteAll={setDeleteAll}
                                        deleteAll={deleteAll}
                                        projectCard={projectCard}
                                        setEntityValues={setEntityValues}
                                        entityValues={entityValues}
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
                            handleAddFabricSubmit={handleAddFabricSubmit}
                            addFabricOnChange={addFabricOnChange}
                            addFabricValues={addFabricValues}
                            setAddFabricValues={setAddFabricValues}
                            setEntityValues={setEntityValues}
                            entityValues={entityValues}
                            deleteAction={deleteArticleProject}
                            projectCard={projectCard}
                        />
                        <HaberdasheryProject
                            handleHaberdasherySubmit={handleHaberdasherySubmit}
                            haberdasheryOnChange={haberdasheryOnChange}
                            haberdasheryValues={haberdasheryValues}
                            setHaberdasheryValues={setHaberdasheryValues}
                            haberdasheryArray={haberdasheryArray}
                            handleAddHaberdasherySubmit={handleAddHaberdasherySubmit}
                            addHaberdasheryOnChange={addHaberdasheryOnChange}
                            addHaberdasheryValues={addHaberdasheryValues}
                            setAddHaberdasheryValues={setAddHaberdasheryValues}
                            setEntityValues={setEntityValues}
                            entityValues={entityValues}
                            deleteAction={deleteArticleProject}
                        />
                        <PatternProject
                            patternArray={patternArray}
                            handleAddPatternSubmit={handleAddPatternSubmit}
                            addPatternOnChange={addPatternOnChange}
                            addPatternValues={addPatternValues}
                            setAddPatternValues={setAddPatternValues}
                            setEntityValues={setEntityValues}
                            entityValues={entityValues}
                            deleteAction={deleteArticleProject}
                        />
                        <NoteProject
                            handleAddNoteSubmit={handleAddNoteSubmit}
                            addNoteOnChange={addNoteOnChange}
                            addNoteValues={addNoteValues}
                            setAddNoteValues={setAddNoteValues}
                            pictureURL={pictureURL}
                            setPictureURL={setPictureURL}
                            preview={preview}
                            setPreview={setPreview}
                            handleNoteSubmit={handleNoteSubmit}
                            noteOnChange={noteOnChange}
                            noteValues={noteValues}
                            setNoteValues={setNoteValues}
                            photosArrayId={photosArrayId}
                            deleteAction={deletePhotoProject}

                        />
                        <CostProject />
                    </>
                )
                }
            </Container >
        </>
    )
} 

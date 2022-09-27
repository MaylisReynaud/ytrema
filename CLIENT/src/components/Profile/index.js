import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { storage } from "../../../src/Firebase";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { DeviceSize } from "../../components/Navbar/Responsive";

import { fabricsDefaultState } from "../../store/state/fabricSlice";
import { haberdasheriesDefaultState } from "../../store/state/haberdasherySlice";
import { patternsDefaultState } from "../../store/state/patternSlice";
import { defaultState } from "../../store/state/authSlice";

import {
    useDeleteAllFabricsMutation,
    useUpdateOneUserMutation,
    useDeleteAllHaberdasheriesMutation,
    useDeleteAllPatternsMutation,
    useDeleteOneUserMutation
} from '../../store/api/ytremaApi';
import {
    setUser,
    deleteUser,
} from "../../../src/store/state/authSlice";
import { DeleteModal } from "../DeleteModal";

import {
    Container,
    Title,
    Subsection,
    SubsectionTitle,
    ModifyContainer,
    ModifyButton,
} from "./style";

export const Profile = (props, index) => {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { persistedReducer } = useSelector((state) => state);
    const auth = persistedReducer.auth;

    const [deleteAllFabrics] = useDeleteAllFabricsMutation(auth.id);
    const [deleteAllHaberdasheries] = useDeleteAllHaberdasheriesMutation(auth.id);
    const [deleteAllPatterns] = useDeleteAllPatternsMutation(auth.id);
    const [deleteOneUser] = useDeleteOneUserMutation(auth.id);


    // DELETE FUNCTIONS
    const deleteAllFabricsStore = () => {
        deleteAllFabrics(`${auth.id}`);
        dispatch(fabricsDefaultState("initialState"));
        navigate("/tissus");
    };

    const deleteAllHaberdasheriesStore = () => {
        deleteAllHaberdasheries(`${auth.id}`);
        dispatch(haberdasheriesDefaultState("initialState"));
        navigate("/mercerie");
    };

    const deleteAllPatternsStore = () => {
        deleteAllPatterns(`${auth.id}`);
        dispatch(patternsDefaultState("initialState"));
        navigate("/patrons");
    };

    const deleteOneUserStore = () => {
        deleteOneUser(`${auth.id}`);
        dispatch(defaultState("initialState"));
        navigate("/inscription");
    };

    // DELETE MODAL
    const [showDeleteModalAllFabrics, setShowDeleteModalAllFabrics] =
        useState(false);
    const [
        showDeleteModalAllHaberdasheries,
        setShowDeleteModalAllHaberdasheries,
    ] = useState(false);
    const [showDeleteModalAllPatterns, setShowDeleteModalAllPatterns] =
        useState(false);
    const [showDeleteModalAllProjects, setShowDeleteModalAllProjects] =
        useState(false);
    const [showDeleteModalProfil, setShowDeleteModalProfil] = useState(false);

    const isOpenDeleteModalAll = (modal) => {

        modal == "fabrics" &&
            setShowDeleteModalAllFabrics(!showDeleteModalAllFabrics);

        modal == "haberdasheries" &&
            setShowDeleteModalAllHaberdasheries(!showDeleteModalAllHaberdasheries);

        modal == "patterns" &&
            setShowDeleteModalAllPatterns(!showDeleteModalAllPatterns);

        modal == "profil" &&
            setShowDeleteModalProfil(!showDeleteModalProfil);
    };

    //UPDATE USER INFO
    const [updateOneUser] = useUpdateOneUserMutation(auth.id);
    //to open /close update section
    const [updateUserInfo, setUpdateUserInfo] = useState(false);
    const [values, setValues] = useState({
        pseudo: auth.pseudo,
        email: auth.email,
        chest_measurement: auth.chest_measurement,
        waist_measurement: auth.waist_measurement,
        hip_measurement: auth.hip_measurement,
        avatar: auth.avatar
    });

    const [selectedAvatar, setSelectedAvatar] = useState();
    const [preview, setPreview] = useState();
    const [avatarURL, setAvatarURL] = useState();

    useEffect(() => {
        if (!selectedAvatar) {
            setPreview(auth.avatar);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedAvatar);
        setPreview(objectUrl);
        // free memory every time this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedAvatar]);

    const onSelectAvatar = async (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedAvatar(undefined);
            return;
        };
        setSelectedAvatar(event.target.files[0]);
    };

    //specific to firebase
    const handleUpload = (avatar) => {
        console.log('coucou au debut handleupload');
        const uploadTask = storage.ref(`images/${avatar.name}`).put(avatar);
        console.log('coucou apres storage debut handleupload');
        uploadTask.on(
            "state_changed",
            (snapshot) => { },
            (error) => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(avatar.name)
                    .getDownloadURL()
                    .then((url) => {
                        console.log(url, "URL FIREBASE");
                        setAvatarURL(url);
                    });
            }
        );
    };

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });

        if (event.target.name === "avatar") {

            onSelectAvatar(event, "avatar");

            if (!event.target.files || event.target.files.length > 0) {
                handleUpload(event.target.files[0], "avatar");
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const valuesToSend = values;

        if (avatarURL !== undefined) {
            valuesToSend.avatar = avatarURL;
        };
        //if email / pseudo is already use in database, don't send it to server
        valuesToSend.email == auth.email && delete valuesToSend.email;
        valuesToSend.pseudo == auth.pseudo && delete valuesToSend.pseudo;

        // Send data to server
        const urlParams = {
            memberId: auth.id,
            body: valuesToSend,
        };
        const { updateMemberProfil } = await updateOneUser(urlParams).unwrap();

        //  Update the store
        dispatch(setUser(updateMemberProfil));
        setUpdateUserInfo(false);
        toast.success('Données de profil modifiées avec succès👌', {
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
    const updateProfile = () => {
        setUpdateUserInfo(true);
    };






    return (
        <>
            {isMobile && (
                <>
                    <Title>MON COMPTE</Title>
                    <Container>
                        <div className="InfoCompte">
                            <Subsection>
                                <SubsectionTitle>
                                    Information du compte
                                </SubsectionTitle>
                                <ModifyContainer>
                                    <ModifyButton
                                        aria-label="Modifier les données du membre"
                                        onClick={updateProfile}
                                    />
                                </ModifyContainer>
                            </Subsection>
                            {!updateUserInfo ? (
                                <>
                                    <div>
                                        <img src={auth.avatar}></img>
                                    </div>
                                    <div>
                                        <div>
                                            <span>Pseudo</span> <span>{auth.pseudo} </span>
                                        </div>
                                        <div>
                                            <span>E-mail</span> <span>{auth.email} </span>
                                        </div>
                                        <div>
                                            <span>Tour de poitrine</span> <span>{auth.chest_measurement} </span>
                                        </div>
                                        <div>
                                            <span>Tour de taille</span> <span>{auth.waist_measurement} </span>
                                        </div>
                                        <div>
                                            <span>Tour de hanches</span> <span>{auth.hip_measurement} </span>
                                        </div>
                                    </div>
                                </>
                            ) :
                                (
                                    <>
                                        <div>
                                            <img src={preview} alt="member's avatar preview"></img>
                                        </div>
                                        <div>
                                            <input
                                                name="avatar"
                                                accept="image/*"
                                                placeholder="avatar du membre"
                                                required=""
                                                type="file"
                                                onChange={onChange}
                                            ></input>
                                        </div>
                                        <form
                                            onSubmit={handleSubmit}
                                        >
                                            <div
                                                key={auth.id}
                                            >
                                                <label>Pseudo</label> <input
                                                    placeholder={auth.pseudo}
                                                    onChange={onChange}
                                                    name={'pseudo'}
                                                >
                                                </input>
                                            </div>
                                            <div>
                                                <label>E-mail</label> <input
                                                    placeholder={auth.email}
                                                    onChange={onChange}
                                                    name={'email'}
                                                >
                                                </input>
                                            </div>
                                            <div>
                                                <label>Tour de poitrine</label> <input
                                                    placeholder={auth.chest_measurement}
                                                    onChange={onChange}
                                                    name={'chest_measurement'}
                                                >
                                                </input>
                                            </div>
                                            <div>
                                                <label>Tour de taille</label>
                                                <input
                                                    placeholder={auth.waist_measurement}
                                                    onChange={onChange}
                                                    name={'waist_measurement'}
                                                >
                                                </input>
                                            </div>
                                            <div>
                                                <label>Tour de hanches</label>
                                                <input
                                                    placeholder={auth.hip_measurement}
                                                    onChange={onChange}
                                                    name={'hip_measurement'}
                                                >
                                                </input>
                                            </div>
                                            <button
                                                onClick={updateProfile}
                                            >
                                                Enregistrer</button>
                                        </form>
                                    </>
                                )
                            }

                        </div>
                        {/* deuxième section */}
                        <div className="Suppression">
                            <SubsectionTitle>Supprimer mes données</SubsectionTitle>

                            {/* SUPPRESSION FABRIC */}
                            <div className="supprFabric">
                                <p>Supprimer l’ensemble de mes tissus dans ma tissuthèque</p>
                                <button onClick={() => isOpenDeleteModalAll("fabrics")}>
                                    Supprimer
                                </button>
                                <DeleteModal
                                    setShowDeleteModal={setShowDeleteModalAllFabrics}
                                    showDeleteModal={showDeleteModalAllFabrics}
                                    deleteAction={deleteAllFabricsStore}
                                    word={"SUPPRIMER MA TISSUTHEQUE"}
                                />
                            </div>

                            {/* SUPPRESSION HABERDASHERY */}
                            <div className="supprHaberdashery">
                                <p>
                                    Supprimer l’ensemble de ma mercerie dans ma merceriethèque
                                </p>
                                <button onClick={() => isOpenDeleteModalAll("haberdasheries")}>
                                    Supprimer
                                </button>
                                <DeleteModal
                                    setShowDeleteModal={setShowDeleteModalAllHaberdasheries}
                                    showDeleteModal={showDeleteModalAllHaberdasheries}
                                    deleteAction={deleteAllHaberdasheriesStore}
                                    word={"SUPPRIMER MA MERCERIETHEQUE"}
                                />
                            </div>

                            {/* SUPPRESSION PATTERN */}
                            <div className="supprPattern">
                                <p>Supprimer l’ensemble de mes patrons dans ma patronthèque</p>
                                <button onClick={() => isOpenDeleteModalAll("patterns")}>Supprimer</button>
                                <DeleteModal
                                    setShowDeleteModal={setShowDeleteModalAllPatterns}
                                    showDeleteModal={showDeleteModalAllPatterns}
                                    deleteAction={deleteAllPatternsStore}
                                    word={"SUPPRIMER MA PATRONTHEQUE"}
                                />
                            </div>

                            {/* SUPPRESSION PROJECT */}
                            <div className="supprProject">
                                <p>Supprimer l’ensemble de mes projets</p>
                                <button>Supprimer</button>
                            </div>

                            {/* SUPPRESSION PROFILE */}
                            <div className="supprProfil">
                                <p>Supprimer mon profil</p>
                                <button onClick={() => isOpenDeleteModalAll("profil")}>Supprimer</button>
                                <DeleteModal
                                    setShowDeleteModal={setShowDeleteModalProfil}
                                    showDeleteModal={showDeleteModalProfil}
                                    deleteAction={deleteOneUserStore}
                                    word={"SUPPRIMER MON PROFIL"}
                                />
                            </div>
                        </div>
                    </Container>
                </>
            )}
        </>
    );
};

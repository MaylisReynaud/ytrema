import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { storage } from "../../../src/Firebase";
import { useSelector, useDispatch } from "react-redux";
import { DeviceSize } from "../../components/Navbar/Responsive";
import { fabricsDefaultState } from "../../store/state/fabricSlice";
import {
    useDeleteAllFabricsMutation,
    useUpdateOneUserMutation,
    useDeleteOneUserMutation
} from '../../store/api/ytremaApi';
import {
    updateUser,
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
    const deleteAllFabricsStore = () => {
        deleteAllFabrics(`${auth.id}`);
        dispatch(fabricsDefaultState('initialState'));
        navigate("/tissus");
        console.log('coucou')
    };
    // DELETE MODAL
    const [showDeleteModalAll, setShowDeleteModalAll] = useState(false);
    const isOpenDeleteModalAll = () => {
        setShowDeleteModalAll(!showDeleteModalAll);
    };

    //UPDATE USER INFO
    const [updateOneUser] = useUpdateOneUserMutation(auth.id);
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
                        console.log('coucou dans Firebase');
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
    const updateUser = () => {
        setUpdateUserInfo(true);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const valuesToSend = values;
        if (avatarURL !== undefined) {
            valuesToSend.avatar = avatarURL;
        };

        const urlParams = {
            userId: auth.id,
            body: valuesToSend,
          };

        const { updatedUserData } = await updateOneUser(urlParams).unwrap();
        //  Update the store
        dispatch(updateUser(updatedUserData));
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
                                        onClick={updateUser}
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
                                            <span>Tour de poitrine</span> <span>{auth.waist_measurement} </span>
                                        </div>
                                        <div>
                                            <span>Tour de taille</span> <span>{auth.chest_measurement} </span>
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
                                                    placeholder={auth.waist_measurement}
                                                    onChange={onChange}
                                                    name={'tour de poitrine'}
                                                >
                                                </input>
                                            </div>
                                            <div>
                                                <label>Tour de taille</label> 
                                                <input
                                                    placeholder={auth.waist_measurement}
                                                    onChange={onChange}
                                                    name={'tour de taille'}
                                                >
                                                </input>
                                            </div>
                                            <div>
                                                <label>Tour de hanches</label> 
                                                <input
                                                    placeholder={auth.hip_measurement}
                                                    onChange={onChange}
                                                    name={'tour de hanches'}
                                                >
                                                </input>
                                            </div>
                                            <button>Enregistrer</button>
                                        </form>
                                    </>
                                )
                            }

                        </div>
                        {/* deuxième section */}
                        <div className="Suppression">
                            <SubsectionTitle>
                                Supprimer mes données
                            </SubsectionTitle>
                            <div className="supprFabric">
                                <p>
                                    Supprimer l’ensemble de mes tissus dans ma tissuthèque
                                </p><button
                                    onClick={isOpenDeleteModalAll}>Supprimer</button>
                                <DeleteModal
                                    setShowDeleteModal={setShowDeleteModalAll}
                                    showDeleteModal={showDeleteModalAll}
                                    deleteAction={deleteAllFabricsStore}
                                    word={' MA TISSUTHEQUE'}
                                />
                            </div>
                            <div className="supprHaberdashery">
                                <p>
                                    Supprimer l’ensemble de ma mercerie dans ma merceriethèque
                                </p><button>Supprimer</button>
                            </div>
                            <div className="supprPattern">
                                <p>
                                    Supprimer l’ensemble de mes patrons dans ma patronthèque
                                </p><button>Supprimer</button>
                            </div>
                            <div className="supprProject">
                                <p>
                                    Supprimer l’ensemble de mes projets
                                </p><button>Supprimer</button>
                            </div>
                            <div className="supprProfil">
                                <p>
                                    Supprimer mon profil
                                </p><button>Supprimer</button>
                            </div>
                        </div>
                    </Container>
                </>
            )}
        </>

    );
}
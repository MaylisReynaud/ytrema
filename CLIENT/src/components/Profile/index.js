import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";
import { DeviceSize } from "../../components/Navbar/Responsive";
import { fabricsDefaultState } from "../../store/state/fabricSlice";
import { useDeleteAllFabricsMutation } from '../../store/api/ytremaApi';
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
        // deleteAllFabrics(`${auth.id}`);
        // dispatch(fabricsDefaultState('initialState'));
        // navigate("/tissus");
        console.log('coucou')
    };
    // DELETE MODAL
    const [showDeleteModalAll, setShowDeleteModalAll] = useState(false);
    const isOpenDeleteModalAll = () => {
        setShowDeleteModalAll(!showDeleteModalAll);
    }
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
                                    <ModifyButton />
                                </ModifyContainer>
                            </Subsection>
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
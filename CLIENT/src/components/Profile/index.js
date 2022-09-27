import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";
import { DeviceSize } from "../../components/Navbar/Responsive";

import { fabricsDefaultState } from "../../store/state/fabricSlice";
import { haberdasheriesDefaultState } from "../../store/state/haberdasherySlice";
import { patternsDefaultState } from "../../store/state/patternSlice";
import { defaultState } from "../../store/state/authSlice";

import { useDeleteAllFabricsMutation } from "../../store/api/ytremaApi";
import { useDeleteAllHaberdasheriesMutation } from "../../store/api/ytremaApi";
import { useDeleteAllPatternsMutation } from "../../store/api/ytremaApi";
import { useDeleteOneUserMutation } from "../../store/api/ytremaApi";
import { DeleteFabricModal } from "../DeleteModal";
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
  return (
    <>
      {isMobile && (
        <>
          <Title>MON COMPTE</Title>
          <Container>
            <div className="InfoCompte">
              <Subsection>
                <SubsectionTitle>Information du compte</SubsectionTitle>
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
                  <span>Tour de poitrine</span>{" "}
                  <span>{auth.waist_measurement} </span>
                </div>
                <div>
                  <span>Tour de taille</span>{" "}
                  <span>{auth.chest_measurement} </span>
                </div>
                <div>
                  <span>Tour de hanches</span>{" "}
                  <span>{auth.hip_measurement} </span>
                </div>
              </div>
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
                <DeleteFabricModal
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
                <DeleteFabricModal
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
                <DeleteFabricModal
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
                <DeleteFabricModal
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

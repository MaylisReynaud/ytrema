import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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

export const ProjectCard = () => {
    const { id } = useParams();
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { persistedReducer } = useSelector((state) => state);
    const auth = persistedReducer.auth;
    const projects = persistedReducer.projects;
    const projectCard = projects.value.find((project) => project.id == id);
    const [deleteOneProject] = useDeleteOneProjectMutation(projectCard.id, auth.id);
    const [updateOneProject] = useUpdateOneProjectMutation(projectCard.id, auth.id);
    const [updateProjectInfo, setUpdateProjectInfo] = useState(false);

    return (
        <>  
            {/* cs site sezane */}
            <div className="container">
                <div className="title container">
                    <div className="returnArrow">
                        <img></img>
                    </div>
                    <h1 className="ProjectName">
                       {projectCard.name}
                    </h1>
                </div>
                <div className="ProjectNavbarContainer">
                    <nav className="ItemList">
                        <ul className="Menubar">
                            <li className="MenuItem">
                                <a>
                                  Tissus  
                                </a>
                            </li>
                            <li className="MenuItem">
                                <a>
                                  Mercerie  
                                </a>
                            </li>
                            <li className="MenuItem">
                                <a>
                                  Patrons  
                                </a>
                            </li>
                            <li className="MenuItem">
                                <a>
                                  Notes   
                                </a>
                            </li>
                            <li className="MenuItem">
                                <a>
                                  Coût                 
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="CardContainer">
                    <div className="Card">
                        <div className="ModifyDeleteContainer">
                            <div className="ModifyContainer">
                                <img></img>
                            </div>
                            <div className="DeleteContainer">
                                <img></img>
                            </div>
                        </div>
                        <div className="ImgContainer">
                            <img 
                                className="ItemPicture" 
                                src={projectCard.photos_array[0].photo}
                                alt={projectCard.name}
                             />
                        </div>
                        <div className="ItemTextInfo">
                            <h3>Nom du tissu - Type de Tissu - Quantité</h3>
                        </div>

                    </div>


                </div>
            </div>
        </>
    )
} 
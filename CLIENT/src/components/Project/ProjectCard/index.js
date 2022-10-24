import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { projectCardLinks } from "../../../utils/projectCardLinks";
import { Link, animateScroll as scroll } from 'react-scroll';
import { ArrowContainer, 
        Container, 
        ReturnArrow, 
        TitleContainer, 
        HeaderContainer,
        ProjectTitle,
     } from "./style";

export const ProjectCard = () => {
    const { id } = useParams();
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { persistedReducer } = useSelector((state) => state);
    const auth = persistedReducer.auth;
    const isLogged = auth.isLogged;
    const activeSession = sessionStorage.getItem("token");
    const projects = persistedReducer.projects;
    const projectCard = projects.value.find((project) => project.id == id);
    const [deleteOneProject] = useDeleteOneProjectMutation(projectCard.id, auth.id);
    const [updateOneProject] = useUpdateOneProjectMutation(projectCard.id, auth.id);
    const [updateProjectInfo, setUpdateProjectInfo] = useState(false);

    return (
        <>

            {/* cs site sezane */}
        <Container className="container">
                {isLogged === true && activeSession && (
                    <>
                        <HeaderContainer className="title container">
                            <ArrowContainer className="returnArrow">
                                <ReturnArrow/>
                            </ArrowContainer>
                            <HeaderContainer>
                            <ProjectTitle className="ProjectName">
                                {projectCard.name}
                            </ProjectTitle>
                            </HeaderContainer>
                            
                        </HeaderContainer>
                        <div className="ProjectNavbarContainer">
                            <nav className="ItemList">
                                <ul className="Menubar">
                                    {projectCardLinks.map((projectLink) => {
                                        return (
                                            <li
                                                key={projectLink.id}
                                            >
                                                <Link
                                                    to={projectLink.section}
                                                    spy={true}
                                                    smooth={true}
                                                    duration={500}
                                                    activeClass="active"
                                                >
                                                    {projectLink.name}
                                                </Link>
                                            </li>
                                        )

                                    })}
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

                                <section
                                    id="tissus"
                                >
                                    {console.log(projectCard.fabric_array.length, "<--projectCard.fabric_array")}
                                    {projectCard.fabric_array.length > 2 ? (
                                        <>
                                            {projectCard.fabric_array.map((fabricCard) => {
                                                <>
                                                    {console.log(fabricCard.photo, "<--fabricCard length sup à 2")}
                                                    <div className="ImgContainer">
                                                        <img
                                                            className="ItemPicture"
                                                            src={fabricCard.photo}
                                                            alt={fabricCard.name}
                                                        />
                                                    </div>
                                                    <div className="ItemTextInfo">
                                                        <h3>{fabricCard.name} - {fabricCard.fabric} - {fabricCard.used_size}</h3>
                                                    </div>
                                                </>
                                            })
                                            }
                                        </>
                                    ) :
                                        (
                                            <>
                                                {console.log(projectCard.fabric_array[0].photo, "<--projectCard.fabric_array[0].photo")}
                                                <div className="ImgContainer">
                                                    <img
                                                        className="ItemPicture"
                                                        src={projectCard.fabric_array[0].photo}
                                                        alt={projectCard.fabric_array[0].name}
                                                    />
                                                </div>
                                                <div className="ItemTextInfo">
                                                    <h3>{projectCard.fabric_array[0].name} - {projectCard.fabric_array[0].fabric} - {projectCard.fabric_array[0].used_size}</h3>
                                                </div>
                                            </>
                                        )}
                            </section>
                        </div>
                    </div>
                    </>
                )}
        </Container>
        </>
    )
} 
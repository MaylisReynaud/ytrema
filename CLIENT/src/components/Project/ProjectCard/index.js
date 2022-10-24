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
import {
    ArrowContainer,
    Container,
    ReturnArrow,
    TitleContainer,
    HeaderContainer,
    ProjectTitle,
    ProjectLinksContainer,
    LinksWrapper,
    LinkItem,
    LinkStyle,
    NavProject,
    ActiveLinkStyle,
    ProjectMenuLinks,
    ArrowTitleContainer
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
                        <HeaderContainer>
                            <ArrowTitleContainer className="title container">
                                <ArrowContainer className="returnArrow">
                                    <ReturnArrow />
                                </ArrowContainer>
                                <HeaderContainer>
                                    <ProjectTitle
                                        className="ProjectName">
                                        {projectCard.name}
                                    </ProjectTitle>
                                </HeaderContainer>
                            </ArrowTitleContainer>
                            <NavProject>
                                <ProjectLinksContainer className="ItemList">
                                    <LinksWrapper className="Menubar">
                                        {projectCardLinks.map((projectLink) => {
                                            return (
                                                <LinkItem
                                                    key={projectLink.id}
                                                >
                                                    <ProjectMenuLinks
                                                        to={projectLink.id}
                                                        spy={true}
                                                        smooth={true}
                                                        duration={500}
                                                        exact="true"
                                                    >
                                                        {projectLink.name}
                                                    </ProjectMenuLinks>
                                                </LinkItem>
                                            )
                                        })}
                                    </LinksWrapper>
                                </ProjectLinksContainer>
                            </NavProject>
                        </HeaderContainer>
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
                                <div
                                    id='tissus'
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
                                </div>
                                <div
                                    id='mercerie'
                                >
                                    {projectCard.haberdashery_array.length > 2 ? (
                                        <>
                                            {projectCard.haberdashery_array.map((haberdasheryCard) => {
                                                <>
                                                    {console.log(haberdasheryCard.photo, "<--fabricCard length sup à 2")}
                                                    <div className="ImgContainer">
                                                        <img
                                                            className="ItemPicture"
                                                            src={haberdasheryCard.photo}
                                                            alt={haberdasheryCard.name}
                                                        />
                                                    </div>
                                                    <div className="ItemTextInfo">
                                                        <h3>{haberdasheryCard.name} - {haberdasheryCard.haberdashery} - {haberdasheryCard.used_size}</h3>
                                                    </div>
                                                </>
                                            })
                                            }
                                        </>
                                    ) :
                                        (
                                            projectCard.haberdashery_array.length == 1 ?
                                                (
                                                    <>
                                                        <div className="ImgContainer">
                                                            <img
                                                                className="ItemPicture"
                                                                src={projectCard.fabric_array[0].photo}
                                                                alt={projectCard.fabric_array[0].name}
                                                            />
                                                        </div>
                                                        <div className="ItemTextInfo">
                                                            <h3>{projectCard.haberdashery_array[0].name} - {projectCard.haberdashery_array[0].haberdashery} - {projectCard.haberdashery_array[0].used_size}</h3>
                                                        </div>
                                                    </>
                                                ) :
                                                null
                                        )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Container>
        </>
    )
} 
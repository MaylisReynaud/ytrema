import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { DeviceSize } from "../../components/Navbar/Responsive";
import { addAllProjects } from "../../store/state/projectSlice";
import { useGetAllProjectsQuery } from "../../store/api/ytremaApi";
import {
    Container,
    Title,
    TitleContainer,
    ButtonContainer,
    EraseFiltersSelectionButton,
    TopContainer,
    RegisterArticleButton,
    Button,
    buttonVariants,
    FilterSpan,
    LeftContainer,
    CardsContainer,
    CardContainer,
    CardImg,
    CardText,
    DesktopContainer,
    FilterContainer,
    FilterTitle,
    MinusIcon,
    PlusIcon,
    ImgContainer,
    CardsMapContainer,
    ErrorText,
    ErrorButton,
    EmptyCardContainer,
    NoResults,
    NoResultsText,
    NoArticle,
    ArrowCurve,
    IconsContainer,
    NoResultsContainer,
    DesktopArrowCurve,
    ErrorContainer,
    LoginIcon
} from "../ArticlesPage/style";
import { FilterAlt } from "@styled-icons/boxicons-solid";
import YtremaLogo from "../../assets/images/logo.png";
import { AddProject } from "./AddProject";
import { FilterChoices } from "./FilterChoices";
import { ProjectFiltersCards } from "../../utils/projectFlexFilter";
import { filterProject } from "../../utils/filterProject";


export const Project = (props, index) => {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
    let navigate = useNavigate();
    const dispatch = useDispatch();

    //read info from store
    const { persistedReducer } = useSelector((state) => state);
    const auth = persistedReducer.auth;
    const projects = persistedReducer.projects;
    const fabrics = persistedReducer.fabrics;
    const haberdasheries = persistedReducer.haberdasheries;
    const patterns = persistedReducer.patterns;
    const isLogged = auth.isLogged;
    const { data, error, isLoading, isSuccess, isError } = useGetAllProjectsQuery(auth.id);

    //Set a filter array
    let fabricsFilter = [];
    let fabricDesignersFilter = [];
    let fabricColorsFilter = [];
    let patternBrandsFilter = [];
    let patternClothingsFilter = [];
    let patternGendersFilter = [];
    let statusFilter = [];


    // state
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [filterByCategory, setFilterByCategory] = useState([]);
    const [chosenFilter, setChosenFilter] = useState(false);
    const [showAllDesktopFilters, setShowAllDesktopFilters] = useState(true);

    if (chosenFilter) {
        setChosenFilter(false);
    }

    useEffect(() => {
        if (isSuccess && data) {
            console.log(data.projects, 'data.projects dans use effect');
            dispatch(addAllProjects(data.projects));
            console.log('coucou')
        }
    }, [data, projects]);

    const mapFilteredCards = (filteredCategory) => {
        // Object which representes the selected values by category
        const filterProjects = filterProject(filteredCategory);
        console.log(filterProjects, 'filterProjects dans mapfiltered cards')

        // Array including selected project cards  which match from the user choices
        const resultFiltersCards = ProjectFiltersCards(projects.value, filterProjects);
      

        return (
            <CardsContainer>
                {console.log(resultFiltersCards, 'resultFiltersCards')}
                {resultFiltersCards.length > 0 ? (
                    <>
                        {resultFiltersCards.map((project) => (

                            <CardsMapContainer key={project.id}>
                                <Link to={`/projets/${project.id}`} >
                                    <CardContainer key={project.id} >

                                        <ImgContainer>
                                        <CardImg src={project.photos_array[0].photo} alt={project.alt} />
                                        </ImgContainer>
                                        <CardText>
                                            {project.name} - {project.status} - {project.date}
                                        </CardText>
                                    </CardContainer>
                                </Link>
                            </CardsMapContainer>
                        ))}
                    </>
                ) :
                    <EmptyCardContainer>
                        <NoResults />
                        <NoResultsText>Aucun projet ne correspond à cette sélection </NoResultsText>
                    </EmptyCardContainer>}

            </CardsContainer>
        );
    };

    const isOpenMobileFilters = () => {
        setShowMobileFilters((prev) => !prev);
    };

    const mapCategoriesFilter = (categoryObject) => {
        const [showFilter, setShowFilter] = useState(true);
        const isOpenFilter = () => {
            setShowFilter((prev) => !prev);
        };

        //show one filter
        let newCategory = [];
        let uniqueObject = {};

        categoryObject.map((el, index) => {
            let objName = el["name"];

            uniqueObject[objName] = el;
            if (index === categoryObject.length - 1) {
                for (let i in uniqueObject) {
                    newCategory.push(uniqueObject[i]);
                }
            }
        });
        //sort by alphabetic order
        categoryObject = newCategory.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });

        return (
            <>
                {isDesktop && data && categoryObject.length > 0 && (
                    <>
                        <FilterTitle>
                            {categoryObject[0].title}
                            {showFilter && showAllDesktopFilters ? (
                                <MinusIcon onClick={isOpenFilter} />
                            ) : (
                                <PlusIcon onClick={isOpenFilter} />
                            )}
                        </FilterTitle>
                        <FilterChoices
                            showFilter={showFilter}
                            showAllDesktopFilters={showAllDesktopFilters}
                            categories={categoryObject}
                            setFilterByCategory={setFilterByCategory}
                            filterByCategory={filterByCategory}
                            setChosenFilter={setChosenFilter}
                        />
                    </>
                )}
                {isMobile && showMobileFilters && (
                    <>
                        <FilterContainer>
                            <FilterTitle>
                                {categoryObject[0].title}
                                {showFilter ? (
                                    <MinusIcon onClick={isOpenFilter} />
                                ) : (
                                    <PlusIcon onClick={isOpenFilter} />
                                )}
                            </FilterTitle>
                            <FilterChoices
                                showFilter={showFilter}
                                categories={categoryObject}
                                setFilterByCategory={setFilterByCategory}
                                filterByCategory={filterByCategory}
                                setChosenFilter={setChosenFilter}
                            />
                        </FilterContainer>
                    </>
                )}
            </>
        );
    };

    return (

        <>
            {isMobile && (
                <>
                    <Title>MES PROJETS</Title>
                    <Container>
                        {isLogged === true && (
                            <>

                                <TopContainer>
                                    <RegisterArticleButton
                                        style={buttonVariants}
                                        onClick={() => {
                                            navigate('/projets/nouveau');
                                        }}
                                    >
                                        Enregistrer un projet
                                    </RegisterArticleButton>
                                    <Button style={buttonVariants} onClick={isOpenMobileFilters}>
                                        <FilterSpan>
                                            <FilterAlt />
                                        </FilterSpan>
                                        Filtres
                                    </Button>
                                </TopContainer>
                                {filterByCategory.length > 0 ?
                                    <EraseFiltersSelectionButton
                                        onClick={() => {
                                            setFilterByCategory([]);
                                            setShowMobileFilters(false)
                                        }}
                                    >
                                        Effacer les filtres
                                    </EraseFiltersSelectionButton>
                                    : null}


                            </>
                        )}
                        {fabrics
                            ? fabrics.value.map((fabric) => {
                                if (fabric.fabric) {
                                    fabricsFilter.push({
                                        id: fabric.id,
                                        name: fabric.fabric,
                                        title: "Tissus",
                                    });
                                }
                                if (fabric.designer) {
                                    fabricDesignersFilter.push({
                                        id: fabric.id,
                                        name: fabric.designer,
                                        title: "Designers",
                                    });
                                }
                                if (fabric.color) {
                                    fabricColorsFilter.push({
                                        id: fabric.id,
                                        name: fabric.color,
                                        title: "Couleurs",
                                    });
                                }
                            })
                            : null}
                        {patterns
                            ? patterns.value.map((pattern) => {
                                if (pattern.brand) {
                                    patternBrandsFilter.push({
                                        id: pattern.id,
                                        name: pattern.brand,
                                        title: "Marques",
                                    });
                                }
                                if (pattern.gender) {
                                    patternGendersFilter.push({
                                        id: pattern.id,
                                        name: pattern.gender,
                                        title: "Genre",
                                    });
                                }
                                if (pattern.clothing) {
                                    patternClothingsFilter.push({
                                        id: pattern.id,
                                        name: pattern.clothing,
                                        title: "Catégories",
                                    });
                                }
                            })
                            : null}

                        {projects
                            ? projects.value.map((project) => {
                                if (project.status) {
                                    statusFilter.push({
                                        id: project.id,
                                        name: project.status,
                                        title: "Statuts",
                                    });
                                }
                            })
                            : null}

                        {mapCategoriesFilter(fabricsFilter)}
                        {mapCategoriesFilter(fabricDesignersFilter)}
                        {mapCategoriesFilter(fabricColorsFilter)}
                        {mapCategoriesFilter(patternBrandsFilter)}
                        {mapCategoriesFilter(patternClothingsFilter)}
                        {mapCategoriesFilter(patternGendersFilter)}
                        {mapCategoriesFilter(statusFilter)}


                        {error ? (
                            <>
                                <ErrorText>
                                    {" "}
                                    Veuillez vous connecter pour accéder à vos projets.{" "}
                                </ErrorText>
                                <ErrorButton
                                    whileHover="hover"
                                    whileTap="tap"
                                    onClick={() => {
                                        navigate("/");
                                    }}
                                >
                                    Se connecter
                                </ErrorButton>
                            </>

                        ) : isLoading ? (
                            <>Loading...</>
                        ) : !data ? (
                            <>
                                <IconsContainer>
                                    <ArrowCurve /><NoArticle />
                                </IconsContainer>
                                <ErrorText>
                                    {" "}
                                    Enregistrez votre premier projet pour débuter votre collections de projets en cliquant sur le bouton "Enregistrer un projet".{" "}
                                </ErrorText>

                            </>
                        ) : (data && projects && !filterByCategory) ||
                            filterByCategory.length == 0 ? (
                            <>
                                <CardsContainer>
                                    {console.log(projects, 'projects')}
                                    {projects.value.map((project) => (
                                       
                                        <CardsMapContainer key={project.id}>
                                            <Link to={`/projets/${project.id}`} >
                                                <CardContainer key={project.id} >
                                                    <ImgContainer>
                                                        <CardImg src={project.photos_array[0].photo} alt={project.alt} />
                                                    </ImgContainer>
                                                    <CardText>
                                                        {project.name} - {project.status} - {project.date}
                                                    </CardText>
                                                </CardContainer>
                                            </Link>
                                        </CardsMapContainer>
                                    ))}
                                </CardsContainer>
                            </>
                        ) : filterByCategory.length > 0 ? (
                            mapFilteredCards(filterByCategory)
                        ) : null}
                    </Container>
                </>
            )}
            {isDesktop && (
                <>
                    <DesktopContainer>
                        <Container>
                            {isLogged === true && (
                                <LeftContainer>
                                    <ButtonContainer>
                                        <RegisterArticleButton
                                            style={buttonVariants}
                                            onClick={() => {
                                                navigate('/projets/nouveau');
                                            }}
                                        >
                                            Enregistrer un projet
                                        </RegisterArticleButton>
                                    </ButtonContainer>
                                    {filterByCategory.length > 0 ?
                                        <EraseFiltersSelectionButton
                                            onClick={() => {
                                                setFilterByCategory([]);
                                                setShowAllDesktopFilters(false);
                                                setTimeout(() => { setShowAllDesktopFilters(true) }, "500")
                                            }}
                                        >
                                            Effacer les filtres
                                        </EraseFiltersSelectionButton>
                                        : null}

                                    <FilterContainer>
                                        {fabrics
                                            ? fabrics.value.map((fabric) => {
                                                if (fabric.fabric) {
                                                    fabricsFilter.push({
                                                        id: fabric.id,
                                                        name: fabric.fabric,
                                                        title: "Tissus",
                                                    });
                                                }
                                                if (fabric.designer) {
                                                    fabricDesignersFilter.push({
                                                        id: fabric.id,
                                                        name: fabric.designer,
                                                        title: "Designers",
                                                    });
                                                }
                                                if (fabric.color) {
                                                    fabricColorsFilter.push({
                                                        id: fabric.id,
                                                        name: fabric.color,
                                                        title: "Couleurs",
                                                    });
                                                }
                                            })
                                            : null}
                                        {patterns
                                            ? patterns.value.map((pattern) => {
                                                if (pattern.brand) {
                                                    patternBrandFilter.push({
                                                        id: pattern.id,
                                                        name: pattern.brand,
                                                        title: "Marques",
                                                    });
                                                }
                                                if (pattern.gender) {
                                                    patternGendersFilter.push({
                                                        id: pattern.id,
                                                        name: pattern.gender,
                                                        title: "Genre",
                                                    });
                                                }
                                                if (pattern.clothing) {
                                                    patternCothingsFilter.push({
                                                        id: pattern.id,
                                                        name: pattern.clothing,
                                                        title: "Catégories",
                                                    });
                                                }
                                            })
                                            : null}

                                        {projects
                                            ? projects.value.map((project) => {
                                                if (project.status) {
                                                    statusFilter.push({
                                                        id: project.id,
                                                        name: project.status,
                                                        title: "Statuts",
                                                    });
                                                }
                                            })
                                            : null}

                                        {mapCategoriesFilter(fabricsFilter)}
                                        {mapCategoriesFilter(fabricDesignersFilter)}
                                        {mapCategoriesFilter(fabricColorsFilter)}
                                        {mapCategoriesFilter(patternBrandsFilter)}
                                        {mapCategoriesFilter(patternClothingsFilter)}
                                        {mapCategoriesFilter(patternGendersFilter)}
                                        {mapCategoriesFilter(statusFilter)}
                                    </FilterContainer>
                                </LeftContainer>
                            )}

                            {error ? (
                                <ErrorContainer>
                                    <LoginIcon />
                                    <ErrorText>
                                        Veuillez vous connecter pour accéder à vos projets.
                                    </ErrorText>
                                    <ErrorButton
                                        whileHover="hover"
                                        whileTap="tap"
                                        onClick={() => {
                                            navigate("/connexion");
                                        }}
                                    >
                                        Se connecter
                                    </ErrorButton>
                                </ErrorContainer>
                            ) : isLoading ? (
                                <>Loading...</>
                            ) : !data ? (
                                <NoResultsContainer>
                                    <IconsContainer>
                                        <DesktopArrowCurve /><NoArticle />
                                    </IconsContainer>
                                    <ErrorText>
                                        {" "}
                                        Enregistrez votre premier projet pour débuter votre collections de projets en cliquant sur le bouton "Enregistrer un projet".{" "}
                                    </ErrorText>

                                </NoResultsContainer>
                            ) : (data && projects && !filterByCategory) ||
                                filterByCategory.length == 0 ? (
                                <>
                                    <CardsContainer>
                                        <TitleContainer>
                                            <Title>MES PROJETS</Title>
                                        </TitleContainer>
                                        {projects.value.map((project) => (
                                            <CardsMapContainer key={project.id}>
                                                <Link
                                                    to={`/projets/${project.id}`}
                                                >
                                                    <CardContainer key={project.id}>
                                                        <ImgContainer>
                                                            <CardImg src={project.photos_array[0].photo} alt={project.alt} />
                                                        </ImgContainer>

                                                        <CardText>
                                                            {project.name} - {project.status} - {project.date}
                                                        </CardText>
                                                    </CardContainer>
                                                </Link>
                                            </CardsMapContainer>
                                        ))}
                                    </CardsContainer>
                                </>
                            ) : filterByCategory.length > 0 ? (
                                <CardsContainer>
                                    <TitleContainer>
                                        <Title>MES PROJETS</Title>
                                    </TitleContainer>
                                    {mapFilteredCards(filterByCategory)}
                                </CardsContainer>
                            ) : null}
                        </Container>
                    </DesktopContainer>
                </>
            )}
        </>
    );
}

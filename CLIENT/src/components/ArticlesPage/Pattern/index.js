import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { DeviceSize } from "../../Navbar/Responsive";
import { PatternModal } from "./Modal";
import { Loader } from "../../Loader";
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
  LoginIcon,
  FilterSectionContainer
} from "../style";
import { FilterAlt } from "@styled-icons/boxicons-solid";
import { FilterChoices } from "./FilterChoices";
import { filterPattern } from "../../../../src/utils/filterPattern";
import { FiltersCards } from "../../../../src/utils/flexFilter";
import { useSelector, useDispatch } from "react-redux";
import { addAllPatterns } from "../../../store/state/patternSlice";
import { useGetAllPatternsQuery } from "../../../../src/store/api/ytremaApi";
import { render } from "react-dom";

export function Pattern(props, index) {
  let navigate = useNavigate();

  const dispatch = useDispatch();
  //read info from store
  const { persistedReducer } = useSelector((state) => state);
  const auth = persistedReducer.auth;
  const patterns = persistedReducer.patterns;
  const isLogged = auth.isLogged;
  const { data, error, isLoading, isSuccess, isError } = useGetAllPatternsQuery(auth.id);
  
  // we set an array
  let brandsFilter = [];
  let genderFilter = [];
  let clothingFilter = [];

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
      dispatch(addAllPatterns(data.patterns));
    }
  }, [data, patterns]);

  const mapFilteredCards = (filteredCategory) => {
    // Object which representes the selected values by category
    const filterPatterns = filterPattern(filteredCategory);

    // Array including selected pattern cards  which match from the user choices
    const resultFiltersCards = FiltersCards(patterns.value, filterPatterns);

    return (
      <CardsContainer>
        {resultFiltersCards.length > 0 ? (
          <>
            {resultFiltersCards.map((pattern) => (

              <CardsMapContainer key={pattern.id}>
                <Link to={`/patrons/${pattern.id}`} >
                  <CardContainer key={pattern.id} >
                    <ImgContainer>
                      <CardImg src={pattern.photo} alt={pattern.alt} />
                    </ImgContainer>
                    <CardText>
                      {pattern.clothing} - {pattern.name} - {pattern.brand}
                    </CardText>
                  </CardContainer>
                </Link>
              </CardsMapContainer>
            ))}
          </>
        ) :
          <EmptyCardContainer>
            <NoResults />
            <NoResultsText>Aucun patron ne correspond à cette sélection </NoResultsText>
          </EmptyCardContainer>}

      </CardsContainer>
    );
  };

  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });

  const [showModal, setShowModal] = useState(false);
  const isOpenModal = () => {
    setShowModal((prev) => !prev);
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
          <FilterSectionContainer>
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
            </FilterSectionContainer>
          </>
        )}
      </>
    );
  };

  return (
    <>
      {isMobile && (
        <>
          <Title>MA PATRONTHEQUE</Title>
          <Container>
            {isLogged === true && (
              <>

                <TopContainer>
                  <RegisterArticleButton
                    style={buttonVariants}
                    onClick={isOpenModal}
                  >
                    Enregistrer un patron
                  </RegisterArticleButton>

                  <PatternModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                  />
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
            {patterns
              ? patterns.value.map((pattern) => {
                if (pattern.brand) {
                  brandsFilter.push({
                    id: pattern.id,
                    name: pattern.brand,
                    title: "Marques",
                  });
                }
                if (pattern.gender) {
                  genderFilter.push({
                    id: pattern.id,
                    name: pattern.gender,
                    title: "Genre",
                  });
                }
                if (pattern.clothing) {
                  clothingFilter.push({
                    id: pattern.id,
                    name: pattern.clothing,
                    title: "Catégories",
                  });
                }
              })
              : null}

            {mapCategoriesFilter(genderFilter)}
            {mapCategoriesFilter(clothingFilter)}
            {mapCategoriesFilter(brandsFilter)}

            {error ? (
              <>
                <ErrorText>
                  {" "}
                  Veuillez vous connecter pour accéder à vos patrons.{" "}
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
              <Loader />
            ) : !data ? (
              <>
                <IconsContainer>
                  <ArrowCurve /><NoArticle />
                </IconsContainer>
                <ErrorText>
                  {" "}
                  Enregistrez votre premier patron pour débuter votre patronthèque en cliquant sur le bouton "Enregistrer un patron".{" "}
                </ErrorText>

              </>
            ) : (data && patterns && !filterByCategory) ||
              filterByCategory.length == 0 ? (
              <>
                <CardsContainer>
                  {patterns.value.map((pattern) => (
                    <CardsMapContainer key={pattern.id}>
                      <Link to={`/patrons/${pattern.id}`} >
                        <CardContainer key={pattern.id} >
                          <ImgContainer>
                            <CardImg src={pattern.photo} alt={pattern.alt} />
                          </ImgContainer>
                          <CardText>
                            {pattern.clothing} - {pattern.name} - {pattern.brand}
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
                      onClick={isOpenModal}
                    >
                      Enregistrer un patron
                    </RegisterArticleButton>
                    <PatternModal
                      showModal={showModal}
                      setShowModal={setShowModal}
                    />
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
                    {patterns
                      ? patterns.value.map((pattern) => {
                        if (pattern.brand) {
                          brandsFilter.push({
                            id: pattern.id,
                            name: pattern.brand,
                            title: "Marques",
                          });
                        }
                        if (pattern.gender) {
                          genderFilter.push({
                            id: pattern.id,
                            name: pattern.gender,
                            title: "Genre",
                          });
                        }
                        if (pattern.clothing) {
                          clothingFilter.push({
                            id: pattern.id,
                            name: pattern.clothing,
                            title: "Catégories",
                          });
                        }
                      })
                      : null}

                    {mapCategoriesFilter(genderFilter)}
                    {mapCategoriesFilter(clothingFilter)}
                    {mapCategoriesFilter(brandsFilter)}
                  </FilterContainer>
                </LeftContainer>
              )}

              {error ? (
                <ErrorContainer>
                  <LoginIcon />
                  <ErrorText>
                    Veuillez vous connecter pour accéder à vos patrons.
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
                <Loader />
              ) : !data ? (
                <NoResultsContainer>
                  <IconsContainer>
                    <DesktopArrowCurve /><NoArticle />
                  </IconsContainer>
                  <ErrorText>
                    {" "}
                    Enregistrez votre premier patron pour débuter votre patronthèque en cliquant sur le bouton "Enregistrer un patron".{" "}
                  </ErrorText>

                </NoResultsContainer>
              ) : (data && patterns && !filterByCategory) ||
                filterByCategory.length == 0 ? (
                <>
                  <CardsContainer>
                    <TitleContainer>
                      <Title>MA PATRONTHEQUE</Title>
                    </TitleContainer>
                    {patterns.value.map((pattern) => (
                      <CardsMapContainer key={pattern.id}>
                        <Link
                          to={`/patrons/${pattern.id}`}
                        >
                          <CardContainer key={pattern.id}>
                            <ImgContainer>
                              <CardImg src={pattern.photo} alt={pattern.alt} />
                            </ImgContainer>

                            <CardText>
                              {pattern.clothing} - {pattern.name} - {pattern.brand}
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
                    <Title>MA PATRONTHEQUE</Title>
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

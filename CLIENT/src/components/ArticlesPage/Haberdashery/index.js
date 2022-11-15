import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { DeviceSize } from "../../Navbar/Responsive";
import { HaberdasheryModal } from "./Modal";
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
import { filterHaberdashery } from "../../../../src/utils/filterHaberdashery";
import { FiltersCards } from "../../../../src/utils/flexFilter";
import { useSelector, useDispatch } from "react-redux";
import { addAllHaberdasheries } from "../../../store/state/haberdasherySlice";
import { useGetAllHaberdasheriesQuery } from "../../../../src/store/api/ytremaApi";
import { render } from "react-dom";


export const Haberdashery = (props, index) => {
  let navigate = useNavigate();

  const dispatch = useDispatch();
  //read info from store
  const { persistedReducer } = useSelector((state) => state);
  const auth = persistedReducer.auth;
  const haberdasheries = persistedReducer.haberdasheries;
  const isLogged = auth.isLogged;
  const { data, error, isLoading, isSuccess, isError } = useGetAllHaberdasheriesQuery(auth.id);

  // we set an array
  let sizeFilter = [];
  let colorsFilter = [];
  let haberdasheriesFilter = [];

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
      dispatch(addAllHaberdasheries(data.haberdasheries));
    }
  }, [data, haberdasheries]);

  const mapFilteredCards = (filteredCategory) => {
    // Object which represents the selected values by category
    const filterHaberdasheries = filterHaberdashery(filteredCategory);

    // Array including selected haberdashery cards  which match from the user choices
    const resultFiltersCards = FiltersCards(haberdasheries.value, filterHaberdasheries);

    return (
      <CardsContainer>
        {resultFiltersCards.length > 0 ? (
          <>
            {resultFiltersCards.map((haberdashery) => (

              <CardsMapContainer key={haberdashery.id}>
                <Link to={`/mercerie/${haberdashery.id}`} >
                  <CardContainer key={haberdashery.id} >

                    <ImgContainer>
                      <CardImg src={haberdashery.photo} alt={haberdashery.alt} />
                    </ImgContainer>
                    <CardText>
                    {haberdashery.haberdashery} - {haberdashery.name} - {haberdashery.size} {haberdashery.unity} - qté : {haberdashery.stock_qty}
                    </CardText>
                  </CardContainer>
                </Link>
              </CardsMapContainer>
            ))}
          </>
        ) :
          <EmptyCardContainer>
            <NoResults />
            <NoResultsText>Aucune mercerie ne correspond à cette sélection </NoResultsText>
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

      let sizeWithUnity = el.unity && el.name + el.unity;

      let objName = sizeWithUnity ? sizeWithUnity : el["name"];
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
          <Title>MA MERCERIETHEQUE</Title>
          <Container>
            {isLogged === true && (
              <>

                <TopContainer>
                  <RegisterArticleButton
                    style={buttonVariants}
                    onClick={isOpenModal}
                  >
                    Enregistrer un article
                  </RegisterArticleButton>
                  
                  <HaberdasheryModal
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
            {haberdasheries
              ? haberdasheries.value.map((haberdashery) => {
                if (haberdashery.color) {
                  colorsFilter.push({
                    id: haberdashery.id,
                    name: haberdashery.color,
                    title: "Couleurs",
                  });
                }
                if (haberdashery.size) {
                  sizeFilter.push({
                    id: haberdashery.id,
                    name: haberdashery.size,
                    unity: haberdashery.unity,
                    title: "Taille",
                  });
                }
                if (haberdashery.haberdashery) {
                  haberdasheriesFilter.push({
                    id: haberdashery.id,
                    name: haberdashery.haberdashery,
                    title: "Mercerie",
                  });
                }
              })
              : null}

            {mapCategoriesFilter(haberdasheriesFilter)}
            {mapCategoriesFilter(colorsFilter)}
            {mapCategoriesFilter(sizeFilter)}

            {error ? (
              <>
                <ErrorText>
                  {" "}
                  Veuillez vous connecter pour accéder à vos articles de mercerie.{" "}
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
                  Enregistrez votre premier article pour débuter votre merceriethèque en cliquant sur le bouton "Enregistrer un article".{" "}
                </ErrorText>

              </>
            ) : (data && haberdasheries && !filterByCategory) ||
              filterByCategory.length == 0 ? (
              <>
                <CardsContainer>
                  {haberdasheries.value.map((haberdashery) => (
                    <CardsMapContainer key={haberdashery.id}>
                      <Link to={`/mercerie/${haberdashery.id}`} >
                        <CardContainer key={haberdashery.id} >
                          <ImgContainer>
                            <CardImg src={haberdashery.photo} alt={haberdashery.alt} />
                          </ImgContainer>
                          <CardText>
                          {haberdashery.haberdashery} - {haberdashery.name} - {haberdashery.size} {haberdashery.unity} - qté : {haberdashery.stock_qty}
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
                      Enregistrer un article
                    </RegisterArticleButton>
                    <HaberdasheryModal
                      showModal={showModal}
                      setShowModal={setShowModal}
                    />
                  </ButtonContainer>
                  {filterByCategory.length > 0 ?
                    <EraseFiltersSelectionButton
                      onClick={() => {
                        setFilterByCategory([]);
                        setShowAllDesktopFilters(false);
                        setTimeout(() => {setShowAllDesktopFilters(true)},"500")
                      }}
                    >
                      Effacer les filtres
                    </EraseFiltersSelectionButton>
                    : null}

                  <FilterContainer>
                  {haberdasheries
              ? haberdasheries.value.map((haberdashery) => {
                if (haberdashery.color) {
                  colorsFilter.push({
                    id: haberdashery.id,
                    name: haberdashery.color,
                    title: "Couleurs",
                  });
                }
                if (haberdashery.size) {
                  sizeFilter.push({
                    id: haberdashery.id,
                    name: haberdashery.size,
                    unity: haberdashery.unity,
                    // name: haberdashery.size + " " + haberdashery.unity,
                    title: "Taille",
                  });
                }
                if (haberdashery.haberdashery) {
                  haberdasheriesFilter.push({
                    id: haberdashery.id,
                    name: haberdashery.haberdashery,
                    title: "Mercerie",
                  });
                }
              })
              : null}

            {mapCategoriesFilter(haberdasheriesFilter)}
            {mapCategoriesFilter(colorsFilter)}
            {mapCategoriesFilter(sizeFilter)}
                  </FilterContainer>
                </LeftContainer>
              )}

              {error ? (
                <ErrorContainer>
                  <LoginIcon />
                  <ErrorText>
                    Veuillez vous connecter pour accéder à vos articles de mercerie.
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
                    Enregistrez votre premier article pour débuter votre merceriethèque en cliquant sur le bouton "Enregistrer un article".{" "}
                  </ErrorText>

                </NoResultsContainer>
              ) : (data && haberdasheries && !filterByCategory) ||
                filterByCategory.length == 0 ? (
                <>
                  <CardsContainer>
                    <TitleContainer>
                      <Title>MA MERCERIETHEQUE</Title>
                    </TitleContainer>
                    {haberdasheries.value.map((haberdashery) => (
                      <CardsMapContainer key={haberdashery.id}>
                        <Link
                          to={`/mercerie/${haberdashery.id}`}
                        >
                          <CardContainer key={haberdashery.id}>
                            <ImgContainer>
                              <CardImg src={haberdashery.photo} alt={haberdashery.alt} />
                            </ImgContainer>

                            <CardText>
                              {haberdashery.haberdashery} - {haberdashery.name} - {haberdashery.size} {haberdashery.unity} - qté : {haberdashery.stock_qty}
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
                      <Title>MA MERCERIETHEQUE</Title>
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

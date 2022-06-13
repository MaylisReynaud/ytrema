import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { DeviceSize } from "../../Navbar/Responsive";
import { FabricModal } from "./Modal";
import {
  Container,
  Title,
  TitleContainer,
  ButtonContainer,
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
} from "../style";
import { FilterAlt } from "@styled-icons/boxicons-solid";
import { FilterChoices } from "./FilterChoices";
import { filterFabric } from "../../../../src/utils/filterFabric";
import { FiltersCards } from "../../../../src/utils/flexFilter";
import { useSelector, useDispatch } from "react-redux";
import { addAllFabrics } from "../../../store/state/fabricSlice";
import { useGetAllFabricsQuery } from "../../../../src/store/api/ytremaApi";

export function Fabric(props, index) {
  let navigate = useNavigate();

  const dispatch = useDispatch();
  //read info from store
  const { persistedReducer } = useSelector((state) => state);
  const auth = persistedReducer.auth;
  const fabrics = persistedReducer.fabrics;
  const isLogged = auth.isLogged;
  const { data, error, isLoading, isSuccess } = useGetAllFabricsQuery(auth.id);

  // we set an array
  let designersFilter = [];
  let colorsFilter = [];
  let fabricsFilter = [];

  // state
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filterByCategory, setFilterByCategory] = useState([]);
  const [chosenFilter, setChosenFilter] = useState(false);

  if (chosenFilter) {
    setChosenFilter(false);
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(addAllFabrics(data.fabrics));
    }
  }, [data, fabrics]);

  const mapFilteredCards = (filteredCategory) => {
    // Object which representes the selected values by category
    const filterFabrics = filterFabric(filteredCategory);

    // Array including selected fabric cards  which match from the user choices
    const resultFiltersCards = FiltersCards(fabrics.value, filterFabrics);

    return (
      <CardsContainer>
        {resultFiltersCards.length > 0 ? (
          <>
            {resultFiltersCards.map((fabric) => (

              <CardsMapContainer key={fabric.id}>
                <Link to={`/tissus/${fabric.id}`} >
                  <CardContainer key={fabric.id} >

                    <ImgContainer>
                      <CardImg src={fabric.photo} alt={fabric.alt} />
                    </ImgContainer>
                    <CardText>
                      {fabric.name} - {fabric.designer} - {fabric.fabric} - {fabric.quantity}cm
                    </CardText>
                  </CardContainer>
                </Link>
              </CardsMapContainer>



            ))}
          </>
        ) : <div>Aucun tissu ne correspond à cette sélection !</div>}

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
        {isDesktop && (
          <>
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
          <Title>MA TISSUTHÈQUE</Title>
          <Container>
            {isLogged === true && (
              <TopContainer>
                <RegisterArticleButton
                  style={buttonVariants}
                  onClick={isOpenModal}
                >
                  Enregistrer un tissu
                </RegisterArticleButton>
                <FabricModal
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
            )}
            {fabrics
              ? fabrics.value.map((fabric) => {
                if (fabric.color) {
                  colorsFilter.push({
                    id: fabric.id,
                    name: fabric.color,
                    title: "Couleurs",
                  });
                }
                if (fabric.designer) {
                  designersFilter.push({
                    id: fabric.id,
                    name: fabric.designer,
                    title: "Designers",
                  });
                }
                if (fabric.fabric) {
                  fabricsFilter.push({
                    id: fabric.id,
                    name: fabric.fabric,
                    title: "Tissus",
                  });
                }
              })
              : null}

            {mapCategoriesFilter(fabricsFilter)}
            {mapCategoriesFilter(colorsFilter)}
            {mapCategoriesFilter(designersFilter)}

            {error ? (
              <>
                <ErrorText>
                  {" "}
                  Veuillez vous connecter pour accéder à vos tissus{" "}
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
            ) : (data && fabrics && !filterByCategory) ||
              filterByCategory.length == 0 ? (
              <>
                <CardsContainer>
                  {fabrics.value.map((fabric) => (
                    <CardsMapContainer key={fabric.id}>
                      <Link to={`/tissus/${fabric.id}`} >
                        <CardContainer key={fabric.id} >
                          <ImgContainer>
                            <CardImg src={fabric.photo} alt={fabric.alt} />
                          </ImgContainer>
                          <CardText>
                            {fabric.name} - {fabric.designer} - {fabric.fabric} -      {fabric.quantity}cm
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
      {isDesktop && isLogged === true && (
        <>
          <DesktopContainer>
            <Container>
              <LeftContainer>
                <ButtonContainer>
                  <RegisterArticleButton
                    style={buttonVariants}
                    onClick={isOpenModal}
                  >
                    Enregistrer un tissu
                  </RegisterArticleButton>
                  <FabricModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                  />
                </ButtonContainer>
                <FilterContainer>
                  {fabrics
                    ? fabrics.value.map((fabric) => {
                      if (fabric.color) {
                        colorsFilter.push({
                          id: fabric.id,
                          name: fabric.color,
                          title: "Couleurs",
                        });
                      }
                      if (fabric.designer) {
                        designersFilter.push({
                          id: fabric.id,
                          name: fabric.designer,
                          title: "Designers",
                        });
                      }
                      if (fabric.fabric) {
                        fabricsFilter.push({
                          id: fabric.id,
                          name: fabric.fabric,
                          title: "Tissus",
                        });
                      }
                    })
                    : null}
                  {mapCategoriesFilter(fabricsFilter)}
                  {mapCategoriesFilter(colorsFilter)}
                  {mapCategoriesFilter(designersFilter)}
                </FilterContainer>
              </LeftContainer>

              {error ? (
                <>
                  <ErrorText>
                    {" "}
                    Veuillez vous connecter pour accéder à vos tissus{" "}
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
              ) : (data && fabrics && !filterByCategory) ||
                filterByCategory.length == 0 ? (
                <>
                  <CardsContainer>
                    <TitleContainer>
                      <Title>MA TISSUTHEQUE</Title>
                    </TitleContainer>
                    {fabrics.value.map((fabric) => (
                      <CardsMapContainer key={fabric.id}>
                        <Link
                          to={`/tissus/${fabric.id}`}
                        >
                          <CardContainer key={fabric.id}>
                            <ImgContainer>
                              <CardImg src={fabric.photo} alt={fabric.alt} />
                            </ImgContainer>

                            <CardText>
                              {fabric.name} - {fabric.designer} - {fabric.fabric} - {fabric.quantity}cm
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
          </DesktopContainer>
        </>
      )}
    </>
  );
}

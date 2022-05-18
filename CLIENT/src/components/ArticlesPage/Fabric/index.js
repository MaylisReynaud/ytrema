import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { DeviceSize } from '../../Navbar/Responsive';
import { FabricModal } from './Modal';
import { Card } from './Card';
import { fabricData } from '../../../utils/fabricData';
import { Container, 
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
         SignupLink,
         ErrorButton
} from '../style';
import { FilterAlt } from '@styled-icons/boxicons-solid';
import { FilterChoices } from './FilterChoices';
// import  { designers, colors}  from '../../../../src/utils/fabricFilterChoices';
import { useSelector, useDispatch } from 'react-redux';
import { addAllFabrics, addFabric, updateFabric, deleteFabric } from '../../../store/state/fabricSlice';
import { useGetAllFabricsQuery } from '../../../../src/store/api/ytremaApi';


export function Fabric (props, index) {
 
    let navigate = useNavigate();
    
    const dispatch = useDispatch();
    //read info from store
    const { persistedReducer } = useSelector(state => state);
    const auth = persistedReducer.auth;
    const fabrics = persistedReducer.fabrics;
    const isLogged = auth.isLogged;
    const { data, error, isLoading, isSuccess } = useGetAllFabricsQuery(auth.id);
    
    // we set an array
    let designersFilter = [];
    let colorsFilter = [];
    let fabricsFilter = [];

    // const [chosenCardFilters, setChosenCardFilters] = useState([]);
   let chosenFiltersCards;
 
    // state
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [filterByCategory, setFilterByCategory] = useState([]);
    console.log(filterByCategory, "teste l61 après tableau")


    
    useEffect(() => {
        if (isSuccess) {
          dispatch(addAllFabrics(data.fabrics));            
        };
        if(filterByCategory && filterByCategory.length > 0) {
            console.log("good tableau supérieur à 1");
          }
        console.log("ICI USEEFFECT");
        console.log(filterByCategory, "FILTERBYCATEGORY - fabric.js l.70");
      }, [data]);
    
      const mapFilteredCards = (filteredCategory) => {
        let filterCardsSelection;

        chosenFiltersCards ? filterCardsSelection = chosenFiltersCards : filterCardsSelection = [];

        let results = filteredCategory.map((chosenCategory) => {
            console.log(chosenCategory, 'ici CHOSEN CATEGORY');
            if(chosenCategory.category === 'Tissus' ) {
              return fabrics.value.filter((el) => el.fabric === chosenCategory.name);
            } 
        
        })
        chosenFiltersCards= results;
        const mergedChosenFiltersCards = [].concat(...chosenFiltersCards);

        return (
            <CardsContainer>
            {console.log(filterByCategory.length, 'FILTERBYCATEGORY.LENGTH')}
            {console.log(mergedChosenFiltersCards, 'MERGED CHOSENCARDFILTERS')}
            
            
            {mergedChosenFiltersCards.map(fabric => (
                
            <CardsMapContainer
                key={fabric.id}
            >
                <CardContainer 
                    key={fabric.id}
                    onClick= {isOpenCard}
                >
                    <Link 
                        to = "/tissus/tissu"
                    />
                    <ImgContainer>
                            <CardImg src={fabric.photo} alt={fabric.alt}/>
                        </ImgContainer>
                    <CardText>
                    {fabric.name} - {fabric.designer} - {fabric.fabric} - {fabric.size}
                    </CardText>
                </CardContainer>
            </CardsMapContainer>

            ))}
           
            </CardsContainer>
        )
    }; 

    useEffect(() => {
        console.log('coucou je passe dans USE EFFECT L128')
        if(filterByCategory.length > 0) {
            mapFilteredCards(filterByCategory);
        }
    }, [filterByCategory])

    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });

    const [showModal, setShowModal] = useState(false);
    const isOpenModal = () => {
        setShowModal(prev => !prev)
    };

    const [showCard, setShowCard] = useState(false);
    const isOpenCard = () => {
        setShowCard(prev => !prev)
    };
    
    

    const isOpenMobileFilters = () => {
        setShowMobileFilters(prev => !prev)
    };

    

    const mapCategoriesFilter = (categoryObject) => {

      const [showFilter, setShowFilter] = useState(true);
      const isOpenFilter = () => {
          setShowFilter(prev => !prev);
      };

      //show one filter
      let newCategory = [];
      let uniqueObject = {};

      categoryObject.map((el, index) => {
        let objName = el['name'];
    
        uniqueObject[objName] = el;
        if (index === categoryObject.length - 1) {
            for (let i in uniqueObject) {
                newCategory.push(uniqueObject[i]);
            }
        }
        
    });
        //sort by alphabetic order
        categoryObject = newCategory.sort(function(a,b) {
            return a.name.localeCompare(b.name)
        });

    
        return (
            <>
            {isDesktop && (
                <>
                <FilterTitle>
                {categoryObject[0].title}
                {console.log(activeItem, 'ici active item')}
                {showFilter ? 
                <MinusIcon
                onClick={isOpenFilter}
                />
                :
                <PlusIcon 
                    onClick={isOpenFilter}
                />
                }
                        
                        
            </FilterTitle>
            <FilterChoices 
                showFilter={showFilter}
                categories={categoryObject}
            />
            </>
            )
            }
            {isMobile && showMobileFilters && (
                <>
                <FilterContainer>
                <FilterTitle>
                {categoryObject[0].title}
                {showFilter ? 
                <MinusIcon
                onClick={isOpenFilter}
                />
                :
                <PlusIcon 
                    onClick={isOpenFilter}
                />
                }
                        
                        
            </FilterTitle>
            <FilterChoices 
                showFilter={showFilter}
                categories={categoryObject}
                setFilterByCategory={setFilterByCategory}
                filterByCategory = {filterByCategory}
                
            />
                </FilterContainer>

            </>
            )
            }
                
            </>
            
        )
    }

  return (
    <>
        {isMobile && (
            <>
        <Title>
            MA TISSUTHÈQUE
        </Title>
        <Container>
            { isLogged === true && (
            <TopContainer>
                <RegisterArticleButton
                    style= {buttonVariants} 
                    onClick= {isOpenModal}
                >
                    Enregistrer un tissu
                </RegisterArticleButton>
                <FabricModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
                <Button
                    style= {buttonVariants}
                    onClick = {isOpenMobileFilters}
                >
                   <FilterSpan>
                       <FilterAlt />
                   </FilterSpan>
                        Filtres
                </Button>
            </TopContainer> )
            }
            {fabrics ? fabrics.value.map(fabric => {
                if (fabric.color) {
                    colorsFilter.push({
                        id: fabric.id,
                        name: fabric.color,
                        title: "Couleurs"
                        
                    })
                };
                if (fabric.designer) {
                    designersFilter.push({
                        id: fabric.id,
                        name: fabric.designer,
                        title: "Designers"
                    })
                };
                if (fabric.fabric) {
                    fabricsFilter.push({
                        id: fabric.id,
                        name: fabric.fabric,
                        title: "Tissus"
                    })
                }

            }): null}
        
            {mapCategoriesFilter(fabricsFilter)}
            {mapCategoriesFilter(colorsFilter)}
            {mapCategoriesFilter(designersFilter)}
           


            {error ? (
                <>
                <ErrorText> Veuillez vous connecter pour accéder à vos tissus </ErrorText>
                <ErrorButton
                    whileHover='hover'
                    whileTap='tap'
                    onClick={() => {
                      navigate('/');
                    }}
                >
                
                    Se connecter
                </ErrorButton>

                
               
                </>
                
                
            ) : isLoading ? (
                <>Loading...</>
            ) : data && fabrics && !filterByCategory || filterByCategory.length == 0 ? (
                <>
           
               
               <CardsContainer>
                
               {fabrics.value.map(fabric => (
                   
               <CardsMapContainer
                   key={fabric.id}
               >
                   <CardContainer 
                       key={fabric.id}
                       onClick= {isOpenCard}
                   >
                       <Link 
                           to = "/tissus/tissu"

                       />
                       <ImgContainer>
                               <CardImg src={fabric.photo} alt={fabric.alt}/>
                           </ImgContainer>
                       <CardText>
                       {fabric.name} - {fabric.designer} - {fabric.fabric} - {fabric.size}
                       </CardText>
                   </CardContainer>
               
               </CardsMapContainer>
             
               ))}
              
               </CardsContainer>
            
                </>
            ) : filterByCategory.length > 0 ? (
                mapFilteredCards(filterByCategory)
              
                // <CardsContainer>
                // {console.log(filterByCategory.length, 'FILTERBYCATEGORY.LENGTH')}
                // {console.log(chosenFiltersCards, 'CHOSENCARDFILTERS')}
                
                // {console.log(chosenFiltersCards.length, 'CHOSENCARDFILTERS LENGTH')}
                
                // {chosenFiltersCards.map(fabric => (
                    
                // <CardsMapContainer
                //     key={fabric.id}
                // >
                //     <CardContainer 
                //         key={fabric.id}
                //         onClick= {isOpenCard}
                //     >
                //         <Link 
                //             to = "/tissus/tissu"
 
                //         />
                //         <ImgContainer>
                //                 <CardImg src={fabric.photo} alt={fabric.alt}/>
                //             </ImgContainer>
                //         <CardText>
                //         {fabric.name} - {fabric.designer} - {fabric.fabric} - {fabric.size}
                //         </CardText>
                //     </CardContainer>
                
                // </CardsMapContainer>
              
                // ))}
               
                // </CardsContainer>
            ) :null}


        </Container>
        </>
        )
        }
        {isDesktop && isLogged === true && (
         <>
         <DesktopContainer> 
            <Container>
                <LeftContainer>
                    <ButtonContainer>
                        <RegisterArticleButton
                            style= {buttonVariants} 
                            onClick= {isOpenModal}
                            >
                            Enregistrer un tissu
                        </RegisterArticleButton>
                        <FabricModal
                            showModal={showModal}
                            setShowModal={setShowModal}
                        />
                    </ButtonContainer>
                    <FilterContainer>
                        {mapCategoriesFilter(fabrics)}
                        {mapCategoriesFilter(colors)}
                        {mapCategoriesFilter(designers)}
                    </FilterContainer>
                    
                    
                </LeftContainer>

                {error ? (
                <>
                <ErrorText> Veuillez vous connecter pour accéder à vos tissus </ErrorText>
                <ErrorButton
                    whileHover='hover'
                    whileTap='tap'
                    onClick={() => {
                      navigate('/');
                    }}
                >
                
                    Se connecter
                </ErrorButton>

                </>
                
                
            ) : isLoading ? (
                <>Loading...</>
            ) : data && fabrics ? (
                <>
                <CardsContainer>
                    <TitleContainer>
                        <Title>
                            MA TISSUTHEQUE
                        </Title>
                    </TitleContainer>
                    {fabrics.value.map(fabric => (
                         <CardsMapContainer
                            key={fabric.id}
                        >
                            <CardContainer key={fabric.id} >
                                <ImgContainer>
                                    <CardImg src={fabric.image} alt={fabric.alt}/>
                                </ImgContainer>
                            
                            <CardText>
                                {fabric.name} - {fabric.designer} - {fabric.fabric} - {fabric.size}
                            </CardText>
                        </CardContainer>
                    </CardsMapContainer>
                    ))}
                    
                </CardsContainer>
                </>
            ) : null}
            </Container>
         </DesktopContainer>
         </>
        )
        }
    </>
  )
    
};





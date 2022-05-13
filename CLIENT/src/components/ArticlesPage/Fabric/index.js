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
import { persistedReducer } from '../../../store';



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

    
    useEffect(() => {
        if (isSuccess) {
          dispatch(addAllFabrics(data.fabrics));            
        };
      }, [data]);
      
   
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
    
    
    const [showMobileFilters, setShowMobileFilters] = useState(false);
  
    const isOpenMobileFilters = () => {
        setShowMobileFilters(prev => !prev)
    };

    const [filterByCategory, setFilterByCategory] = useState();

    const mapCategoriesFilter = (categoryObject) => {

      const [showFilter, setShowFilter] = useState(true);
      const isOpenFilter = () => {
          setShowFilter(prev => !prev);
      };
      const uniqueFilter = [... new Set (categoryObject.map((category) => category.name))];
      console.log(uniqueFilter, 'ici uniqueFilter')
    //   console.log(categoryObject.filter((category) => category.name !== uniqueFilter[0]), "FILTER CATEGORY OBJECT")
      
    //   const uniqueFilterByCategory = uniqueFilter.map((el) => {
    //      return categoryObject.filter((category) => el === category.name)
    //   });

    //   setFilterByCategory(uniqueFilterByCategory);



    //   categoryObject = filterByCategory.map((el) => {
    //       return el[0]
    //   })
    //   console.log(categoryObject, 'CATEGORY OBJECT ')
    
        return (
            <>
            {isDesktop && (
                <>
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
                    console.log(colorsFilter, 'ici colorsFilter')
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
                   
                    console.log(fabricsFilter, 'ici fabricsFilter')
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
            ) : data && fabrics ? (
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
            ) : null}


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





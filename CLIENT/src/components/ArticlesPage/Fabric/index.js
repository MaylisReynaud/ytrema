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
 import  {fabrics, designers, colors}  from '../../../../src/utils/fabricFilterChoices';
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
    const fabricss = persistedReducer.fabrics;
    const isLogged = auth.isLogged;
    const { data, error, isLoading, isSuccess } = useGetAllFabricsQuery(auth.id);
     

    
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
    const mapCategoriesFilter = (categoryObject) => {

      const [showFilter, setShowFilter] = useState(true);
      const isOpenFilter = () => {
          setShowFilter(prev => !prev);
      };
    
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
            
            {mapCategoriesFilter(fabrics)}
            {mapCategoriesFilter(colors)}
            {mapCategoriesFilter(designers)}


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
            ) : data && fabricss ? (
                <>
           
            <CardsContainer>
                {fabricss.value.map(fabric => (
                    
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





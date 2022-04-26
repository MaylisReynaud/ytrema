import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { DeviceSize } from '../../Navbar/Responsive';
import { FabricModal } from './Modal';
import { Card } from './Card';
import { Container, 
         Title,
         TitleContainer,
         ButtonContainer,
         TopContainer,
         RegisterArticleButton,
         FiltersButton,
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
         ImgContainer
} from '../style';
import { FilterAlt } from '@styled-icons/boxicons-solid';
// import { fabricData } from '../../../utils/fabricData';
import { FilterChoices } from './FilterChoices';
import  {fabrics, designers, colors}  from '../../../../src/utils/fabricFilterChoices';
import { useSelector, useDispatch } from 'react-redux';
import { addAllFabrics, addFabric, updateFabric, deleteFabric } from '../../../store/state/fabricSlice';
import { useGetAllFabricsQuery } from '../../../../src/store/api/ytremaApi';



export function Fabric (props, index) {
    //call action 

    
    const dispatch = useDispatch();
    
       
    //read info from store
   
    const { auth } = useSelector(state => state);
    const { data, error, isLoading, isSuccess } = useGetAllFabricsQuery(auth.id);
    
    
    useEffect(() => {
        if (isSuccess) {
          dispatch(addAllFabrics(data.fabrics));            
        };
      }, [data]);
      
      const { fabrics } = useSelector(state => state);
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
                <FiltersButton
                    style= {buttonVariants}
                    onClick = {isOpenMobileFilters}
                >
                   <FilterSpan>
                       <FilterAlt />
                   </FilterSpan>
                        Filtres
                </FiltersButton>
            </TopContainer>
            {mapCategoriesFilter(fabrics)}
            {mapCategoriesFilter(colors)}
            {mapCategoriesFilter(designers)}


            {error ? (
                <>Oh no, there was an error</>
                
            ) : isLoading ? (
                <>Loading...</>
            ) : data ? (
                <>
           
            <CardsContainer>
                {data.fabrics.map(fabric => (
                    
                    <>
                    <CardContainer 
                        key={fabric.id}
                        onClick= {isOpenCard}
                    >
                        <Link 
                            // key={fabric.id}
                            to = "/tissus/tissu"

                        />
                        <ImgContainer>
                                <CardImg src={fabric.photo} alt={fabric.alt}/>
                            </ImgContainer>
                    <CardText>
                       {fabric.name} - {fabric.designer} - {fabric.fabric} - {fabric.size}
                    </CardText>
                </CardContainer>
                
             </>
              
                ))}
               
            </CardsContainer>
                </>
            ) : null}


        </Container>
        </>
        )
        }
        {isDesktop && (
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
                <CardsContainer>
                    <TitleContainer>
                        <Title>
                            MA TISSUTHEQUE
                        </Title>
                    </TitleContainer>
                    {fabricData.map(fabric => (
                        <CardContainer key={fabric.id} >
                            <ImgContainer>
                                <CardImg src={fabric.image} alt={fabric.alt}/>
                            </ImgContainer>
                        
                        <CardText>
                            {fabric.name} - {fabric.designer} - {fabric.fabric} - {fabric.size}
                        </CardText>
                    </CardContainer>
                    ))}
                    
                </CardsContainer>
            </Container>
         </DesktopContainer>
         </>
        )
        }
    </>
  )
    
};





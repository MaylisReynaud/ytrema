import React, {useState} from 'react';
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
import { fabricData } from '../../../utils/fabricData';
import { FilterChoices } from './FilterChoices';
import  {fabrics, designers, colors}  from '../../../../src/utils/fabricFilterChoices';


export function Fabric (props, index) {
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
    console.log(showCard, "ici showcard");

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
            <CardsContainer>
                {fabricData.map(fabric => (
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
                                <CardImg src={fabric.image} alt={fabric.alt}/>
                            </ImgContainer>
                    <CardText>
                       {fabric.name} - {fabric.designer} - {fabric.fabric} - {fabric.size}
                    </CardText>
                </CardContainer>
                 {/* <Card 
                 key = {fabric.name}
                 showCard = {showCard}
                 setShowCard = {setShowCard}
                 fabricName = {fabric.name}
                 fabricImage = {fabric.image}
             /> */}
             </>
              
                ))}
               
            </CardsContainer>
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





import React, {useState} from 'react';
import { useMediaQuery } from 'react-responsive';
import { DeviceSize } from '../../Navbar/Responsive';
import { FabricModal } from './Modal';
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
         PlusIcon
} from '../style';
import { FilterAlt } from '@styled-icons/boxicons-solid';
import { fabricData } from '../../../utils/fabricData';
import { FilterChoices } from './FilterChoices';
import  {fabrics, designers, colors}  from '../../../../src/utils/fabricFilterChoices';


export function Fabric (props) {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(prev=> !prev)
    };
    const [showFilter, setShowFilter] = useState(true);
    const isOpenFilter = (event) => {
       console.log(event.target, 'event.target dans isOpenFilter');
        setShowFilter(prev => !prev);
    };
    console.log(showFilter, 'dans fabric');
    const mapCategoriesFilter = (categoryObject) => {
        return (
            <>
                <FilterTitle
                    className={categoryObject[0].title}
                    value={categoryObject[0].title}
                >
                    {categoryObject[0].title}
                    {showFilter ? 
                    <MinusIcon 
                    onClick={isOpenFilter}
                    />
                    :
                    <PlusIcon
                    onClick={isOpenFilter}
                    showFilter={showFilter}
                    />
                    
                    }
                            
                            
                </FilterTitle>
                <FilterChoices 
                    showFilter={showFilter}
                    categories={categoryObject}
                    value={categoryObject[0].title}
                />
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
                    onClick= {openModal}
                >
                    Enregistrer un tissu
                </RegisterArticleButton>
                <FabricModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
                <FiltersButton
                    style= {buttonVariants}
                >
                   <FilterSpan>
                       <FilterAlt />
                   </FilterSpan>
                        Filtres
                </FiltersButton>
            </TopContainer>
            <CardsContainer>
                {fabricData.map(fabric => (
                    <CardContainer key={fabric.id} >
                    <CardImg src={fabric.image} alt={fabric.alt}/>
                    <CardText>
                       {fabric.name} - {fabric.designer} - {fabric.fabric} - {fabric.size}
                    </CardText>
                </CardContainer>
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
                            onClick= {openModal}
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
                        {/* <FilterTitle>
                            Tissus
                            {showFilter ? 
                            <PlusIcon
                            onClick={isOpenFilter}
                            showFilter={showFilter}
                            />
                            :
                            <MinusIcon 
                                onClick={isOpenFilter}
                            />
                            }
                            
                            
                        </FilterTitle>
                        <FilterChoices 
                            showFilter={showFilter}
                            categories={designers}
                        /> */}
                    </FilterContainer>
                    
                    
                </LeftContainer>
                <CardsContainer>
                    <TitleContainer>
                        <Title>
                            MA TISSUTHÈQUE
                        </Title>
                    </TitleContainer>
                    {fabricData.map(fabric => (
                        <CardContainer key={fabric.id} >
                        <CardImg src={fabric.image} alt={fabric.alt}/>
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





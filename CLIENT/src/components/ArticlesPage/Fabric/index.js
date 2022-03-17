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
} from '../style';
import { FilterAlt } from '@styled-icons/boxicons-solid';
import { fabricData } from '../../../utils/fabricData';
import { FilterChoices } from './FilterChoices';


export function Fabric (props) {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(prev=> !prev)
    };

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
                        <FilterTitle>
                            Tissus
                        </FilterTitle>
                        <FilterChoices />
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





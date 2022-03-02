import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { DeviceSize } from '../../Navbar/Responsive';
import { Container, 
         Title,
         TopContainer,
         RegisterArticleButton,
         FiltersButton,
         buttonVariants,
         FilterSpan,
         CardsContainer,
         CardContainer,
         CardImg,
         CardText,
} from '../style';
import { FilterAlt } from '@styled-icons/boxicons-solid';
import { fabricData } from '../../../utils/fabricData';

export function Pattern (props) {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  return (
    <>
        <Title>
        MA PATRONTHÈQUE 
        </Title>
        <Container>
            <TopContainer>
                <RegisterArticleButton
                    style= {buttonVariants} 
                >
                    Enregistrer un patron
                </RegisterArticleButton>
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
;}


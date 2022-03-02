import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { DeviceSize } from '../Navbar/Responsive';
import { Container, 
         Title,
         TopContainer,
         RegisterArticleButton,
         FiltersButton,
         buttonVariants,
         FilterSpan,
} from './style';
import { FilterAlt } from '@styled-icons/boxicons-solid';

export function Fabric (props) {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  return (
    <>
        <Title>
        MA TISSUTHÈQUE 
        </Title>
        <Container>
            <TopContainer>
                <RegisterArticleButton
                    style= {buttonVariants} 
                >
                    Enregistrer un tissu
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
        </Container>
    </>
  )
;}


import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { DeviceSize } from '../../Navbar/Responsive';
import { useDispatch, useSelector } from "react-redux";
import { Container, 
         Title,
         TopContainer,
         RegisterArticleButton,
         buttonVariants,
         CardsContainer,
         CardContainer,
         CardImg,
         CardText,
} from '../style';
import { fabricData } from '../../../utils/fabricData';
import { useParams, useNavigate } from "react-router-dom";

import { fabricsDefaultState } from "../../../store/state/fabricSlice";
import { useDeleteAllFabricsMutation } from '../../../store/api/ytremaApi';

export function Profil (props) {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });

    let navigate = useNavigate();
    const dispatch = useDispatch();

    const { persistedReducer } = useSelector((state) => state);
    const auth = persistedReducer.auth;
    const [deleteAllFabrics] = useDeleteAllFabricsMutation(auth.id);

    const deleteAllFabricsStore = () => {
      deleteAllFabrics(`${auth.id}`);
      dispatch(fabricsDefaultState('initialState'));
      navigate("/tissus");
    }

  return (
    <>
        <Title>
        Mon Profil
        </Title>
        <Container>
            <TopContainer>
                <RegisterArticleButton
                    style= {buttonVariants} 
                    onClick={deleteAllFabricsStore}
                >
                    Supprimer ma Tissuthèque
                </RegisterArticleButton>
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


import React from "react";
import Error404 from '../../assets/images/404.jpg';
import { useNavigate } from "react-router-dom";
import {
    Error404Container,
    Error404Image,
    Image404Container,
    Button
} from "./style";

export function NotFound() {
    let navigate = useNavigate();
    return (

        <Error404Container>
            <Image404Container>
                <Error404Image
                    src={Error404}
                    alt="Erreur 404"
                    onClick={() => {
                        navigate('/Tissus');
                    }}
                />
            </Image404Container>

            <Button
                onClick={() => {
                    navigate('/Tissus');
                }}
            >
                Retour à la page d'accueil
            </Button>
        </Error404Container>


    );
};

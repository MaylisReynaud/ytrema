import React, {useState} from "react";
import {NavLink} from 'react-router-dom';
import {
    ConnectionContainer,
    RegisterButton,
    LogginButton
} from "./connection.style";


 
function Connection (props) {
    return (
        <ConnectionContainer>
            <NavLink exact to ="/register">
                <RegisterButton> S'enregistrer</RegisterButton>
            </NavLink>
            <NavLink exact to ="/loggin">
                <LogginButton>Se connecter</LogginButton>
            </NavLink>
         </ConnectionContainer>
    )
}

export default Connection;


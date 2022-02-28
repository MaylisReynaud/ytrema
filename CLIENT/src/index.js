// == Import : npm
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { FontStyles } from '../src/style/fontStyles';
import { Reset } from '../src/style/styled-reset';
import  { theme } from './style/theme';


// == Import : local
// Composants
import App from '../src/components/App';
import { ThemeProvider } from "styled-components";

// == Render
// 1. Élément React racine (celui qui contient l'ensemble de l'app)
//    => crée une structure d'objets imbriqués (DOM virtuel)
const rootReactElement = (
    <BrowserRouter>
        <Reset />
        <FontStyles />
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </BrowserRouter>

)

// 2. La cible du DOM (là où la structure doit prendre vie dans le DOM)
const target = document.getElementById('root');
// 3. Déclenchement du rendu de React (virtuel) => DOM (page web)
render(rootReactElement, target);

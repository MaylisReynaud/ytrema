import { createGlobalStyle } from 'styled-components';
import DalaFlodaWoff from '../fonts/DalaFloda.woff';
import DalaFlodaWoff2 from '../fonts/DalaFloda.woff2';
import ProximaNovaWoff from '../fonts/ProximaNovaRegular.woff';
import ProximaNovaWoff2 from '../fonts/ProximaNovaRegular.woff2';
import InconsolataWoff from '../fonts/InconsolataRegular.woff';
import InconsolataWoff2 from '../fonts/InconsolataRegular.woff2';
import CalendasWoff from '../fonts/calendasplus.woff';
import CalendasWoff2 from '../fonts/calendasplus.woff2';
import ArchiveWoff2 from '../fonts/Archive.woff2';
import QuincyBlackItalicWoff2 from '../fonts/QuincyCF-BlackItalic.woff2';
import QuincyBlackItalicWoff from '../fonts/QuincyCF-BlackItalic.woff';
import QuincyBoldItalicWoff2 from '../fonts/QuincyCF-BoldItalic.woff2';
import QuincyBoldItalicWoff from '../fonts/QuincyCF-BoldItalic.woff';
import QuincyItalicWoff2 from '../fonts/QuincyCF-Italic.woff2';
import QuincyItalicWoff from '../fonts/QuincyCF-Italic.woff';
import QuincyLightItalicWoff2 from '../fonts/QuincyCF-LightItalic.woff2';
import QuincyLightItalicWoff from '../fonts/QuincyCF-LightItalic.woff';
import PhilosopherWoff2 from '../fonts/Philosopher.woff2';
import PhilosopherWoff from '../fonts/Philosopher.woff';


export const FontStyles = createGlobalStyle`
    @font-face {
    font-family: 'Dala Floda Web Roman No. 2 Regular';
    src: url(${DalaFlodaWoff2}) format('woff2'),
         url(${DalaFlodaWoff}) format('woff');
    };

    @font-face {
        font-family: "ProximaNova-Regular"; 
        src: url(${ProximaNovaWoff2}) format('woff2'),
             url(${ProximaNovaWoff}) format('woff');
};

    @font-face {
        font-family: "Inconsolata"; 
        src: url(${InconsolataWoff2}) format('woff2'),
             url(${InconsolataWoff}) format('woff');
};

    @font-face {
        font-family: "Calendas Plus Regular"; 
        src: url(${CalendasWoff2}) format('woff2'),
             url(${CalendasWoff}) format('woff');
};

@font-face {
        font-family: "Archive"; 
        src: url(${ArchiveWoff2}) format('woff2');
};

@font-face {
        font-family: "Quincy CF"; 
        src: url(${QuincyBlackItalicWoff2}) format('woff2'),
             url(${QuincyBlackItalicWoff}) format('woff'),
             url(${QuincyBoldItalicWoff2}) format('woff2'),
             url(${QuincyBoldItalicWoff}) format('woff'),
             url(${QuincyItalicWoff2}) format('woff2'),
             url(${QuincyItalicWoff}) format('woff'),
             url(${QuincyLightItalicWoff2}) format('woff2'),
             url(${QuincyLightItalicWoff}) format('woff');
};

@font-face {
        font-family: "Philosopher"; 
        src: url(${PhilosopherWoff2}) format('woff2'),
             url(${PhilosopherWoff}) format('woff');
};

`;


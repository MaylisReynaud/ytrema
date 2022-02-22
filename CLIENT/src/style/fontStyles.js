import { createGlobalStyle } from 'styled-components';
import DalaFlodaWoff from '../fonts/DalaFloda.woff';
import DalaFlodaWoff2 from '../fonts/DalaFloda.woff2';
import ProximaNovaWoff from '../fonts/ProximaNovaRegular.woff';
import ProximaNovaWoff2 from '../fonts/ProximaNovaRegular.woff2';
import InconsolataWoff from '../fonts/InconsolataRegular.woff';
import InconsolataWoff2 from '../fonts/InconsolataRegular.woff2';

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
`;


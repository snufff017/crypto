import { createGlobalStyle } from 'styled-components';

import RobotoRegular from './Roboto/Roboto-Regular.ttf';
//import NameOfYourFontWoff2 from './nameOfYourFont.woff2';

export default createGlobalStyle`
    @font-face {
        font-family: 'Roboto';
        src: local('Roboto'), local('Roboto'),
        url(${RobotoRegular}) format('ttf'),
        font-weight: 400;
        font-style: normal;
    }
`;
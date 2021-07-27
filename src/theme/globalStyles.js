import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

*{
    margin : 0;
    padding : 0;
    box-sizing : border-box;
}

body{
    overflow-x : hidden;
    scroll-behaviour : smooth;
    width : 100vw;
    height : 100vh;
    font-family : Roboto, HelveticaNeue, Arial, sans-serif;
    
}

button{
    cursor : pointer;
    border : none;
    outline : none;
    display : grid;
    place-items : center;
    background:transparent;
}


`;

export default GlobalStyle;

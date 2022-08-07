import { createGlobalStyle } from 'styled-components';
import patern from '../img/pattern';
export const GlobalStyles = createGlobalStyle`

:root {
  --dark-purple: #9163f2;
  --purple: #8480f2;
  --blue: #30a8f2;
  --blue-green: #32bad9;
  --green: #48d9ca;
  --dark-green: #3fbbaf;
  --white: #fcfcfc;
  --gray: #e8e8e8;
  --red: #e61616;
  --font: "Quicksand", "Segoe UI", "Helvetica Neue", sans-serif;
  --bold: 700;
  --regular: 500;
  --light: 300;
  --border-black: 3px solid black;
  --border-purple: 5px solid var(--purple);
  --radius: 3px;
  --light-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  --veil-bg :  #00000096;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-sm: 1rem;
  --space-xs: 0.5rem;
  --space-xl: 2.5rem;
  --pattern: ${patern};

}

html{
  font-size:16px;
  background-color: var(--white);
}
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}

 /* Scrollbar Styles */
 body::-webkit-scrollbar , ul::-webkit-scrollbar {
    width: 12px;

  }
  html, ul {
    scrollbar-width: thin;
    scrollbar-color: var(--purple) ;
  }
  body::-webkit-scrollbar-track, ul::-webkit-scrollbar-track {
    background: var(--white);
  }
  body::-webkit-scrollbar-thumb, ul::-webkit-scrollbar-thumb {
    background-color: var(--purple) ;
    border-radius: 6px;
    border: 3px solid var(--white);
  }
 :any-link{
   text-decoration:none;
 }
`;

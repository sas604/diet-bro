import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

:root {
  --dark-purple: #9163f2;
  --purple: #8480f2;
  --blue: #30a8f2;
  --blue-green: #32bad9;
  --green: #48d9ca;
  --dark-green: #3fbbaf;
  --white: #fcfcfc;
  --gray: #eeebfc;
  --red: #e61616;
  --font: "Quicksand", "Segoe UI", "Helvetica Neue", sans-serif;
  --bold: 700;
  --regular: 500;
  --light: 300;
  --border-black: 3px solid black;
  --border-purple: 5px solid var(--purple);
  --radius: 3px;
  --light-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.53);
}

html{
  font-size:16px;
}

 /* Scrollbar Styles */
 body::-webkit-scrollbar {
    width: 12px;
  }
  html {
    scrollbar-width: thin;
    scrollbar-color: var(--purple) var(--white);
  }
  body::-webkit-scrollbar-track {
    background: var(--white);
  }
  body::-webkit-scrollbar-thumb {
    background-color: var(--purple) ;
    border-radius: 6px;
    border: 3px solid var(--white);
  }
 :any-link{
   text-decoration:none;
 }
`;

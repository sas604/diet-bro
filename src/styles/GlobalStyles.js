import { useSelector } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import patern from '../img/pattern';

export function GlobalStylesHOC() {
  const { theme } = useSelector((state) => state);
  return <GlobalStyles theme={theme} />;
}
export const GlobalStyles = createGlobalStyle`
html {
  --dark-purple: #9163f2 ;
  --bg-primary: ${({ theme }) =>
    theme === 'light' ? 'var(--white)' : '#202124'};
  --bg-secondary: ${({ theme }) =>
    theme === 'light' ? 'var(--white)' : '#292a2d'};
  --purple: #8480f2;
  --blue: #30a8f2;
  --blue-green:${({ theme }) => (theme === 'light' ? '#32bad9 ' : '#21778a')};  
  --green:${({ theme }) => (theme === 'light' ? '#48d9ca ' : '#2a8a80')}; 
  --dark-green: #3fbbaf;
  --white: #fcfcfc;
  --gray:${({ theme }) => (theme === 'light' ? '#e8e8e8 ' : '#3a3a3a')};  ;
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
  --pater-color: ${({ theme }) =>
    theme === 'light' ? 'var(--white)' : '#202124'};
  --text-primary: ${({ theme }) =>
    theme === 'light' ? 'black' : 'var(--white)'};
    transition: all 0.3s;
}

html{
  font-size:16px;
  background-color: var(--bg-primary);
  color: var(--text-primary);
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
  input:-webkit-autofill {
    -webkit-box-shadow:0 0 0 50px var(--bg-primary) inset; /* Change the color to your own background color */
    box-shadow:0 0 0 50px var(--bg-primary) inset; 
    -webkit-text-fill-color: var(--text-primary);
  }
  input, select {
    color: var(--text-primary);
    color-scheme: ${({ theme }) => theme} ;
  }
 :any-link{
   text-decoration:none;

 }
`;

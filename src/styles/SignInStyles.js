import styled from 'styled-components';

export const LandingStyles = styled.div`
  background-color: var(--bg-primary);
  background-image: var(--pattern);
  overflow: hidden;
  height: 100vh;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    height: 60vh;
    width: 100%;
    display: block;
    background: #8480f2;
    background: linear-gradient(16deg, #8480f2, #48d9ca);
    bottom: -30%;
    left: 0;
    transform: rotate(-15deg);
    transform: skewY(-15deg);
  }
  padding: 5rem 0;
  h1 {
    max-width: 400px;
    margin: 0 auto;
  }
`;
export const SignIn = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  * + * {
    margin-top: 1rem;
  }
  border: 5px solid var(--purple);
  border-radius: 3px;
  padding: 2rem 3rem;
  background-color: var(--bg-secondary);
  position: relative;
  z-index: 1;
  max-width: 400px;
  margin: 1.5rem auto;
`;

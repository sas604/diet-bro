import styled from 'styled-components';

export const ButtonStyle = styled.button`
  border-radius: 3px;
  border: none;
  font-weight: 600;
  text-transform: uppercase;
  background-color: var(--purple);
  color: var(--white);
  padding: 0.8em;
  cursor: pointer;
  appearance: none;
  &:hover,
  &:focus {
    transform: scale(1.05);
    background-color: var(--dark-purple);
  }
`;

const CardStyles = styled.div`
  position: relative;
  background: var(--white);
  padding: 2rem 1.5rem;
  border-radius: 5px;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
  box-shadow: var(--light-shadow);
  @media (max-width: 700px) {
    padding: 1rem;
  }
`;

export const DisplayStyles = styled(CardStyles)`
  box-shadow: var(--light-shadow);
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  position: relative;

  .progress {
    display: flex;
    flex-direction: column;
    font-weight: 400;
    font-size: clamp(1rem, 2vw, 18px);

    grid-row: 1;
    grid-column: 1/-1;
    align-self: center;
    align-items: center;
  }
  .number {
    font-weight: 800;
    font-size: clamp(2rem, 4vw, 40px);
    color: var(--dark-purple);
  }
  p {
    margin: 0;
    text-align: center;
  }

  .number-small {
    font-weight: 600;
    font-size: clamp(1.3rem, 3vw, 1.8rem);
  }
  a {
    grid-column: span 2;
    justify-content: center;
    position: relative;
    display: flex;
    align-items: center;
    font-weight: 600;
    text-transform: uppercase;
    border-radius: 3px;
    background-color: var(--green);
    color: var(--white);
    font-size: 1.3rem;
    font-size: clamp(1rem, 3vw, 1.3rem);
    margin-top: 0.5rem;
    padding: 0.5em;
    align-self: center;
    &:hover,
    &:focus {
      transform: scale(1.05);
      background-color: var(--blue-green);
    }
  }
  .icon {
    margin-right: 0.5rem;
  }
`;

export const TabsStyle = styled.div`
  display: flex;
  background: var(--gray);

  border-radius: 3px;
  margin-bottom: 1rem;
  [type='radio'] {
    display: none;
  }

  label {
    text-align: center;
    flex: 1;
    cursor: pointer;
    padding: 0.7em;
    border-radius: 3px;
    font-weight: 600;
  }
  [type='radio']:checked + label {
    background: var(--purple);
    border-bottom: 1px solid white;
    color: var(--white);
    z-index: 2;
  }
`;

export default CardStyles;

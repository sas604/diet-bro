import styled from "styled-components";

const CardStyles = styled.div`
  border-radius: 5px;
  box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.2);
`;

export const DisplayStyles = styled.div`
  border-radius: 5px;
  box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  position: relative;

  .progress {
    display: flex;
    flex-direction: column;
    font-weight: 400;
    font-size: clamp(0.5rem, 2vw, 20px);

    grid-row: 1;
    grid-column: 1/-1;
    align-self: center;
    align-items: center;
  }
  .number {
    font-weight: 800;
    font-size: clamp(1.5rem, 4vw, 40px);
    color: var(--dark-purple);
  }
  p {
    margin: 0;
    text-align: center;
  }

  .number-small {
    font-weight: 800;
    font-size: clamp(1rem, 3vw, 3rem);
  }
  a {
    grid-column: span 2;
    justify-content: center;
    position: relative;
    display: flex;
    align-items: center;
    width: 70%;
    font-weight: 600;
    text-transform: uppercase;
    border-radius: 5px;
    background-color: var(--green);
    color: var(--white);
    font-size: 1.3rem;
    margin-top: 0.5rem;
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

export default CardStyles;

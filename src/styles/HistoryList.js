import styled from "styled-components";
import CardStyles from "./CardStyles";

const HistoryListStyles = styled(CardStyles)`
  * {
    margin: 0;
  }

  h3 {
    margin-bottom: 1em;
  }
  ul {
    max-height: 360px;
    padding: 0;
    margin: 0;
    overflow-y: auto;
  }

  li {
    display: flex;
    font-weight: 600;
    padding: 1em 0;
    align-items: center;
  }

  li + li {
    border-top: 3px solid var(--gray);
  }
  .icon {
    margin-right: 1rem;
  }
  p + p {
    font-size: 1.3rem;
    color: var(--dark-purple);
  }
  .number {
    font-size: 1.2em;
  }
  button {
    margin-left: auto;
    appearance: none;
    -webkit-appearance: none;
    background-color: transparent;
    border: none;
    font-size: 1.3rem;
    font-weight: 600;
    &:hover,
    &:focus {
      color: var(--red);
      cursor: pointer;
    }
  }
`;
export default HistoryListStyles;

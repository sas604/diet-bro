import { Link } from 'react-router-dom';
import { TiArrowLeftThick } from 'react-icons/ti';
import styled from 'styled-components';

const BackbuttonStyles = styled(Link)`
  padding: var(--space-md) 0 0 0;
  display: inline-block;
`;

export default function BackButton({ text, route }) {
  return (
    <BackbuttonStyles to={route ? route : -1}>
      <TiArrowLeftThick /> {text ? text : 'Back'}
    </BackbuttonStyles>
  );
}

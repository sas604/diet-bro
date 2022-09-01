import styled from 'styled-components';

const TitleStyle = styled.h2`
  margin: var(--space-md) 0;
`;

export const Title = ({ title }) => (
  <TitleStyle data-testid="title">{title}</TitleStyle>
);

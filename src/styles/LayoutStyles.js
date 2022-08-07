import styled from 'styled-components';

export const LayoutStyles = styled.div`
  margin: var(--space-md) 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  > * {
    flex: 1;
  }
  @media (min-width: 700px) {
    flex-direction: row;
  }
`;

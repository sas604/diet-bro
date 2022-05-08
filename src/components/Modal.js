import FocusTrap from 'focus-trap-react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const ModalVeilStyles = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: var(--veil-bg);
  padding: 2rem;
`;
const ModalBodyStyles = styled.div`
  max-width: 60rem;
  margin: 0 auto;
  height: 30rem;
  background-color: white;
  width: 100%;
  padding: var(--space-md);
`;
function ModalBody({ children }) {
  return (
    <ModalVeilStyles>
      <FocusTrap>
        <ModalBodyStyles>{children}</ModalBodyStyles>
      </FocusTrap>
    </ModalVeilStyles>
  );
}

export const Modal = ({ children }) =>
  createPortal(
    <ModalBody children={children} />,
    document.getElementById('modal-parent')
  );

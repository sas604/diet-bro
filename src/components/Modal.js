import FocusTrap from 'focus-trap-react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { CloseModalBtn } from '../styles/CloseModalBtn';
import { TiTimes } from 'react-icons/ti';

const ModalVeilStyles = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: var(--veil-bg);
  padding: var(--space-lg);
`;
const ModalBodyStyles = styled.div`
  max-width: 60rem;
  margin: 0 auto;
  height: 30rem;
  background-color: white;
  width: 100%;
  padding: var(--space-md);
`;

function ModalBody({ children, closeModal }) {
  return (
    <ModalVeilStyles>
      <FocusTrap>
        <ModalBodyStyles>
          <CloseModalBtn className="modal-btn-close" onClick={closeModal}>
            <TiTimes />
          </CloseModalBtn>
          {children}
        </ModalBodyStyles>
      </FocusTrap>
    </ModalVeilStyles>
  );
}

export const Modal = ({ children, closeModal }) =>
  createPortal(
    <ModalBody children={children} closeModal={closeModal} />,
    document.getElementById('modal-parent')
  );

import styled from "styled-components";
import CardStyles from "../styles/CardStyles";

const ToastWrapper = styled.div`
  border-radius: 5px;
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #00000080;
  width: 100%;
  height: 100%;
  z-index: 99;
`;
const ToastStyle = styled(CardStyles)`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: green;
  width: 100px;
  height: 100px;
  font-size: 3rem;
  z-index: 100;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -30%);
  opacity: 0;
  animation: reveal 200ms ease-out forwards;

  span {
    margin: 0;
    font-size: 0.8rem;
  }
  .check {
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 220;
    stroke-dashoffset: 660;
    animation: 250ms ease-out 200ms dash forwards;
  }
  @keyframes dash {
    to {
      stroke-dashoffset: 440;
    }
  }

  @keyframes reveal {
    from {
      opacity: 0;
      transform: translate(-50%, 10%);
    }
    to {
      opacity: 100%;
      transform: translate(-50%, -30%);
    }
  }
  @keyframes hide {
    from {
      opacity: 100%;
    }
    to {
      opacity: 0;
    }
  }
`;
export default function PopUp() {
  return (
    <ToastWrapper>
      <ToastStyle>
        <div>
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="7"
            viewBox="0 0 80.35 60"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline className="check" points="2.5 28 30.85 57.5 77.85 2.5" />
          </svg>
        </div>
        <span>Success!</span>
      </ToastStyle>
    </ToastWrapper>
  );
}

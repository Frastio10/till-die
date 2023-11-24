import styled from "styled-components";

interface SpinnerProps {
  spinnerColor: string;
  borderWidth: number;
  trackColor: string;
  size: number;
}
const Spinner = styled.div<SpinnerProps>`
  border: ${(props) => props.borderWidth}px solid ${(props) => props.trackColor};
  border-radius: 50%;
  border-top: ${(props) => props.borderWidth}px solid ${(props) => props.spinnerColor};
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  animation: spin 2s linear infinite;
  flex-shrink: 0;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;

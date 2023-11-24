import { keyframes } from "styled-components";

export const colorFillAnimate = (color = "#2a2a2a") => keyframes`
  0% {
    background: transparent;
    border: 1px solid #2a2a2a;;
  }
  
  50% {
    border: 1px solid ${color};
  }

  100% {
    background: ${color};
    border: 1px solid ${color};
  }
`;

export const fadeInAnimate = () => keyframes`
  0% {
    opacity: 0;
  }
  
  100% {
    opacity: 100;
  }
`;

export const ambienceAnimate = keyframes`
  0% {
    transform: rotate(0deg) scale(1.5);
  }
  50% {
    transform: rotate(360deg) scale(3);
  }
  100% {
    transform: rotate(720deg) scale(1.5);
  }
`;

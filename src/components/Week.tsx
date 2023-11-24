import React, { memo } from "react";
import styled, { css } from "styled-components";
import {
  ambienceAnimate,
  colorFillAnimate,
  fadeInAnimate,
} from "./keyframes/animations";
import {
  generateBoxShadow,
  getWeekBorderColor,
  getWeekSquareColor,
} from "@/utils/styles";
import { BASE_FILL_ANIMATION_DELAY } from "@/config/contants";
import { EventData } from "@/types";

interface WeekProps {
  isFill: boolean;
  event?: EventData;
  children?: React.ReactNode;
  index: number;
  popupWindow: number | null;
  onClickEvent: (event: EventData | null) => void;
}

const AMBIENCE_SIZE = 8;

function Week({
  index,
  isFill,
  event,
  children,
  popupWindow,
  onClickEvent,
}: WeekProps) {
  console.log('up week')
  return (
    <Wrapper>
      {event && (
        <Ambience
          style={{
            cursor: event ? "pointer" : "auto",
            animationDelay: `${0.003 * index}s`,
          }}
          color={event.event.color}
          onClick={() => onClickEvent(event)}
        />
      )}
      <Box
        index={index}
        isFill={isFill}
        event={event}
        popupWindow={popupWindow}
        onClickEvent={() => onClickEvent(event || null)}
        style={{
          animationDelay: `${BASE_FILL_ANIMATION_DELAY * index}s, ${
            0.003 * index
          }s`,
        }}
      >
        {children}
      </Box>
    </Wrapper>
  );
}

const WeekMemo = memo(
  Week,
  (oldProps, newProps) =>
    oldProps.isFill === newProps.isFill &&
    oldProps.popupWindow === newProps.popupWindow,
);
WeekMemo.displayName = "Week";
export default WeekMemo;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
`;

export const Ambience = styled.div<{ color: string }>`
  position: absolute;
  z-index: 2;

  transition: 0.3s ease-in all;

  width: ${AMBIENCE_SIZE}px;
  height: ${AMBIENCE_SIZE}px;

  &:hover {
    width: ${AMBIENCE_SIZE * 2}px;
    height: ${AMBIENCE_SIZE * 2}px;
  }

  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0.2) 0%,
    ${({ color }) => color} ${AMBIENCE_SIZE}px
  );

  opacity: 0;

  animation-name: ${fadeInAnimate}, ${ambienceAnimate};
  animation-duration: 3s;
  animation-timing-function: linear;
  animation-iteration-count: 1, infinite;
  animation-fill-mode: forwards;
`;

export const Box = styled.span<WeekProps>`
  display: flex;
  width: 4px;
  height: 4px;
  flex-shrink: 0;

  box-shadow: ${({ event }) => generateBoxShadow(event?.event.color) || "none"};

  animation-name: ${({ isFill, popupWindow, event }) =>
    !popupWindow && isFill && !event
      ? colorFillAnimate()
      : event
      ? css`
          ${isFill ? colorFillAnimate() : "none"}, ${colorFillAnimate(
            event.event.color,
          )}
        `
      : "none"};

  animation-duration: 0.1s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;

  border: 1px solid #2a2a2a;

  font-size: 8px;
  color: #fff;
  justify-content: center;
  align-items: center;

  @media only screen and (min-width: 768px) {
    width: 8px;
    height: 8px;
  }
`;

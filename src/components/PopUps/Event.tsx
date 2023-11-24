import { useEvent } from "@/stores";
import { adjust } from "@/utils/math";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";

export default function Event() {
  // const [currentWindow, setCurrentWindow] = useState<number | null>(0);
  const { currentEvent, setCurrentEvent } = useEvent();

  function generateBoxShadow(
    hexColor: string,
    xOffset = 0,
    yOffset = 0,
    blurRadius = 20,
    spreadRadius = 0,
  ) {
    hexColor = hexColor.startsWith("#") ? hexColor.slice(1) : hexColor;
    const boxShadow = `${xOffset}px ${yOffset}px ${blurRadius}px ${spreadRadius}px #${hexColor}`;
    return boxShadow;
  }

  useEffect(() => {
    if (currentEvent !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [currentEvent, setCurrentEvent]);

  return (
    <Wrapper className={currentEvent === null ? "hide" : "show"}>
      <Overlay
        onClick={() => {
          setCurrentEvent(null);
        }}
      />
      {currentEvent && (
        <Inner
          style={{
            backgroundColor: adjust(currentEvent!.event.color, 150),
            boxShadow: generateBoxShadow(currentEvent.event.color),
          }}
        >
          <Title>{currentEvent.event.title}</Title>
          {currentEvent.event.thumbnailUrl && (
            <Image
              src={currentEvent.event.thumbnailUrl}
              width={260}
              height={175}
              alt={currentEvent.event.title}
              style={{ objectFit: "cover" }}
            />
          )}

          <Text>{currentEvent.event.content}</Text>
        </Inner>
      )}
    </Wrapper>
  );
}

const Thumbnail = styled.img`
  width: 100%;
`;

const Text = styled.p`
  font-size: 14px;
  text-align: center;
  margin-top: 16px;
  /* text-align: center; */
`;

const Title = styled.p`
  font-size: 16px;
  text-align: center;
  font-weight: 500;
  margin-bottom: 16px;
  letter-spacing: 3px;
`;

const Inner = styled.div`
  background: white;
  padding: 20px;
  width: 300px;
  height: 350px;
  z-index: 1;
`;

const Overlay = styled.div`
  cursor: pointer;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  /* filter: blur(20px); */
  /* filter: alpha(opacity = 50); */
`;

const Window = styled.div`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  transition: 0.5s ease-in all;
  position: fixed;
  display: flex;
  top: 0;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  /* background: rgba(0, 0, 0, 0.5); */
  z-index: 99999;
`;

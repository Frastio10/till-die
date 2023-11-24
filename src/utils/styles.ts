import { EventData } from "@/types";

export function generateBoxShadow(
  hexColor?: string,
  xOffset = 4,
  yOffset = 4,
  blurRadius = 8,
  spreadRadius = 0,
) {
  if (!hexColor) return undefined;
  hexColor = hexColor.startsWith("#") ? hexColor.slice(1) : hexColor;
  const boxShadow = `${xOffset}px ${yOffset}px ${blurRadius}px ${spreadRadius}px #${hexColor}`;
  return boxShadow;
}

export const getWeekBorderColor = (isFill: boolean, event?: EventData) => {
  if (event) return event.event.color || "white";
  // if (isFill) return "transparent";

  return "#2a2a2a";
};

export const getWeekSquareColor = (isFill: boolean, event?: EventData) => {
  if (event) return event.event.color || "white";
  if (!isFill) return "transparent";

  return "#2a2a2a";
};

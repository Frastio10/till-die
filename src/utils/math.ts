import { WEEKS_IN_YEAR, YEARS_IN_DECADE } from "@/config/contants";

export function roundNearest(num: number, target = 10) {
  return Math.round(num / target) * target;
}

export function adjust(color: string, amount: number) {
  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (color) =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2),
      )
  );
}

export const getWeekIndex = (
  currentDecade: number,
  currentYear: number,
  currentWeek: number,
) => {
  const result =
    currentDecade * (YEARS_IN_DECADE * WEEKS_IN_YEAR) +
    currentYear * WEEKS_IN_YEAR +
    currentWeek +
    1;

  return result;
};

// shit code alert

import moment from "moment";
import React, { useMemo } from "react";
import styled from "styled-components";
import Week from "./Week";
import {
  DAYS_IN_WEEK,
  DAYS_IN_YEAR,
  ROW_YEAR_AMOUNT,
  WEEKS_IN_YEAR,
  YEARS_IN_DECADE,
} from "@/config/contants";
import { useEvent } from "@/stores";

const eventsData = require("../data/events.json");

interface CalendarProps {
  userBirth: string | number;
  expectedAge: number;
  currentPopupWindow: number | null;
}

const Calendar = ({
  userBirth,
  expectedAge,
  currentPopupWindow,
}: CalendarProps) => {
  const birth = moment(new Date(userBirth));
  const now = moment(new Date());

  console.log("ha")

  const { setCurrentEvent } = useEvent();
  const expectedYear = expectedAge;
  const expectedWeeks = (DAYS_IN_YEAR * expectedYear) / DAYS_IN_WEEK; // The expected date in weeks

  const dayAmt = moment.duration(now.diff(birth)).asWeeks();
  const normalizedAmount = Math.ceil(dayAmt);

  const events = useMemo(() => {
    return eventsData.map((event: any) => ({
      ...event,
      weekIndex: Math.round(event.age * WEEKS_IN_YEAR),
    }));
  }, [eventsData]);

  const getEventFromIndex = (weekIndex: number) => {
    const event = events.find(
      (event: any) => event.weekIndex === weekIndex - 1,
    );

    return event;
  };

  const getWeekIndex = (
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

  return (
    <Wrapper>
      {Array(Math.round(expectedWeeks / (WEEKS_IN_YEAR * YEARS_IN_DECADE)))
        .fill("")
        .map((_, decade) => (
          <SectionRow key={decade}>
            {Array(ROW_YEAR_AMOUNT)
              .fill("")
              .map((_, year) => (
                <CalendarSection key={year}>
                  {Array(WEEKS_IN_YEAR)
                    .fill("")
                    .map((_, week) => {
                      const currentWeekIndex = getWeekIndex(decade, year, week);
                      return (
                        <Week
                          key={week}
                          popupWindow={currentPopupWindow}
                          index={currentWeekIndex}
                          isFill={currentWeekIndex < normalizedAmount}
                          event={getEventFromIndex(currentWeekIndex)}
                          onClickEvent={setCurrentEvent}
                        />
                      );
                    })}
                  <Index>
                    {(decade * YEARS_IN_DECADE + year + 1) % 5 === 0
                      ? decade * YEARS_IN_DECADE + year + 1
                      : null}
                  </Index>
                </CalendarSection>
              ))}
          </SectionRow>
        ))}
    </Wrapper>
  );
};

const Index = styled.div`
  text-align: left;
  position: absolute;
  right: -8px;
  margin: 0;
  line-height: 1;
  top: 0;
  font-size: 8px;

  @media only screen and (min-width: 768px) {
    right: -2px;
    font-size: 10px;
    line-height: 1.2;
  }
`;

const CalendarSection = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: 2px;
  margin-bottom: 2px;
  justify-content: center;

  @media only screen and (min-width: 768px) {
    justify-content: center;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 550px;
  margin: 10px 0;
`;

const SectionRow = styled.div`
  margin-bottom: 10px;

  @media only screen and (min-width: 768px) {
    margin-bottom: 20px;
  }
`;

export default Calendar;

// const memo = React.memo(
//   Calendar,
//   (oldProps, newProps) =>
//     oldProps.userBirth === newProps.userBirth ||
//     oldProps.expectedAge === newProps.expectedAge,
// );
// memo.displayName = "Calendar";

// const CalendarRow = styled.div`
//   display: grid;
//   gap: 2px;
//   grid-template-columns: repeat(1, minmax(0, 1fr));
//   margin-bottom: 1.5px;
//   width: 100%;

//   @media only screen and (min-width: 768px) {
//     grid-template-columns: repeat(1, minmax(0, 1fr));
//   }
// `;

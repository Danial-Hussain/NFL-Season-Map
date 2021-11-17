import React from "react";
import {
  StatsDiv,
  StatsItem,
  StatsItemHeader,
  StatsItemBody,
} from "../styles/styles";
import AnimatedNumber from "animated-number-react";

export const Stats = ({ distanceTraveled, pointsPerMi, rank }) => {
  const format1 = (value) => `${Number(value).toFixed(0)}`;
  const format2 = (value) => `${Number(value).toFixed(4)}`;
  return (
    <StatsDiv>
      <StatsItem>
        <StatsItemHeader>Total Distance Traveled</StatsItemHeader>
        <StatsItemBody>
          <AnimatedNumber
            value={distanceTraveled}
            formatValue={format1}
            duration={300}
            delay={10}
            easing="linear"
          />{" "}
          mi
        </StatsItemBody>
      </StatsItem>
      <StatsItem>
        <StatsItemHeader>Points Scored per Mile Traveled</StatsItemHeader>
        <StatsItemBody>
          <AnimatedNumber
            value={Number(pointsPerMi)}
            formatValue={format2}
            duration={300}
            delay={10}
            easing="linear"
          />
        </StatsItemBody>
      </StatsItem>
      <StatsItem>
        <StatsItemHeader>Distance Traveled Rank</StatsItemHeader>
        <StatsItemBody>
          <AnimatedNumber
            value={rank}
            formatValue={format1}
            duration={300}
            delay={10}
            easing="linear"
          />
          {rank == 1
            ? "st"
            : rank == 2
            ? "nd"
            : rank == 3
            ? "rd"
            : rank <= 30
            ? "th"
            : rank == 31
            ? "st"
            : "nd"}
        </StatsItemBody>
      </StatsItem>
    </StatsDiv>
  );
};

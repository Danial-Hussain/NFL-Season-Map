import React, { useState, useEffect } from "react";
import { Map } from "../components/Map/Map";
import { Navbar } from "../components/Navbar";
import { TeamButton } from "../components/TeamButton";
import { Stats } from "../components/Stats";
import { Plot } from "../components/Plot";
import data from "../data/NFL_Teams.json";
import stats from "../data/NFL_Stats.json";
import distance from "../data/NFL_Teams_Distance.json";
import Slider from "@mui/material/Slider";
import {
  TeamButtonComponent,
  TeamButtonWrapper,
  Title,
  SubTitle,
} from "../styles/styles";

export const Home = () => {
  const [theme, setTheme] = useState("osm");
  const [team, setTeam] = useState("ARI");
  const [year, setYear] = useState(2018);
  const [distanceTraveled, setDistanceTraveld] = useState(0);
  const [pointsPerMi, setPointsPerMi] = useState("0");
  const [rank, setRank] = useState(0);
  const [chartOpen, setChartOpen] = useState(false);

  useEffect(() => {
    let points = stats["data"][team]["points"][year];
    let ppm = points / distanceTraveled;
    setPointsPerMi(ppm.toFixed(4));
  }, [distanceTraveled]);

  useEffect(() => {
    let teams = distance["data"][year];
    let sorted = Object.entries(teams).sort(([, d1], [, d2]) => d2 - d1);
    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i][0] == team) {
        setRank(i + 1);
        break;
      }
    }
  }, [distanceTraveled]);

  return (
    <React.Fragment>
      <Navbar themeSwitcher={setTheme} />
      <TeamButtonComponent>
        <TeamButtonWrapper>
          <Title>Select Team and Year</Title>
          <SubTitle>
            Team Selected: {team} | Year Selected: {year}
          </SubTitle>
          <Slider
            aria-label="Year"
            defaultValue={year}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={2015}
            max={2021}
            onChange={(e, val) => setYear(val)}
          />
          {data["teams"].map((d) => {
            return (
              <TeamButton
                teamAbbreviation={d.Team}
                teamColor1={d.Color1}
                teamColor2={d.Color2}
                updateTeam={setTeam}
              />
            );
          })}
          <Stats
            distanceTraveled={distanceTraveled}
            pointsPerMi={pointsPerMi}
            rank={rank}
          />
          <Plot team={team} year={year} />
        </TeamButtonWrapper>
      </TeamButtonComponent>
      <Map
        theme={theme}
        team={team}
        year={year.toString()}
        updateDistance={setDistanceTraveld}
      />
    </React.Fragment>
  );
};

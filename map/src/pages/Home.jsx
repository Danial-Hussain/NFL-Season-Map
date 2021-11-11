import React, { useState } from "react";
import { Map } from "../components/Map/Map";
import { Navbar } from "../components/Navbar";
import { TeamButton } from "../components/TeamButton";
import data from "../data/NFL_Teams_2021.json";
import { TeamButtonComponent, TeamButtonWrapper } from "../styles/styles";

export const Home = () => {
  const [theme, setTheme] = useState("gray-vector");
  return (
    <React.Fragment>
      <Navbar themeSwitcher={setTheme} />
      <TeamButtonComponent>
        <TeamButtonWrapper>
          <h1>National Football League Teams</h1>
          {data["teams"].map((d) => {
            return (
              <TeamButton
                teamAbbreviation={d.Team}
                teamColor1={d.Color1}
                teamColor2={d.Color2}
              />
            );
          })}
        </TeamButtonWrapper>
      </TeamButtonComponent>
      <Map theme={theme} />
    </React.Fragment>
  );
};

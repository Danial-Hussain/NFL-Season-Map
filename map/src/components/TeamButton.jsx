import React from "react";
import { Button } from "../styles/styles";

export const TeamButton = ({
  teamAbbreviation,
  teamColor1,
  teamColor2,
  updateTeam,
}) => {
  return (
    <Button
      color1={teamColor1}
      color2={teamColor2}
      onClick={() => updateTeam(teamAbbreviation)}
    >
      {teamAbbreviation}
    </Button>
  );
};

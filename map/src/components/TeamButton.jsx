import React, { useState } from "react";
import { Button } from "../styles/styles";

export const TeamButton = ({ teamAbbreviation, teamColor1, teamColor2 }) => {
  const [selected, isSelected] = useState(false);
  return (
    <Button
      color1={teamColor1}
      color2={teamColor2}
      selected={selected}
      onClick={() => isSelected(!selected)}
    >
      {teamAbbreviation}
    </Button>
  );
};

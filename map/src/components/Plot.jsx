import React, { useState, useEffect } from "react";
import distance from "../data/NFL_Teams_Distance.json";
import winrate from "../data/NFL_WinRate.json";
import {
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Scatter,
  Label,
  ResponsiveContainer,
} from "recharts";

export const Plot = ({ team, year }) => {
  const [data, setData] = useState([]);

  const getData = (year) => {
    const distance_objects = Object.entries(distance["data"][year]);
    return distance_objects.map((values) => {
      return {
        team: values[0],
        distance: values[1],
        winrate: winrate["data"][values[0]][year],
      };
    });
  };

  useEffect(() => {
    const newdata = getData(year);
    setData(newdata);
  }, [team, year]);

  return (
    <ResponsiveContainer width="99%" height={300}>
      <ScatterChart margin={{ top: 35, right: 35, bottom: 35, left: 35 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          dataKey="distance"
          name="Distance Traveled"
          unit="mi"
        >
          <Label
            value="Total Distance Traveled (Miles)"
            offset={1}
            position="bottom"
          />
        </XAxis>
        <YAxis type="number" dataKey="winrate" name="Win Rate" unit="%">
          <Label value="Win Rate (%)" offset={1} angle={-90} position="left" />
        </YAxis>
        <ZAxis dataKey="team" name="Team" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter
          name="Values"
          data={data.filter((obj) => obj.team !== team)}
          fill="#a5b1c2"
        />
        <Scatter
          name="Values"
          data={data.filter((obj) => obj.team === team)}
          fill="#3742fa"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

import React from "react";
import Icon from "@mdi/react";
import { mdiFootball, mdiGithub } from "@mdi/js";
import { Nav, NavItem, NavButton } from "../styles/styles";

export const Navbar = () => {
  return (
    <Nav>
      <NavButton href="http://www.espn.com/nfl/schedulegrid">
        <Icon path={mdiFootball} title="Football" size={1} color="black" />
        <h1>Data Source</h1>
      </NavButton>
      <NavItem>
        <h1>NFL-Season Map</h1>
      </NavItem>
      <NavButton href="https://github.com/Danial-Hussain/NFL-Season-Map">
        <Icon path={mdiGithub} title="Football" size={1} color="black" />
        <h1>GitHub Repo</h1>
      </NavButton>
    </Nav>
  );
};

import styled from "styled-components";

export const TeamButtonComponent = styled.div`
  margin: auto;
`;

export const TeamButtonWrapper = styled.div`
  display: inline-block;
  flex-wrap: wrap;
  border: 2px solid rgba(238, 238, 238, 0.1);
  border-radius: 25px;
  margin: 20px;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: rgba(223, 230, 233, 0.3);
`;

export const Button = styled.button`
  font-family: "Newsreader", serif;
  height: 2rem;
  width: 3.8rem;
  font-size: 1em;
  font-weight: bold;
  vertical-align: middle;
  text-align: center;
  margin: 0.2em;
  padding: 0.5em;
  cursor: pointer;
  border: 2px solid ${(props) => props.color2};
  border-radius: 20%;
  color: ${(props) => props.color2};
  background-color: ${(props) => props.color1};
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.5);
  }
  &:active {
    transform: scale(1.2);
  }
`;

export const Nav = styled.div`
  background-color: rgba(223, 230, 233, 0.4);
  font-family: "Newsreader", serif;
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  padding-bottom: 20px;
  text-align: center;
`;

export const NavItem = styled.div`
  display: flex 2;
  align-items: center;
  padding: 0 1rem;
  cursor: pointer;
`;

export const NavButton = styled.a`
  color: black;
  font-size: 0.5rem;
  display: flex 1;
  align-items: center;
  padding: 0 1rem;
  cursor: pointer;
  border: 2px solid rgba(45, 52, 54, 1);
  border-radius: 10px;
  text-decoration: none;
  &:hover {
    background-color: rgba(47, 54, 64, 1);
    color: white;
    transition: background-color 300ms ease;
  }
`;

export const StatsDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  padding-top: 2rem;
`;

export const StatsItem = styled.div`
  padding: 5px;
  border: 1px solid #353b48;
  border-radius: 10px;
`;

export const StatsItemHeader = styled.div`
  font-weight: bold;
  padding-bottom: 10px;
`;

export const StatsItemBody = styled.div`
  font-size: 3rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
`;

export const SubTitle = styled.h2`
  color: #60a3bc;
  opacity: 0.8;
`;

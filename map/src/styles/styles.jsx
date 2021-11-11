import styled from "styled-components";

export const TeamButtonComponent = styled.div`
  width: 75%;
  margin: auto;
`;

export const TeamButtonWrapper = styled.div`
  display: inline-block;
  flex-wrap: wrap;
  border: 2px solid gray;
  border-radius: 25px;
  margin: 20px;
  padding: 10px;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: rgba(223, 230, 233, 0.3);
`;

export const Button = styled.button`
  font-family: "Newsreader", serif;
  height: 2rem;
  width: 3rem;
  font-size: 1em;
  font-weight: bold;
  margin: 0.2em;
  padding: 0.5em;
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

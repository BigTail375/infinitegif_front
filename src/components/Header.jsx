import React from "react";
import styled from "styled-components";

const H1 = styled.h1`
  margin: 0;
  padding: 12px;
  background-color: #000;
  color: #fff;
  font-family: sans-serif;
  font-size: 3em;
`;

const Header = ({headerText}) => {
  return (
    <div>
      <H1>{headerText}</H1>
    </div>
  );
};

export default Header;
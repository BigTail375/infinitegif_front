import React from "react";
import styled from "styled-components";

const Btn = styled.a`
  display: flex;
  left: 0;
  right: 0;
  margin: 20px auto;
  margin-top: -20px;
  background-color: #fff;
  color: #000;
  border-radius: 35.5px;
  border: 1px solid #000;
  outline: none;
  font-weight: 700;
  cursor: pointer;
  font-size: 1.2em;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  max-width: 10%;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  :hover {
    background-color: #3f3f3f;
    color: #efefef;
  }
`;

const Ubutton = ({ gif, upload }) => {
  return (
    <Btn onClick={() => upload(gif)}>
      Upload
    </Btn>
  );
};

export default Ubutton;
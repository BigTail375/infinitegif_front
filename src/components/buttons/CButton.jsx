import React from "react";
import styled from "styled-components";

const Btn = styled.button`
  background-color: #fff;
  color: #000;
  border-radius: 35.5px;
  border: 1px solid #000;
  outline: none;
  margin: 10px;
  padding: 5px;
  font-weight: 700;
  cursor: pointer;
  font-size: 1em;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  :hover {
    background-color: #3f3f3f;
    color: #efefef;
  }
`;

const Cbutton = ({isConvert}) => {
  return (
    <div>
      <Btn onClick={() => {
        if (isConvert) {window.location = '/gif';}
        else {window.location = '/';}
      }}>
        {isConvert ? "Convert Video to GIF" : "Browse Images"}
      </Btn>  
    </div>
  );
};

export default Cbutton;
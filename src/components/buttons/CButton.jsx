import React from "react";
import styled from "styled-components";

const Btn = styled.button`
  background-color: #fff;
  color: #000;
  border-radius: 35.5px;
  border: 1px solid #000;
  outline: none;
  margin: 10px;
  padding: 10px;
  font-weight: 700;
  cursor: pointer;
  font-size: 1.2em;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  :hover {
    background-color: #3f3f3f;
    color: #efefef;
  }
`;

const Cbutton = ({buttonType}) => {
  
  return (
    <div>
      <Btn onClick={() => {
        if (buttonType == 1) {window.location = '/gif';}
        else if (buttonType == 2) {window.location = '/recrusive';}
        else {window.location = '/';}
      }}>
        {buttonType == 1 ? "Convert Video to GIF" : ""}
        {buttonType == 2 ? "Convert Image to Recrusive Gif" : ""}
        {buttonType == 3 ? "Browse Images" : ""}
      </Btn>  
    </div>
  );
};

export default Cbutton;
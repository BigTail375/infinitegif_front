import React from "react";
import styled from "styled-components";

const Btn = styled.button`
  padding: 6px 12px;
  font-size: 14px;
  font-weight: bold;
  color: white;
  background-color: #404040; /* Darker gray for buttons */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  min-width: 100px;
  :hover {
    background-color: #149958;
  }
`;

const Cbutton = ({buttonType}) => {
  
  return (
    <div>
      <Btn onClick={() => {
        if (buttonType == 1) {window.location = '/gif';}
        else if (buttonType == 2) {window.location = '/recrusive/1';}
        else if (buttonType == 3) {window.location = '/';}
        else if (buttonType == 4) {window.location = '/audio';}
        else if (buttonType == 6) {window.location = '/recrusive/2'}
        else if (buttonType == 7) {window.location = '/recrusive/3'}
        else if (buttonType == 8) {window.location = '/recrusive/4'}
      }}>
        {buttonType == 1 ? "Video2Gif" : ""}
        {buttonType == 2 ? "Recrusive" : ""}
        {buttonType == 3 ? "All Image" : ""}
        {buttonType == 4 ? "All Audio" : ""}
        {buttonType == 5 ? "New Post" : ""}
        {buttonType == 6 ? "Paint Number" : ""}
        {buttonType == 7 ? "Puzzle" : ""}
        {buttonType == 8 ? "Mosaic" : ""}
      </Btn>  
    </div>
  );
};

export default Cbutton;
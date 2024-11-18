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
  :hover {
    background-color: #149958;
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
        {buttonType == 1 ? "Video2Gif" : ""}
        {buttonType == 2 ? "Image2Recrusive" : ""}
        {buttonType == 3 ? "Browse Image" : ""}
      </Btn>  
    </div>
  );
};

export default Cbutton;
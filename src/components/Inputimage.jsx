import React from "react";
import styled from "styled-components";

const Image = styled.img`
  width: 50%;
  margin: 20px;
  border: 1px dashed #045ca3;
`;

const Inputimage = ({ image }) => {
  return <Image controls width="250" src={URL.createObjectURL(image)} />;
};

export default Inputimage;
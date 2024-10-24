import React from "react";
import styled from "styled-components";

const Video = styled.video`
  width: 50%;
  margin: 20px;
  border: 1px dashed #045ca3;
`;

const Inputvideo = ({ video }) => {
  return <Video controls width="250" src={URL.createObjectURL(video)} />;
};

export default Inputvideo;
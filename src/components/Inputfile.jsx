import React from "react";
import styled from "styled-components";

const Section = styled.div`
  display: flex;
  left: 0;
  right: 0;
  margin: 50px auto;
  width: 50%;
  border: 2px dashed #000;
  border-radius: 18px;
  padding: 10px;
`;

const Inputfile = ({ setVideo }) => {
  return (
    <Section>
      <input type="file" onChange={(e) => setVideo(e.target.files?.item(0))} />
    </Section>
  );
};

export default Inputfile;
import styled from "styled-components";

const Container = styled.div`
  width: 300px;
  height: 300px;
  margin: 1em auto;
  display: grid;
  grid-template-rows: 100px 100px 100px;
  grid-template-columns: 100px 100px 100px;
  border: 1px solid gray;
`;

export default Container;
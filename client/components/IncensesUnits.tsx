import styled from "styled-components";

export const IncensesEntries = styled.div`
  width: 100%;
`;

export const IncenseEntry = styled.div`
  width: 100%;
  height: 5em;
  display: grid;
  grid-template-columns: 1fr 2fr 3fr 3fr 2fr 1fr;
  &:nth-child(even) {
    background-color: aliceblue;
  }
`;

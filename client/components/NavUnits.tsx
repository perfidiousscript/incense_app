import styled from "styled-components";

export const NavTopUnit = styled.div`
  border: 1px solid black;
  grid-row: span 1;
  text-align: center;
  line-height: 4.5em;
  background: white;
  &:hover {
    z-index: 1;
    box-shadow: 2px 2px 2px 2px black;
  }
`;

export const NavDropDownUnit = styled.div`
  border: 1px solid black;
  grid-row: span 1;
  background: white;
  text-align: center;
  line-height: 4.5em;
  position: relative;
  align-self: stretch;
  &:hover {
    z-index: 1;
    box-shadow: 2px 2px 2px 2px black;
  }
`;

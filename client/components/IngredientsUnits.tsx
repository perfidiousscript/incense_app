import styled from "styled-components";

export const IngredientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(auto-fill, 120px);
  grid-row-gap: 0.5em;
  grid-column-gap: 1em;
`;

export const IngredientEntry = styled.div`
  border: 1px solid black;
  text-align: center;
  padding-top: 21%;
  &:hover {
    z-index: 1;
    box-shadow: 2px 2px 2px 2px black;
  }
`;

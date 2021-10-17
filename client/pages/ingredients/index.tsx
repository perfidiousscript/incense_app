import { NextPageContext, NextPage } from "next";

import App from "components/App";
import Head from "next/head";
import Ingredients from "/lib/api/ingredients";
import { useQuery } from "react-query";

const IngredientsIndex: NextPage<{}> = () => {
  const { isLoading, isError, data, error } = useQuery(
    "ingredients",
    Ingredients.list
  );

  function ingredientsFetch() {
    if (isLoading) {
      return <span>Loading...</span>;
    }

    if (isError) {
      return <span>Error: {error.message}</span>;
    }

    if (data) {
      return (
        <ul>
          {data.map((ingredient) => (
            <div key={ingredient.id}>
              <p>{ingredient.name}</p>
              <p>{ingredient.id}</p>
              <p>{ingredient.description}</p>
              <br />
            </div>
          ))}
        </ul>
      );
    }
  }

  return (
    <App title={"Ingredients"}>
      <div>
        <div>
          <p>Ingredients</p>
          <div>{ingredientsFetch()}</div>
        </div>
      </div>
    </App>
  );
};

export default IngredientsIndex;

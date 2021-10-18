import { NextPageContext, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import App from "components/App";
import Head from "next/head";
import Ingredients from "/lib/api/ingredients";
import { useQuery } from "react-query";

type InitialProps = {
  ingredient: Ingredient;
};

const IngredientShow: NextPage<InitialProps> = ({ ingredient }) => {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, isError, data, error } = useQuery(
    ["ingredient", id],
    Ingredients.get
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error}</span>;
  }

  return (
    <App title={data.name}>
      <div>
        <div>
          <p>Ingredient</p>
          <ul>
            {
              <div key={data.id}>
                <p>{data.name}</p>
                <p>{data.description}</p>
              </div>
            }
          </ul>
        </div>
      </div>
    </App>
  );
};

export default IngredientShow;

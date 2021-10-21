import { NextPage } from "next";
import Link from "next/link";
import App from "components/App";
import Ingredients from "/lib/api/ingredients";
import { IngredientsGrid, IngredientEntry } from "/components/IngredientsUnits";
import { useQuery } from "react-query";

const IngredientsIndex: NextPage<Record<string, never>> = () => {
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
      return data.map((ingredient) => {
        return (
          <Link href={`/ingredients/${ingredient.slug}`}>
            <IngredientEntry>{ingredient.name}</IngredientEntry>
          </Link>
        );
      });
    }
  }

  return (
    <App title={"Ingredients"}>
      <div>
        <div>
          <div className="pageTitle">Ingredients</div>
          <IngredientsGrid>{ingredientsFetch()}</IngredientsGrid>
        </div>
      </div>
    </App>
  );
};

export default IngredientsIndex;

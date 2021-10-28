import { NextPage } from "next";
import Link from "next/link";
import App from "components/App";
import RequestWrapper from "components/RequestWrapper";
import Ingredients from "lib/api/ingredients";
import { Ingredient, MutationError } from "types";
import { IngredientsGrid, IngredientEntry } from "components/IngredientsUnits";
import { useQuery } from "react-query";

const IngredientsIndex: NextPage<Record<string, never>> = () => {
  const {
    isLoading,
    isError,
    data,
    error,
  }: {
    isLoading: boolean;
    isError: boolean;
    data: Ingredient[] | undefined;
    error: MutationError | null;
  } = useQuery("ingredients", Ingredients.list);

  function ingredientsFetch() {
    if (data) {
      return data.map((ingredient) => {
        return (
          <Link href={`/ingredients/${ingredient.slug}`}>
            <IngredientEntry>{ingredient.name}</IngredientEntry>
          </Link>
        );
      });
    } else {
      return (
        <RequestWrapper isLoading={isLoading} isError={isError} error={error} />
      );
    }
  }

  return (
    <App title={"Ingredients"}>
      <div className="pageTitle">Ingredients</div>
      <IngredientsGrid>{ingredientsFetch()}</IngredientsGrid>
    </App>
  );
};

export default IngredientsIndex;

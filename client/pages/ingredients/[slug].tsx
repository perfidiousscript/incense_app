import { NextPage } from "next";
import { useRouter } from "next/router";
import App from "components/App";
import Ingredients from "lib/api/ingredients";
import { Ingredient, MutationError } from "types";
import RequestWrapper from "components/RequestWrapper";
import { useQuery } from "react-query";

// Make this a server rendered page
const IngredientShow: NextPage<Record<string, never>> = () => {
  const router = useRouter();
  const { slug } = router.query;

  const {
    isLoading,
    isError,
    data,
    error,
  }: {
    isLoading: boolean;
    isError: boolean;
    data: Ingredient | undefined;
    error: MutationError | null;
  } = useQuery(["ingredient", slug], Ingredients.get);

  if (data) {
    return (
      <App title={data.name}>
        <p className="pageTitle">{data.name}</p>
        <p>{data.description}</p>
      </App>
    );
  } else {
    return (
      <RequestWrapper isLoading={isLoading} isError={isError} error={error} />
    );
  }
};

export default IngredientShow;

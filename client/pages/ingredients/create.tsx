import { NextPage } from "next";
import Link from "next/link";
import { BaseSyntheticEvent, useState } from "react";
import { useMutation } from "react-query";
import Ingredients from "lib/api/ingredients";
import App from "components/App";
import { Ingredient, MutationError } from "types";
import RequestWrapper from "components/RequestWrapper";

const IngredientCreate: NextPage<Record<string, never>> = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const createIngredient = useMutation<Ingredient, MutationError>(() => {
    return Ingredients.create({
      name: name,
      description: description,
      image_url: imageUrl,
    });
  });

  const submit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    createIngredient.mutate();
  };

  function invalidForm() {
    return name.length === 0 || description.length === 0;
  }

  // Pull this out into an Error component.
  function createIngredientBody() {
    let {
      isSuccess,
      isIdle,
      isLoading,
      isError,
      error,
      data,
    } = createIngredient;
    if (isSuccess && data) {
      return (
        <div className="centeredText">
          <div>Success! {data.name} has been created</div>
          <div>
            See the new ingredient{" "}
            <Link href={`/ingredients/${data.slug}`}>Here</Link>
          </div>
        </div>
      );
    } else if (isIdle) {
      return (
        <div className="generalForm">
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "500px",
            }}
            onSubmit={submit}
          >
            <label htmlFor="name">Name</label>
            <input
              name="name"
              onChange={({ target: { value } }) => setName(value)}
              type="text"
              disabled={createIngredient.isLoading}
              value={name}
            />
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              onChange={({ target: { value } }) => setDescription(value)}
              disabled={createIngredient.isLoading}
              value={description}
            />
            <label htmlFor="image">Image</label>
            <input
              name="ingredient[image]"
              type="file"
              accept="img/png, img/jpeg"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={invalidForm() || createIngredient.isLoading}
            >
              Create
            </button>
          </form>
        </div>
      );
    } else {
      return (
        <RequestWrapper isLoading={isLoading} isError={isError} error={error} />
      );
    }
  }

  return (
    <App authCheck={true} modOnly={true} title="Ingredient:Create">
      <div className="pageTitle">Ingredient Create</div>
      {createIngredientBody()}
    </App>
  );
};

export default IngredientCreate;

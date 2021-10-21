import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { useMutation } from "react-query";
import Ingredients from "/lib/api/ingredients";
import App from "components/App";

const IngredientCreate: NextPage<Record<string, never>> = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const createIngredient = useMutation(() => {
    return Ingredients.create({
      name: name,
      description: description,
      image_url: imageUrl,
    });
  });

  const submit = (event) => {
    event.preventDefault();
    createIngredient.mutate();
  };

  function expandErrorReason(errorParams) {
    let reasonHtml = [];
    if (errorParams !== null) {
      reasonHtml = Object.entries(errorParams).map(([key, value]) => (
        <>
          <span>{key}: </span>
          <span>{value}</span>
        </>
      ));
    }
    return reasonHtml;
  }

  function invalidForm() {
    return name.length === 0 || description.length === 0;
  }

  // Pull this out into an Error component.
  function createIngredientBody() {
    if (createIngredient.isLoading) {
      return <div>Creating Ingredient, Please Wait</div>;
    } else if (createIngredient.isError) {
      const error = createIngredient.error.body.error;
      const errorDetail = error.detail;

      return (
        <div className="centeredText">
          <div>Error: {errorDetail}</div>
          {expandErrorReason(error.params)}
        </div>
      );
    } else if (createIngredient.isSuccess) {
      const { data } = createIngredient;
      return (
        <div className="centeredText">
          <div>Success! {data.name} has been created</div>
          <div>
            See the new ingredient{" "}
            <Link href={`/ingredients/${data.slug}`}>Here</Link>
          </div>
        </div>
      );
    } else {
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
              type="text"
              disabled={createIngredient.isLoading}
              value={description}
            />
            <label htmlFor="imageUrl">Image</label>
            <input
              name="imageUrl"
              onChange={({ target: { value } }) => setImageUrl(value)}
              type="file"
              accept="img/*"
              disabled={createIngredient.isLoading}
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
    }
  }

  return (
    <App authCheck="true" modOnly="true" title="Ingredient:Create">
      <div className="pageTitle">Ingredient Create</div>
      {createIngredientBody()}
    </App>
  );
};

export default IngredientCreate;

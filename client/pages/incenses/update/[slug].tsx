import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import App from "components/App";
import Link from "next/link";
import Incenses from "/lib/api/incenses";
import Ingredients from "/lib/api/ingredients";
import { useAuth } from "lib/auth";
import { useMutation, useQuery } from "react-query";

const IncenseUpdate: NextPage<Record<string, never>> = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { slug } = router.query;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ingredientIds, setIngredientIds] = useState([]);

  const { isLoading, isError, data, error } = useQuery(
    ["incense", slug],
    Incenses.get
  );

  useEffect(() => {
    if (data) {
      setName(data.name);
      setDescription(data.description);
      setImageUrl(data.imageUrl);
      setIngredientIds(data.ingredients.map((i) => i.id));
    }
  }, [data]);

  const updateIncense = useMutation(() => {
    return Incenses.update({
      name: name,
      description: description,
      image_url: imageUrl,
      ingredient_ids: ingredientIds,
      slug: slug,
    });
  });

  const submit = (event) => {
    event.preventDefault();
    updateIncense.mutate();
  };

  const listIngredients = useQuery("ingredients", Ingredients.list);

  function invalidForm() {
    return name.length === 0 || description.length === 0;
  }

  function handleCheckBox({ target }) {
    const currentId = event.target.id;
    if (target.checked) {
      setIngredientIds((old) => [...old, currentId]);
    } else {
      setIngredientIds((old) => {
        return old.filter((item) => item !== currentId);
      });
    }
  }

  function ingredientPresent(boxId) {
    return ingredientIds.filter((id) => id === boxId).length === 1;
  }

  function generateIngredientBoxes() {
    const ingredientsBoxes = [];
    if (listIngredients.data && ingredientIds) {
      listIngredients.data.map((ingredient, index) => {
        if (index > 0 && index % 4 === 0) {
          ingredientsBoxes.push(<br />);
        }
        ingredientsBoxes.push(
          <span key={ingredient.id}>
            <input
              type="checkbox"
              name={ingredient.name}
              id={ingredient.id}
              onChange={handleCheckBox}
              checked={ingredientPresent(ingredient.id)}
            />
            <label htmlFor={ingredient.name}>{ingredient.name}</label>
          </span>
        );
      });
    }
    return ingredientsBoxes;
  }

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

  function userNotice() {
    if (user) {
      if (user.role === "user") {
        return (
          <div>
            Please note that Incenses must be approved by a moderator before
            they are visible. This may take 24-48 hours.
          </div>
        );
      }
    }
  }

  function createIncenseBody() {
    if (isLoading) {
      return <div>Creating</div>;
    } else if (isError) {
      const errorDetail = error.detail;

      return (
        <div className="centeredText">
          <div>Error: {errorDetail}</div>
          {expandErrorReason(error.body.error.params)}
        </div>
      );
    } else if (isSuccess) {
      return (
        <div className="centeredText">
          <div>Success! {updateIncense.data.name} has been created</div>
          <div>
            See your new incense{" "}
            <Link href={`/incenses/${updateIncense.data.slug}`}>Here</Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className="generalForm">
          {userNotice()}
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "500px",
            }}
            onSubmit={submit}
          >
            <label htmlFor="name">Incense Name</label>
            <input
              name="incense"
              onChange={({ target: { value } }) => setName(value)}
              type="text"
              disabled={updateIncense.isLoading}
              value={name}
            />
            <fieldset>
              <legend>Ingredients</legend>
              {generateIngredientBoxes()}
            </fieldset>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              onChange={({ target: { value } }) => setDescription(value)}
              type="text"
              disabled={updateIncense.isLoading}
              value={description}
            />
            <label htmlFor="imageUrl">Image</label>
            <input
              name="imageUrl"
              onChange={({ target: { value } }) => setImageUrl(value)}
              type="file"
              accept="img/*"
              disabled={updateIncense.isLoading}
            />
            <button
              type="submit"
              disabled={invalidForm() || updateIncense.isLoading}
            >
              Update
            </button>
          </form>
        </div>
      );
    }
  }

  return (
    <App authCheck="true" title="Incense:Create">
      <div className="pageTitle">Create a New Incense</div>
      {createIncenseBody()}
    </App>
  );
};

export default IncenseUpdate;

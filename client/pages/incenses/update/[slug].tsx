import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect, BaseSyntheticEvent } from "react";
import App from "components/App";
import IngredientsPicker from "components/IngredientsPicker";
import RequestWrapper from "components/RequestWrapper";
import Link from "next/link";
import Incenses from "lib/api/incenses";
import Ingredients from "lib/api/ingredients";
import { Incense, MutationError } from "types";
import { useAuth } from "lib/auth";
import { useMutation, useQuery } from "react-query";

const IncenseUpdate: NextPage<Record<string, never>> = () => {
  const { user } = useAuth();
  const router = useRouter();
  const slug = router.query.slug as string;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ingredientIds, setIngredientIds] = useState<string[]>([]);

  const { isLoading, isError, data, error } = useQuery(
    ["incense", slug],
    Incenses.get
  );

  useEffect(() => {
    if (data) {
      setName(data.name);
      setDescription(data.description);
      setImageUrl(data.imageUrl);
      if (data.ingredients) {
        setIngredientIds(data.ingredients.map((i) => i.id));
      }
    }
  }, [data]);

  const updateIncense = useMutation<Incense, MutationError>(() => {
    return Incenses.update({
      description: description,
      image_url: imageUrl,
      ingredient_ids: ingredientIds,
      slug: slug,
    });
  });

  const submit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    updateIncense.mutate();
  };

  const listIngredients = useQuery("ingredients", Ingredients.list);

  function invalidForm() {
    return name.length === 0 || description.length === 0;
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
    if (updateIncense.isSuccess) {
      return (
        <div className="centeredText">
          <div>Success! {updateIncense.data.name} has been created</div>
          <div>
            See your new incense{" "}
            <Link href={`/incenses/${updateIncense.data.slug}`}>Here</Link>
          </div>
        </div>
      );
    } else if (updateIncense.isIdle) {
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
            <IngredientsPicker
              title="ingredients"
              setIngredientIds={setIngredientIds}
              ingredientIds={ingredientIds}
            />
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              onChange={({ target: { value } }) => setDescription(value)}
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
    } else {
      let { isLoading, isError, error } = updateIncense;
      return (
        <RequestWrapper isLoading={isLoading} isError={isError} error={error} />
      );
    }
  }

  return (
    <App authCheck={true} title="Incense:Create">
      <div className="pageTitle">Create a New Incense</div>
      {createIncenseBody()}
    </App>
  );
};

export default IncenseUpdate;

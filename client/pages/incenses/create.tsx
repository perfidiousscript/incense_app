import { NextPage } from "next";
import { BaseSyntheticEvent, useState } from "react";
import App from "components/App";
import RequestWrapper from "components/RequestWrapper";
import IngredientsPicker from "components/IngredientsPicker";
import Link from "next/link";
import Incenses from "lib/api/incenses";
import Brands from "lib/api/brands";
import Ingredients from "lib/api/ingredients";
import { Incense, MutationError } from "types";
import { useAuth } from "lib/auth";
import { useMutation, useQuery } from "react-query";

const IncenseCreate: NextPage<Record<string, never>> = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [brandName, setBrandName] = useState("");
  const [brandId, setBrandId] = useState("");
  const [ingredientIds, setIngredientIds] = useState<string[]>([]);

  const createResult = useMutation<Incense, MutationError, FormData>(
    (formData: FormData) => {
      return Incenses.create(formData);
    }
  );

  const submit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("incense[brand_id]", brandId);
    formData.append("incense[ingredient_ids]", JSON.stringify(ingredientIds));
    createResult.mutate(formData);
  };

  const searchBrands = useMutation((searchTerm: string) => {
    return Brands.search({ name: searchTerm });
  });

  const listIngredients = useQuery("ingredients", Ingredients.list);

  function invalidForm() {
    return (
      name.length === 0 || brandId.length === 0 || description.length === 0
    );
  }

  function generateBrandsDropdown() {
    let options: JSX.Element[] = [];
    if (searchBrands.data) {
      const { data } = searchBrands;
      options = data.map((brand) => {
        return (
          <option key={brand.id} data-id={brand.id} value={brand.name}>
            {brand.name}
          </option>
        );
      });
    }
    return options;
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

  // Possibly not the best way to go about this, but it works???
  // Also, would be great to debounce the mutation.
  function changeBrand(event: BaseSyntheticEvent) {
    const { target } = event;
    let brandNamesArray = [...target.list.children].map((a) => a.innerText);
    setBrandName(target.value);

    if (brandNamesArray.includes(target.value)) {
      setBrandId(target.list.children[0].dataset.id);
    } else {
      setBrandId("");
    }

    searchBrands.mutate(target.value);
  }

  function createIncenseBody() {
    let { isSuccess, isLoading, isIdle, isError, error, data } = createResult;
    if (isSuccess && data) {
      return (
        <div className="centeredText">
          <div>Success! {data.name} has been created</div>
          <div>
            See your new incense{" "}
            <Link href={`/incenses/${data.slug}`}>Here</Link>
          </div>
          <div
            className="button"
            onClick={() => {
              window.location.reload();
            }}
          >
            Create another Incense
          </div>
        </div>
      );
    } else if (isIdle) {
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
              name="incense[name]"
              onChange={({ target: { value } }) => setName(value)}
              type="text"
              disabled={isLoading}
              value={name}
            />
            <label htmlFor="incense[brandName]">Brand</label>
            <input
              list="incense[brandName]"
              onChange={changeBrand}
              type="text"
              disabled={isLoading}
              value={brandName}
            />
            <datalist id="incense[brandName]">
              {generateBrandsDropdown()}
            </datalist>
            <IngredientsPicker
              title={"Ingredients"}
              setIngredientIds={setIngredientIds}
            />

            <label htmlFor="description">Description</label>
            <textarea
              name="incense[description]"
              onChange={({ target: { value } }) => setDescription(value)}
              disabled={isLoading}
              value={description}
            />
            <label htmlFor="image">Image</label>
            <input
              name="incense[image]"
              type="file"
              accept="img/png, img/jpeg"
              disabled={isLoading}
            />
            <button type="submit" disabled={invalidForm()}>
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
    <App authCheck={true} title="Incense:Create">
      <div className="pageTitle">Create a New Incense</div>
      {createIncenseBody()}
    </App>
  );
};

export default IncenseCreate;

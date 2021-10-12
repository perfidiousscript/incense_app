import { NextPage } from "next";
import { useState } from "react";
import App from "components/App";
import Head from "next/head";
import Link from "next/link";
import Incenses from "/lib/api/incenses";
import Brands from "/lib/api/brands";
import Ingredients from "/lib/api/ingredients";
import { useAuth } from "lib/auth";
import { useMutation, useQuery } from "react-query";
import { styles } from "/styles/Incenses.module.css";
import { debounce } from "debounce";

const IncenseCreate: NextPage<{}> = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [brandName, setBrandName] = useState("");
  const [brandId, setBrandId] = useState("");
  const [brandList, setBrandList] = useState(["", ""]);
  const [ingredientIds, setIngredientIds] = useState([]);

  const createResult = useMutation(() => {
    return Incenses.create({
      name: name,
      description: description,
      image_url: imageUrl,
      brand_id: brandId,
      ingredient_ids: ingredientIds,
    });
  });

  const submit = (event) => {
    event.preventDefault();
    createResult.mutate();
  };

  const searchBrands = useMutation((searchTerm) => {
    Brands.search({ name: searchTerm });
  });

  const listIngredients = useQuery("ingredients", Ingredients.list);

  function invalidForm() {
    return (
      name.length === 0 || brandId.length === 0 || description.length === 0
    );
  }

  function generateBrandsDropdown() {
    let options = [];
    if (searchBrands.data) {
      let { data } = searchBrands;
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

  function handleCheckBox({ target }) {
    let currentId = event.target.id;
    if (target.checked) {
      setIngredientIds((old) => [...old, currentId]);
    } else {
      setIngredientIds((old) => {
        return old.filter((item) => item !== currentId);
      });
    }
  }

  function generateIngredientBoxes() {
    let { data } = listIngredients;
    let ingredientsBoxes;
    if (data) {
      ingredientsBoxes = data.map((ingredient, index) => (
        <div key={ingredient.id}>
          <input
            type="checkbox"
            name={ingredient.name}
            id={ingredient.id}
            onChange={handleCheckBox}
          />
          <label htmlFor={ingredient.name}>{ingredient.name}</label>
        </div>
      ));
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

  function changeBrand({ target }) {
    setBrandName(target.value);
    if (target.list.children.length === 1) {
      setBrandId(target.list.children[0].dataset.id);
    }
    searchBrands.mutate(target.value);
  }

  function createIncenseBody() {
    if (createResult.isLoading) {
      return <div>Creating</div>;
    } else if (createResult.isError) {
      let error = createResult.error.body.error;
      let errorDetail = error.detail;

      return (
        <div className="centeredText">
          <div>Error: {errorDetail}</div>
          {expandErrorReason(error.params)}
        </div>
      );
    } else if (createResult.isSuccess) {
      let { data } = createResult;
      return (
        <div className="centeredText">
          <div>Success! {data.name} has been created</div>
          <div>
            See your new incense{" "}
            <Link href={`/incenses/${data.slug}`}>Here</Link>
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
              disabled={createResult.isLoading}
              value={name}
            />
            <label htmlFor="brand">Brand</label>
            <input
              list="brands"
              onChange={changeBrand}
              type="text"
              disabled={createResult.isLoading}
              value={brandName}
            />
            <datalist id="brands">{generateBrandsDropdown()}</datalist>
            <fieldset>
              <legend>Ingredients</legend>
              {generateIngredientBoxes()}
            </fieldset>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              onChange={({ target: { value } }) => setDescription(value)}
              type="text"
              disabled={createResult.isLoading}
              value={description}
            />
            <label htmlFor="imageUrl">Image</label>
            <input
              name="imageUrl"
              onChange={({ target: { value } }) => setImageUrl(value)}
              type="file"
              accept="img/*"
              disabled={createResult.isLoading}
            />
            <button
              type="submit"
              disabled={invalidForm() || createResult.isLoading}
            >
              Create
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

export default IncenseCreate;

import { NextPage } from "next";
import { useState } from "react";
import App from "components/App";
import Head from "next/head";
import Incenses from "/lib/api/incenses";
import { useMutation } from "react-query";
import { styles } from "/styles/Incenses.module.css";
import { snakeCase } from "snake-case";

const IncensesSearch: NextPage<{}> = () => {
  const [brand, setBrand] = useState("");
  const [country, setCountry] = useState("");
  const [includesIngredients, setIncludesIngredients] = useState("");
  const [excludesIngredients, setExcludesIngredients] = useState("");

  const searchResult = useMutation((event) => {
    let snakeBrand = snakeCase(brand);
    return Incenses.search({
      brand: snakeBrand,
      country: country,
      includesIngredients: includesIngredients,
      excludesIngredients: excludesIngredients,
    });
  });

  const submit = (event) => {
    event.preventDefault();
    searchResult.mutate();
  };

  function incensesFetch() {
    if (searchResult.isLoading) {
      return <span>Loading...</span>;
    }

    if (searchResult.isError) {
      return <span>Error: {searchResult.error.body.error.detail}</span>;
    }

    if (searchResult.data) {
      console.log("searchResult.data: ", searchResult);
      return (
        <div className="incenseList">
          {searchResult.data.map((incense) => (
            <div className="incense" key={incense.id}>
              <span>{incense.name}</span>
              <span> </span>
              <span>{incense.brand.name}</span>
              <span> </span>
              <span>{incense.brand.country}</span>
            </div>
          ))}
        </div>
      );
    }
  }

  return (
    <App>
      <Head>
        <title>IH::Search</title>
      </Head>

      <div>
        <div>
          <p>Search Incenses</p>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "500px",
            }}
            onSubmit={submit}
          >
            <label htmlFor="brand">Brand Name</label>
            <input
              name="brand"
              onChange={({ target: { value } }) => setBrand(value)}
              type="text"
              disabled={searchResult.isLoading}
              value={brand}
            />
            <label htmlFor="country">Country</label>
            <input
              name="country"
              onChange={({ target: { value } }) => setCountry(value)}
              type="country"
              disabled={searchResult.isLoading}
              value={country}
            />
            <label htmlFor="includesIngredients">Includes Ingredients</label>
            <input
              name="includesIngredients"
              onChange={({ target: { value } }) =>
                setIncludesIngredients(value)
              }
              type="includesIngredients"
              disabled={searchResult.isLoading}
              value={includesIngredients}
            />
            <label htmlFor="excludesIngredients">Excludes Ingredients</label>
            <input
              name="excludesIngredients"
              onChange={({ target: { value } }) =>
                setExcludesIngredients(value)
              }
              type="excludesIngredients"
              disabled={searchResult.isLoading}
              value={excludesIngredients}
            />
            <button type="submit" disabled={searchResult.isLoading}>
              Search
            </button>
          </form>
          <div>{incensesFetch()}</div>
        </div>
      </div>
    </App>
  );
};

export default IncensesSearch;

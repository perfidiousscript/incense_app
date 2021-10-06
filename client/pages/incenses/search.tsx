import { NextPage } from "next";
import { useState } from "react";
import App from "components/App";
import Head from "next/head";
import Incenses from "/lib/api/incenses";
import { useMutation } from "react-query";
import { styles } from "/styles/Incenses.module.css";

const IncensesSearch: NextPage<{}> = () => {
  const [brand, setBrand] = useState("");
  const [country, setCountry] = useState("");
  const [includedIngredients, setIncludedIngredients] = useState("");
  const [excludedIngredients, setExcludedIngredients] = useState("");

  const searchResult = useMutation((event) => {
    return Incenses.search({
      brand: brand,
      country: country,
      includedIngredients: includedIngredients,
      excludedIngredients: excludedIngredients,
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
            <label htmlFor="includedIngredients">Included Ingredients</label>
            <input
              name="includedIngredients"
              onChange={({ target: { value } }) =>
                setIncludedIngredients(value)
              }
              type="includedIngredients"
              disabled={searchResult.isLoading}
              value={includedIngredients}
            />
            <label htmlFor="excludedIngredients">Excluded Ingredients</label>
            <input
              name="excludedIngredients"
              onChange={({ target: { value } }) =>
                setExcludedIngredients(value)
              }
              type="excludedIngredients"
              disabled={searchResult.isLoading}
              value={excludedIngredients}
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

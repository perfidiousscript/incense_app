import { NextPage } from "next";
import { useState } from "react";
import App from "components/App";
import Head from "next/head";
import Link from "next/link";
import Incenses from "/lib/api/incenses";
import { useMutation } from "react-query";
import { IncensesEntries, IncenseEntry } from "/components/IncensesUnits.tsx";
import styles from "/styles/Incenses.module.css";
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
      return (
        <div className={styles.incenseGrid}>
          <div className={styles.incenseColumnHeader}>
            <div className={styles.incenseImageColumn}>Image</div>
            <div className={styles.incenseStatisticColumn}>Statistic</div>
            <div className={styles.incenseNameColumn}>Name</div>
            <div className={styles.incenseBrandColumn}>Brand</div>
            <div className={styles.incenseCountryColumn}>Country</div>
          </div>
          <IncensesEntries>
            {searchResult.data.map((incense) => (
              <Link href={`/incenses/${incense.slug}`}>
                <IncenseEntry key={incense.id}>
                  <div className={styles.incenseImageColumn}>
                    {incense.imageUrl}
                  </div>
                  <div className={styles.incenseStatisticColumn}>
                    [Statistic Here]
                  </div>
                  <div className={styles.incenseNameColumn}>{incense.name}</div>
                  <div className={styles.incenseBrandColumn}>
                    {incense.brand.name}
                  </div>
                  <div className={styles.incenseCountryColumn}>
                    {incense.brand.country}
                  </div>
                </IncenseEntry>
              </Link>
            ))}
          </IncensesEntries>
        </div>
      );
    }
  }

  return (
    <App title={"Incense Search"}>
      <p className="pageTitle">Search Incenses</p>
      <div className="generalForm">
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
            onChange={({ target: { value } }) => setIncludesIngredients(value)}
            type="includesIngredients"
            disabled={searchResult.isLoading}
            value={includesIngredients}
          />
          <label htmlFor="excludesIngredients">Excludes Ingredients</label>
          <input
            name="excludesIngredients"
            onChange={({ target: { value } }) => setExcludesIngredients(value)}
            type="excludesIngredients"
            disabled={searchResult.isLoading}
            value={excludesIngredients}
          />
          <button type="submit" disabled={searchResult.isLoading}>
            Search
          </button>
        </form>
      </div>
      {incensesFetch()}
    </App>
  );
};

export default IncensesSearch;

import { NextPage } from "next";
import { BaseSyntheticEvent, useState } from "react";
import App from "components/App";
import Link from "next/link";
import Incenses from "lib/api/incenses";
import { useMutation } from "react-query";
import { IncensesEntries, IncenseEntry } from "components/IncensesUnits";
import RadarChart from "components/RadarChart";
import RequestWrapper from "components/RequestWrapper";
import IngredientsPicker from "components/IngredientsPicker";
import styles from "styles/Incenses.module.css";
import { Incense, IncenseStatistic, MutationError } from "types";
import { snakeCase } from "snake-case";

const IncensesSearch: NextPage<Record<string, never>> = () => {
  const [brand, setBrand] = useState("");
  const [country, setCountry] = useState("");
  const [includesIngredients, setIncludesIngredients] = useState<string[]>([]);
  const [excludesIngredients, setExcludesIngredients] = useState<string[]>([]);

  const searchResult = useMutation<Incense[], MutationError>(() => {
    const snakeBrand = snakeCase(brand);
    return Incenses.search({
      brand: snakeBrand,
      country: country,
      includesIngredients: includesIngredients,
      excludesIngredients: excludesIngredients,
    });
  });

  const submit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    searchResult.mutate();
  };

  function displayRadarChart(incenseStatistic: IncenseStatistic) {
    if (incenseStatistic) {
      return (
        <RadarChart
          review={incenseStatistic}
          isStatistic={true}
          reviewId={incenseStatistic.id}
          size="small"
          interactive={false}
        />
      );
    }
  }

  function incensesFetch() {
    const { isLoading, isError, error, data } = searchResult;
    if (data) {
      return (
        <div className={styles.incenseGrid}>
          <div className={styles.incenseColumnHeader}>
            <div className={styles.incenseStatisticColumn}>Statistic</div>
            <div className={styles.incenseNameColumn}>Name</div>
            <div className={styles.incenseBrandColumn}>Brand</div>
            <div className={styles.incenseCountryColumn}>Country</div>
          </div>
          <IncensesEntries>
            {data.map((incense) => (
              <Link href={`/incenses/${incense.slug}`}>
                <IncenseEntry key={incense.id}>
                  <div className={styles.incenseStatisticColumn}>
                    {incense.incenseStatistic
                      ? displayRadarChart(incense.incenseStatistic)
                      : null}
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
    } else {
      return (
        <RequestWrapper isLoading={isLoading} isError={isError} error={error} />
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
          <IngredientsPicker
            title={"Includes Ingredients"}
            setIngredientIds={setIncludesIngredients}
          />
          <IngredientsPicker
            title={"Excludes Ingredients"}
            setIngredientIds={setExcludesIngredients}
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

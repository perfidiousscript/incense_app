import { NextPage } from "next";
import Link from "next/link";
import { useState, BaseSyntheticEvent } from "react";
import App from "components/App";
import RequestWrapper from "components/RequestWrapper";
import Brands from "lib/api/brands";
import { Brand, MutationError } from "types";
import { useMutation } from "react-query";
import { BrandsEntries, BrandEntry } from "components/BrandsUnits";
import styles from "styles/Brands.module.css";

const BrandsSearch: NextPage<Record<string, never>> = () => {
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");

  const searchBrands = useMutation<Brand[], MutationError>(() =>
    Brands.search({ name: name, country: country })
  );

  const submit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    searchBrands.mutate();
  };

  function invalidForm() {
    return country.length === 0 && name.length === 0;
  }

  function brandsFetch() {
    if (searchBrands.data) {
      const { data } = searchBrands;
      if (data.length > 0) {
        return (
          <div className={styles.brandsGrid}>
            <div className={styles.brandsColumnHeader}>
              <div className={styles.brandImageColumn}>Image</div>
              <div className={styles.brandNameColumn}>Name</div>
              <div className={styles.brandCountryColumn}>Country</div>
            </div>
            <BrandsEntries>
              {data.map((brand) => (
                <Link href={`/brands/${brand.slug}`} key={brand.id}>
                  <BrandEntry>
                    <div className={styles.brandImageColumn}>
                      {brand.imageUrl}
                    </div>
                    <div className={styles.brandNameColumn}>{brand.name}</div>
                    <div className={styles.brandCountryColumn}>
                      {brand.country}
                    </div>
                  </BrandEntry>
                </Link>
              ))}
            </BrandsEntries>
          </div>
        );
      } else {
        return <div>Sorry no brands found with those parameters.</div>;
      }
    } else {
      return (
        <RequestWrapper
          isLoading={searchBrands.isLoading}
          isError={searchBrands.isError}
          error={searchBrands.error}
        />
      );
    }
  }

  return (
    <App title="Search Brands">
      <p className="pageTitle">Search Brands</p>
      <div className="generalForm">
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "500px",
          }}
          onSubmit={submit}
        >
          <label htmlFor="country">Country</label>
          <input
            name="country"
            onChange={({ target: { value } }) => setCountry(value)}
            type="country"
            disabled={searchBrands.isLoading}
            value={country}
          />
          <label htmlFor="name">Name</label>
          <input
            name="name"
            onChange={({ target: { value } }) => setName(value)}
            type="text"
            disabled={searchBrands.isLoading}
            value={name}
          />
          <button
            type="submit"
            disabled={searchBrands.isLoading || invalidForm()}
          >
            Search
          </button>
        </form>
      </div>
      {brandsFetch()}
    </App>
  );
};

export default BrandsSearch;

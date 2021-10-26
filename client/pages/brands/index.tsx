import { NextPage } from "next";
import Link from "next/link";
import App from "components/App";
import Head from "next/head";
import Brands from "lib/api/brands";
import { Brand, MutationError } from "types";
import { useQuery } from "react-query";
import { BrandsEntries, BrandEntry } from "components/BrandsUnits";
import RequestWrapper from "components/RequestWrapper";
import styles from "styles/Brands.module.css";

const BrandsIndex: NextPage<Record<string, never>> = () => {
  const { isLoading, isError, data, error } = useQuery<Brand[], MutationError>(
    "brands",
    Brands.list
  );

  function brandsFetch() {
    if (data) {
      return (
        <BrandsEntries>
          {data.map((brand) => (
            <Link href={`/brands/${brand.slug}`}>
              <BrandEntry key={brand.id}>
                <div className={styles.brandImageColumn}>{brand.imageUrl}</div>
                <div className={styles.brandNameColumn}>{brand.name}</div>
                <div className={styles.brandCountryColumn}>{brand.country}</div>
              </BrandEntry>
            </Link>
          ))}
        </BrandsEntries>
      );
    } else {
      return (
        <RequestWrapper isLoading={isLoading} isError={isError} error={error} />
      );
    }
  }

  return (
    <App title="Brands">
      <div className="pageTitle">Browse Brands</div>
      <div className={styles.brandsGrid}>
        <div className={styles.brandsColumnHeader}>
          <div className={styles.brandImageColumn}>Image</div>
          <div className={styles.brandNameColumn}>Name</div>
          <div className={styles.brandCountryColumn}>Country</div>
        </div>
        {brandsFetch()}
      </div>
    </App>
  );
};

export default BrandsIndex;

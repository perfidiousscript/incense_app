import { NextPageContext, NextPage } from "next";

import App from "components/App";
import Head from "next/head";
import Brands from "/lib/api/brands";
import { useQuery } from "react-query";
import styles from "/styles/Brands.module.css";

type InitialProps = {
  brands: Brand[];
};

const BrandsIndex: NextPage<InitialProps> = ({ brands }) => {
  const { isLoading, isError, data, error } = useQuery("brands", Brands.list);

  function brandsFetch() {
    if (isLoading) {
      return <span>Loading...</span>;
    }

    if (isError) {
      return <span>Error: {error.body.error}</span>;
    }
    if (data) {
      return (
        <div className={styles.brandsEntries}>
          {data.map((brand) => (
            <div className={styles.brandEntry} key={brand.id}>
              <div className={styles.brandImageColumn}>{brand.imageUrl}</div>
              <div className={styles.brandNameColumn}>{brand.name}</div>
              <div className={styles.brandCountryColumn}>{brand.country}</div>
            </div>
          ))}
        </div>
      );
    }
  }

  return (
    <App>
      <Head>
        <title>Incense-Hermitage::Brands</title>
      </Head>

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

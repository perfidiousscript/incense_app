import { NextPageContext, NextPage } from "next";

import App from "components/App";
import Head from "next/head";
import Link from "next/link";
import Incenses from "/lib/api/incenses";
import { useQuery } from "react-query";
import { IncensesEntries, IncenseEntry } from "/components/IncensesUnits.tsx";
import styles from "/styles/Incenses.module.css";

type InitialProps = {
  incenses: Incense[];
};

const IncensesIndex: NextPage<InitialProps> = ({ incenses }) => {
  function incensesFetch() {
    const { isLoading, isError, data, error } = useQuery(
      "incenses",
      Incenses.listAll
    );

    if (isLoading) {
      return <span>Loading...</span>;
    }

    if (isError) {
      return <span>Error: {error.message}</span>;
    }

    if (data) {
      return (
        <IncensesEntries>
          {data.map((incense) => (
            <Link href={`incenses/${incense.slug}`}>
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
      );
    }
  }

  return (
    <App>
      <Head>
        <title>Incense-Hermitage::Browse Incenses</title>
      </Head>

      <div className="pageTitle">Browse Incense</div>
      <div className={styles.incenseGrid}>
        <div className={styles.incenseColumnHeader}>
          <div className={styles.incenseImageColumn}>Image</div>
          <div className={styles.incenseStatisticColumn}>Statistic</div>
          <div className={styles.incenseNameColumn}>Name</div>
          <div className={styles.incenseBrandColumn}>Brand</div>
          <div className={styles.incenseCountryColumn}>Country</div>
        </div>
        {incensesFetch()}
      </div>
    </App>
  );
};

export default IncensesIndex;

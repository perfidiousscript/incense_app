import { NextPage } from "next";
import App from "components/App";
import Link from "next/link";
import Incenses from "/lib/api/incenses";
import { useQuery } from "react-query";
import { IncensesEntries, IncenseEntry } from "/components/IncensesUnits.tsx";
import RadarChart from "/components/RadarChart";
import styles from "/styles/Incenses.module.css";

type InitialProps = {
  incenses: Incense[];
};

function displayRadarChart(incense) {
  if (incense.incenseStatistic) {
    return (
      <RadarChart
        review={incense.incenseStatistic}
        reviewId={incense.id}
        size="small"
        isStatistic={true}
        interactive={false}
      />
    );
  }
}

const IncensesIndex: NextPage<InitialProps> = () => {
  function incensesFetch() {
    const { isLoading, isError, data, error } = useQuery(
      "incenses",
      Incenses.list
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
            <Link key={incense.id} href={`incenses/${incense.slug}`}>
              <IncenseEntry>
                <div className={styles.incenseStatisticColumn}>
                  {displayRadarChart(incense)}
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
    <App title={"Browse:Incenses"}>
      <div className="pageTitle">Browse Incense</div>
      <div className={styles.incenseGrid}>
        <div className={styles.incenseColumnHeader}>
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

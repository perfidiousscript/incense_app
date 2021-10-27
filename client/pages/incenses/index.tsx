import { NextPage } from "next";
import App from "components/App";
import Link from "next/link";
import Incenses from "lib/api/incenses";
import { useQuery } from "react-query";
import { IncensesEntries, IncenseEntry } from "components/IncensesUnits";
import RadarChart from "components/RadarChart";
import RequestWrapper from "components/RequestWrapper";
import { Incense, MutationError } from "types";
import styles from "styles/Incenses.module.css";

function displayRadarChart(incense: Incense) {
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

const IncensesIndex: NextPage<Record<string, never>> = () => {
  function incensesFetch() {
    const { isLoading, isError, data, error } = useQuery<
      Incense[],
      MutationError
    >("incenses", Incenses.list);

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
    } else {
      return (
        <RequestWrapper isLoading={isLoading} isError={isError} error={error} />
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

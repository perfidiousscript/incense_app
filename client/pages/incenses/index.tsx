import { NextPageContext, NextPage } from "next";

import App from "components/App";
import Head from "next/head";
import Incenses from "/lib/api/incenses";
import { useQuery } from "react-query";

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
        <ul>
          {data.map((incense) => (
            <li key={incense.id}>
              <span>{incense.id}</span>
              <span>{incense.imageUrl}</span>
              <span>{incense.name}</span>
              <span>{incense.description}</span>
            </li>
          ))}
        </ul>
      );
    }
  }

  return (
    <App>
      <Head>
        <title>Incense-Hermitage::Browse Incenses</title>
      </Head>

      <div>
        <div>
          <p>Incense</p>
          <div>{incensesFetch()}</div>
        </div>
      </div>
    </App>
  );
};

export default IncensesIndex;

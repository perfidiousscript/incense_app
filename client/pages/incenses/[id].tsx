import { NextPageContext, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import App from "components/App";
import Head from "next/head";
import Incenses from "/lib/api/incenses";
import { useQuery } from "react-query";

type InitialProps = {
  incense: Incense;
};

const IncenseShow: NextPage<InitialProps> = ({ incense }) => {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, isError, data, error } = useQuery(
    ["incense", id],
    Incenses.get
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error}</span>;
  }

  return (
    <App>
      <Head>
        <title>Incense-Hermitage::Incense</title>
      </Head>

      <div>
        <div>
          <p>Incense</p>
          <div key={data.id}>
            <span>{data.name}</span>
            <span>{data.description}</span>
          </div>
          {data.ingredients.map((ingredient) => {
            <div>
              <div>{ingredient.name}</div>
            </div>;
          })}
        </div>
      </div>
    </App>
  );
};

export default BrandShow;

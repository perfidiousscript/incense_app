import { NextPageContext, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import App from "components/App";
import Head from "next/head";
import Brands from "/lib/api/brands";
import { useQuery } from "react-query";

type InitialProps = {
  brand: Brand;
};

const BrandShow: NextPage<InitialProps> = ({ brand }) => {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, isError, data, error } = useQuery(
    ["brand", id],
    Brands.get
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
        <title>Incense-Hermitage::Brands</title>
      </Head>

      <div>
        <div>
          <p>Brand</p>
          <ul>
            {
              <li key={data.id}>
                <span>{data.imageUrl}</span>
                <span>{data.name}</span>
                <span>{data.country}</span>
              </li>
            }
          </ul>
        </div>
      </div>
    </App>
  );
};

export default BrandShow;

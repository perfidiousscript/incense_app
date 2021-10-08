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

  if (data) {
    return (
      <App>
        <Head>
          <title>IH::Brand: {data.name}</title>
        </Head>

        <div>
          <div>
            <div className="pageTitle">{data.name}</div>
            <div className="centeredText"></div>
            <div>{data.country}</div>
            <div>{data.imageUrl}</div>
            <div>{data.description}</div>
            <div>
              <p>Incenses</p>
            </div>
          </div>
        </div>
      </App>
    );
  }
};

export default BrandShow;

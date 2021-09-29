import { NextPageContext, NextPage } from "next";

import App from "components/App";
import Head from "next/head";
import Brands from "/lib/api/brands";
import { useQuery } from "react-query";

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
      return <span>Error: {error.message}</span>;
    }

    if (data) {
      return (
        <ul>
          {data.map((brand) => (
            <li key={brand.id}>
              <span>{brand.id}</span>
              <span>{brand.imageUrl}</span>
              <span>{brand.name}</span>
              <span>{brand.country}</span>
            </li>
          ))}
        </ul>
      );
    }
  }

  return (
    <App>
      <Head>
        <title>Incense-Hermitage::Brands</title>
      </Head>

      <div>
        <div>
          <p>Brands</p>
          <div>{brandsFetch()}</div>
        </div>
      </div>
    </App>
  );
};

export default BrandsIndex;

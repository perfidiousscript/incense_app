import { NextPageContext, NextPage } from "next";

import App from "components/App";
import Head from "next/head";
import { useQuery } from "react-query";

type InitialProps = {
  brands: Brand[];
};

const BrandsIndex: NextPage<InitialProps> = ({ brands }) => {
  function brandsFetch() {
    // const { isLoading, isError, data, error } = useQuery("brands", indexBrands);
    const { isLoading, isError, data, error } = useQuery("brands", () =>
      fetch("http://localhost:3001/api/v1/brands").then((res) => res.json())
    );

    if (isLoading) {
      return <span>Loading...</span>;
    }

    if (isError) {
      return <span>Error: {error.message}</span>;
    }
    console.log(data);
    return (
      <ul>
        {data.map((brand) => (
          <li key={brand.id}>
            <span>{brand.image_url}</span>
            <span>{brand.name}</span>
            <span>{brand.country}</span>
          </li>
        ))}
      </ul>
    );
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

import { NextPageContext, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import App from "components/App";
import Head from "next/head";
import Incenses from "/lib/api/incenses";
import { useQuery } from "react-query";
import { reviewProperties } from "/lib/constants";
import styles from "/styles/Incenses.module.css";

type InitialProps = {
  incense: Incense;
};

const IncenseShow: NextPage<InitialProps> = ({ incense }) => {
  const router = useRouter();
  const { slug } = router.query;

  const { isLoading, isError, data, error } = useQuery(
    ["incense", slug],
    Incenses.get
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error}</span>;
  }
  console.log("data: ", data);
  return (
    <App>
      <Head>
        <title>Incense-Hermitage::Incense</title>
      </Head>

      <div>
        <p className={styles.incenseName}>{data.name}</p>
        <div key={data.id}>
          <p>Description</p>
          <p>{data.description}</p>
        </div>
        <div>Ingredients</div>
        {data.ingredients.map((ingredient) => {
          return (
            <div key={ingredient.id}>
              <div>{ingredient.name}</div>
            </div>
          );
        })}
        <div>Reviews</div>
        {data.reviews.map((review) => {
          return (
            <div key={review.id}>
              <div>{review.reviewBody}</div>
              <div>{review.rating}</div>
              <div>
                {reviewProperties.map((property) => (
                  <p key={property}>
                    {property}:{review[property]}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </App>
  );
};

export default IncenseShow;

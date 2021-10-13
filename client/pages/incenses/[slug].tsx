import { NextPageContext, NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import App from "components/App";
import RadarChart from "components/RadarChart";
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

  return (
    <App title={data.name}>
      <div>
        <p>[Image Here] {data.imageUrl}</p>
        <p className={styles.incenseName}>{data.name}</p>
        <RadarChart review={data.reviews[0]} size="xLarge" />
        <div className={styles.incenseDescription}>
          <p>Description</p>
          <p>{data.description}</p>
          <div className={styles.incenseIngredients}>Ingredients</div>
          {data.ingredients.map((ingredient) => {
            return (
              <div key={ingredient.id}>
                <div>{ingredient.name}</div>
              </div>
            );
          })}
        </div>
        <div>
          <Link href={`/review/create/${data.slug}`}>
            <div>Write a review of {data.name}</div>
          </Link>
        </div>
        <div className={styles.incenseReviews}>Reviews</div>
        {data.reviews.map((review) => {
          return (
            <div className={styles.review} key={review.id}>
              <div className={styles.reviewUsername}>
                {review.user.username}
                <span className={styles.reviewRating}>{review.rating}</span>
              </div>
              <br />
              <div className={styles.reviewBody}>{review.reviewBody}</div>
            </div>
          );
        })}
      </div>
    </App>
  );
};

export default IncenseShow;

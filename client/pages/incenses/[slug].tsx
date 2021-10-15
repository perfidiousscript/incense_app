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

const IncenseShow: NextPage<{}> = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { isLoading, isError, data, error } = useQuery(
    ["incense", slug],
    Incenses.get
  );

  function showRadarChart(incense) {
    if (incense.reviews[0]) {
      return (
        <RadarChart
          review={incense.reviews[0]}
          size="large"
          interactive="false"
        />
      );
    } else {
      return <div>No Reviews Added Yet</div>;
    }
  }

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
        {showRadarChart(data)}
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
              <div className={styles.reviewHead}>
                <div className={styles.reviewUsername}>
                  {review.user.username}
                  <span className={styles.reviewRating}>{review.rating}</span>
                </div>
              </div>
              <div className={styles.reviewBody}>
                <RadarChart
                  reviewId={review.id}
                  review={{
                    sweet: review.sweet,
                    smokey: review.smokey,
                    woody: review.woody,
                    ethereal: review.ethereal,
                    savory: review.savory,
                    fruity: review.fruity,
                    herbal: review.herbal,
                    spicy: review.spicy,
                    citrus: review.citrus,
                    floral: review.floral,
                    earthy: review.earthy,
                  }}
                  size="small"
                  interactive="false"
                />
                <div className={styles.reviewBodyText}>{review.reviewBody}</div>
              </div>
            </div>
          );
        })}
      </div>
    </App>
  );
};

export default IncenseShow;

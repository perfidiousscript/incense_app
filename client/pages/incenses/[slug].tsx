import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import App from "components/App";
import RadarChart from "components/RadarChart";
import ReviewEntry from "components/ReviewEntry";
import RequestWrapper from "components/RequestWrapper";
import Incenses from "lib/api/incenses";
import { useQuery } from "react-query";
import { useAuth } from "lib/auth";
import { Incense, MutationError } from "types";
import styles from "styles/Incenses.module.css";

const IncenseShow: NextPage<Record<string, never>> = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { slug } = router.query;

  const {
    isLoading,
    isError,
    data,
    error,
  }: {
    isLoading: boolean;
    isError: boolean;
    data: Incense | undefined;
    error: MutationError | null;
  } = useQuery(["incense", slug], Incenses.get);

  function showUpdateButton() {
    if (data && user && user.role === ("moderator" || "admin")) {
      return (
        <div>
          <Link href={`update/${data.slug}`}>Update Incense</Link>
        </div>
      );
    } else {
      return <></>;
    }
  }

  function showUserReview() {
    if (data && user) {
      if (data.userReview) {
        return (
          <div>
            <p>Your Review</p>
            <ReviewEntry review={data.userReview} />
          </div>
        );
      } else {
        return (
          <Link href={`/review/create/${data.slug}`}>
            <div>Write a review of {data.name}</div>
          </Link>
        );
      }
    }
  }

  function showRadarChart(incense: Incense) {
    if (incense.incenseStatistic) {
      const { incenseStatistic } = incense;
      return (
        <>
          <RadarChart
            review={incenseStatistic}
            isStatistic={true}
            size="large"
            interactive={false}
            reviewId={incense.id}
          />
          <p>
            Avg reported burn time: {Math.round(incenseStatistic.burnTimeAvg)}{" "}
            minutes
          </p>
          <p>
            Avg reported price paid: $
            {Math.round(incenseStatistic.pricePaidAvg)}
          </p>
        </>
      );
    } else {
      return <div>No reviews have been added yet</div>;
    }
  }

  if (data) {
    return (
      <App title={data.name}>
        <p className={styles.incenseName}>{data.name}</p>
        <p>[Image Here] {data.imageUrl}</p>
        {showRadarChart(data)}
        {showUpdateButton()}
        <div className={styles.incenseDescription}>
          <p>Description</p>
          <p>{data.description}</p>
          <div className={styles.incenseIngredientsTitle}>Ingredients</div>
          <div className={styles.incenseIngredients}>
            {data.ingredients?.map((ingredient) => {
              return (
                <div key={ingredient.id}>
                  <div>{ingredient.name}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div>{showUserReview()}</div>
        <div className={styles.incenseReviewsTitle}>Reviews</div>
        <div className={styles.incenseReviews}>
          {data.reviews?.map((review) => {
            return <ReviewEntry review={review} key={review.id} />;
          })}
        </div>
      </App>
    );
  } else {
    return (
      <RequestWrapper isLoading={isLoading} isError={isError} error={error} />
    );
  }
};

export default IncenseShow;

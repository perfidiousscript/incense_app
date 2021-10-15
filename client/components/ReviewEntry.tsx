import { FC } from "react";
import { Review } from "types";
import RadarChart from "/components/RadarChart";
import styled from "styled-components";
import styles from "/styles/Incenses.module.css";

const ReviewContainer = styled.div`
  border: 1px solid black;
  margin: 1%;
  padding: 0.5rem;
`;

const UserName = styled.div`
  font-size: 1.2rem;
`;

const ReviewRating = styled.span`
  font-style: italic;
  float: right;
`;

const ReviewBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr;
`;

const ReviewEntry: FC<Review> = ({ review }) => {
  return (
    <ReviewContainer>
      <div className={styles.reviewHead}>
        <UserName className={styles.reviewUsername}>
          {review.user ? review.user.username : null}
          <ReviewRating>{review.rating}</ReviewRating>
        </UserName>
      </div>
      <ReviewBody>
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
      </ReviewBody>
    </ReviewContainer>
  );
};

export default ReviewEntry;

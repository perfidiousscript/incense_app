import Link from "next/link";
import { Review } from "types";
import RadarChart from "components/RadarChart";
import styled from "styled-components";
import styles from "styles/Incenses.module.css";

const ReviewContainer = styled.div`
  border: 1px solid black;
  margin: 1% 0;
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

const ReviewEntry = ({
  review,
  updatable,
}: {
  review: Review;
  updatable: boolean;
}) => {
  return (
    <ReviewContainer>
      <div className={styles.reviewHead}>
        <UserName className={styles.reviewUsername}>
          <div>{review.user?.username}</div>
          <ReviewRating>{review.rating}</ReviewRating>
        </UserName>
      </div>
      <ReviewBody>
        <RadarChart
          reviewId={review.id}
          review={review}
          size="small"
          interactive={false}
        />
        <div className={styles.reviewBodyText}>{review.reviewBody}</div>
        {updatable ? (
          <Link href={`/review/update/${review.id}`}>Update Review</Link>
        ) : null}
      </ReviewBody>
    </ReviewContainer>
  );
};

export default ReviewEntry;

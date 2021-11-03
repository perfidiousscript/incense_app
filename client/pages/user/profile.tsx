import { NextPage } from "next";
import { useAuth } from "lib/auth";
import App from "components/App";
import { Review } from "types";
import ReviewEntry from "components/ReviewEntry";

const UserProfile: NextPage<Record<string, never>> = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <App authCheck={true} title={"Profile"}>
        <div className="pageTitle">{user.username}</div>
        <div>Your Collection</div>
        <p>Collection will go here</p>
        <div>Your Reviews</div>
        <div className="userReviews">
          {user.reviews.map((review: Review) => {
            return (
              <ReviewEntry review={review} key={review.id} updatable={true} />
            );
          })}
        </div>
      </App>
    );
  } else {
    return <span>Loading...</span>;
  }
};

export default UserProfile;

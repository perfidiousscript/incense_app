import { NextPage } from "next";
import { useAuth } from "lib/auth";
import App from "components/App";
import ReviewEntry from "components/ReviewEntry";

const UserProfile: NextPage<Record<string, never>> = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <App auth={true} title={"Profile"}>
        <div className="pageTitle">{user.username}</div>
        <div>Your Collection</div>
        <p>Collection will go here</p>
        <div>Your Reviews</div>
        {user.reviews.map((review) => {
          return (
            <ReviewEntry review={review} key={review.id} updatable={true} />
          );
        })}
      </App>
    );
  } else {
    return <span>Loading...</span>;
  }
};

export default UserProfile;

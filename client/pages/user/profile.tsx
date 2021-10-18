import { NextPageContext, NextPage } from "next";
import { useQuery } from "react-query";
import { useAuth } from "lib/auth";
import App from "components/App";
import ReviewEntry from "components/ReviewEntry";

const UserProfile: NextPage<{}> = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <App auth={true} title={"Profile"}>
        <div className="pageTitle">{user.username}</div>
        <div>Your Collection</div>
        <p>Collection will go here</p>
        <div>Your Reviews</div>
        {user.reviews.map((review) => {
          return <ReviewEntry review={review} key={review.id} />;
        })}
      </App>
    );
  } else {
    return <span>Loading...</span>;
  }
};

export default UserProfile;

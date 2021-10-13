import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "react-query";
import RadarChart from "components/RadarChart";
import App from "components/App";
import Reviews from "/lib/api/reviews";

const ReviewCreate: NextPage<{}> = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [burnTime, setBurnTime] = useState(0);
  const [yearPurchased, setYearPurchased] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [rating, setRating] = useState("neutral");
  const [pricePaid, setPricePaid] = useState(0);
  const [sweet, setSweet] = useState(0);
  const [smokey, setSmokey] = useState(0);
  const [woody, setWoody] = useState(0);
  const [ethereal, setEthereal] = useState(0);
  const [savory, setSavory] = useState(0);
  const [fruity, setFruity] = useState(0);
  const [herbal, setHerbal] = useState(0);
  const [spicy, setSpicy] = useState(0);
  const [citrus, setCitrus] = useState(0);
  const [floral, setFloral] = useState(0);
  const [earthy, setEarthy] = useState(0);

  const createReview = useMutation(() => {
    return Reviews.create({
      burn_time: Number(burnTime),
      year_purchased: Number(yearPurchased),
      incense_slug: slug,
      review_body: reviewBody,
      rating: rating,
      price_paid: Number(pricePaid),
      sweet: sweet,
      smokey: smokey,
      woody: woody,
      ethereal: ethereal,
      savory: savory,
      fruity: fruity,
      herbal: herbal,
      spicy: spicy,
      citrus: citrus,
      floral: floral,
    });
  });

  const submit = (event) => {
    event.preventDefault;
    createReview.mutate();
  };

  const ratings = ["hate", "dislike", "neutral", "like", "love"];

  function generateYearsDropdown() {
    let time = new Date();
    let currentYear = 1900 + time.getYear();
    let years = [];
    for (let i = currentYear; i >= 1980; i--) {
      years.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return years;
  }

  function generateRatingsDropdown() {
    let ratingsOptions = ratings.map((rating) => {
      return (
        <option key={rating} value={rating}>
          {rating}
        </option>
      );
    });
    return ratingsOptions;
  }

  function expandErrorReason(errorParams) {
    let reasonHtml = [];
    if (errorParams !== null) {
      reasonHtml = Object.entries(errorParams).map(([key, value]) => (
        <>
          <span>{key}: </span>
          <span>{value}</span>
        </>
      ));
    }
    return reasonHtml;
  }

  function createReviewForm() {
    if (createReview.isLoading) {
      return <div>Creating</div>;
    } else if (createReview.isError) {
      let error = createReview.error.body.error;
      let errorDetail = error.detail;

      return (
        <div className="centeredText">
          <div>Error: {errorDetail}</div>
          {expandErrorReason(error.params)}
        </div>
      );
    } else if (createReview.isSuccess) {
      let { data } = createReview;
      return (
        <div className="centeredText">
          <div>Success! Review has been created</div>
        </div>
      );
    } else {
      return (
        <div className="generalForm">
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "500px",
            }}
            onSubmit={submit}
          >
            <RadarChart
              size="large"
              interactive={true}
              reviewId={"new"}
              sweet={sweet}
              smokey={smokey}
              woody={woody}
              ethereal={ethereal}
              savory={savory}
              fruity={fruity}
              herbal={herbal}
              spicy={spicy}
              citrus={citrus}
              floral={floral}
              setSavory={setSavory}
              setSweet={setSweet}
              setSmokey={setSmokey}
              setWoody={setWoody}
              setEthereal={setEthereal}
              setFruity={setFruity}
              setHerbal={setHerbal}
              setSpicy={setSpicy}
              setCitrus={setCitrus}
              setFloral={setFloral}
              setEarthy={setEarthy}
            />
            <label htmlFor="ratings">Rating</label>
            <input
              list="ratings"
              onChange={({ value }) => setRating(value)}
              disabled={createReview.isLoading}
              value={rating}
            />
            <datalist id="ratings">{generateRatingsDropdown()}</datalist>
            <label htmlFor="yearPurchased">Year Purchased</label>
            <input
              list="yearPurchased"
              onChange={({ value }) => setYearPurchased(value)}
              disabled={createReview.isLoading}
              value={yearPurchased}
            />
            <datalist id="yearPurchased">{generateYearsDropdown()}</datalist>
            <label htmlFor="burnTime">Burn Time</label>
            <input
              name="burnTime"
              onChange={({ target: { value } }) => setBurnTime(value)}
              type="text"
              disabled={createReview.isLoading}
              value={burnTime}
            />
            <label htmlFor="pircePaid">Price Paid</label>
            <input
              name="pricePaid"
              onChange={({ target: { value } }) => setPricePaid(value)}
              type="text"
              disabled={createReview.isLoading}
              value={pricePaid}
            />
            <label htmlFor="reviewBody">Review Text</label>
            <textarea
              name="reviewBody"
              onChange={({ target: { value } }) => setReviewBody(value)}
              type="text"
              disabled={createReview.isLoading}
              value={reviewBody}
            />
            <button type="submit" disabled={createReview.isLoading}>
              Create
            </button>
          </form>
        </div>
      );
    }
  }

  return (
    <App authCheck="true" title="Create Review">
      <div className="pageTitle">Create A New Review for {slug}</div>
      {createReviewForm()}
    </App>
  );
};

export default ReviewCreate;

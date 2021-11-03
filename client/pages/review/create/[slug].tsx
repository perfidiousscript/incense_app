import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, BaseSyntheticEvent } from "react";
import { useMutation } from "react-query";
import Link from "next/link";
import RadarChart from "components/RadarChart";
import App from "components/App";
import Reviews from "lib/api/reviews";
import { Review, MutationError } from "types";
import RequestWrapper from "components/RequestWrapper";
import { RATINGS } from "lib/constants";

const ReviewCreate: NextPage<Record<string, never>> = () => {
  const router = useRouter();
  const slug = router.query.slug as string;
  const [burnTime, setBurnTime] = useState(0);
  const [yearPurchased, setYearPurchased] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [rating, setRating] = useState("");
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

  const createReview = useMutation<Review, MutationError>(() => {
    return Reviews.create({
      burn_time: Number(burnTime),
      year_purchased: Number(yearPurchased),
      incense_slug: slug,
      review_body: reviewBody,
      rating: rating,
      price_paid: Number(pricePaid),
      sweet: sweet,
      earthy: earthy,
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

  const submit = (event: BaseSyntheticEvent) => {
    event.preventDefault;
    createReview.mutate();
  };

  function generateYearsDropdown() {
    const currentYear = 2021;
    const years = [];
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
    const ratingsOptions: JSX.Element[] = [];
    RATINGS.map((rating) => {
      ratingsOptions.push(
        <option key={rating} value={rating}>
          {rating}
        </option>
      );
    });
    return ratingsOptions;
  }

  function changeRating(
    event: React.ChangeEvent & {
      target: HTMLSelectElement;
    }
  ) {
    const value = event.target.value;
    setRating(value);
  }

  function changeYear(
    event: React.ChangeEvent & {
      target: HTMLSelectElement;
    }
  ) {
    const value = event.target.value;
    setYearPurchased(value);
  }

  function createReviewForm() {
    let { isIdle, isSuccess, isLoading, isError, error, data } = createReview;
    if (isIdle) {
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
              review={{
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
                earthy: earthy,
              }}
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
            <select onChange={changeRating} disabled={isLoading} value={rating}>
              {generateRatingsDropdown()}
            </select>
            <label htmlFor="yearPurchased">Year Purchased</label>
            <select
              onChange={changeYear}
              disabled={isLoading}
              value={yearPurchased}
            >
              {generateYearsDropdown()}
            </select>
            <label htmlFor="burnTime">Burn Time</label>
            <input
              name="burnTime"
              onChange={({ target: { value } }) => setBurnTime(Number(value))}
              type="text"
              disabled={isLoading}
              value={burnTime}
            />
            <label htmlFor="pricePaid">Price Paid</label>
            <input
              name="pricePaid"
              onChange={({ target: { value } }) => setPricePaid(Number(value))}
              type="text"
              disabled={createReview.isLoading}
              value={pricePaid}
            />
            <label htmlFor="reviewBody">Review Text</label>
            <textarea
              name="reviewBody"
              onChange={({ target: { value } }) => setReviewBody(value)}
              disabled={createReview.isLoading}
              value={reviewBody}
            />
            <button type="submit" disabled={createReview.isLoading}>
              Create
            </button>
          </form>
        </div>
      );
    } else if (createReview.isSuccess && data) {
      return (
        <div className="centeredText">
          <div>Success! Review has been created</div>
          <Link href={`/incenses/${slug}`}>Return to Incense Page</Link>
        </div>
      );
    } else {
      return (
        <RequestWrapper isLoading={isLoading} isError={isError} error={error} />
      );
    }
  }

  return (
    <App authCheck={true} title="Review:Create">
      <div className="pageTitle">Create A New Review for {slug}</div>
      {createReviewForm()}
    </App>
  );
};

export default ReviewCreate;

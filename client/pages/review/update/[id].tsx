import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState, BaseSyntheticEvent } from "react";
import { useQuery, useMutation } from "react-query";
import Link from "next/link";
import RadarChart from "components/RadarChart";
import App from "components/App";
import Reviews from "lib/api/reviews";
import { Review, MutationError } from "types";
import RequestWrapper from "components/RequestWrapper";
import { RATINGS } from "lib/constants";

const ReviewUpdate: NextPage<Record<string, never>> = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const [burnTime, setBurnTime] = useState<number>();
  const [yearPurchased, setYearPurchased] = useState<number>();
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

  const {
    isSuccess,
    isLoading,
    isError,
    data,
    error,
  }: {
    isSuccess: boolean;
    isLoading: boolean;
    isError: boolean;
    data: Review | undefined;
    error: MutationError | null;
  } = useQuery(["review", id], Reviews.get);

  useEffect(() => {
    if (isSuccess && data) {
      setBurnTime(data.burnTime);
      data.yearPurchased && setYearPurchased(data.yearPurchased);
      setReviewBody(data.reviewBody);
      setRating(data.rating);
      setPricePaid(data.pricePaid);
      setSweet(data.sweet);
      setSmokey(data.smokey);
      setWoody(data.woody);
      setEthereal(data.ethereal);
      setSavory(data.savory);
      setFruity(data.fruity);
      setHerbal(data.herbal);
      setSpicy(data.spicy);
      setCitrus(data.citrus);
      setFloral(data.floral);
      setEarthy(data.earthy);
    }
  }, [data]);

  const updateReview = useMutation<Review, MutationError>(() => {
    return Reviews.update({
      id: id,
      burn_time: Number(burnTime),
      year_purchased: Number(yearPurchased),
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
    updateReview.mutate();
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
    const value = Number(event.target.value);
    setYearPurchased(value);
  }

  function updateReviewForm() {
    if (updateReview.isIdle) {
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
              isStatistic={false}
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
            <select
              onChange={changeRating}
              disabled={updateReview.isLoading}
              value={rating}
            >
              {generateRatingsDropdown()}
            </select>
            <label htmlFor="yearPurchased">Year Purchased</label>
            <select
              onChange={changeYear}
              disabled={updateReview.isLoading}
              value={yearPurchased}
            >
              {generateYearsDropdown()}
            </select>
            <label htmlFor="burnTime">Burn Time</label>
            <input
              name="burnTime"
              onChange={({ target: { value } }) => setBurnTime(Number(value))}
              type="text"
              disabled={updateReview.isLoading}
              value={burnTime}
            />
            <label htmlFor="pricePaid">Price Paid</label>
            <input
              name="pricePaid"
              onChange={({ target: { value } }) => setPricePaid(Number(value))}
              type="text"
              disabled={updateReview.isLoading}
              value={pricePaid}
            />
            <label htmlFor="reviewBody">Review Text</label>
            <textarea
              name="reviewBody"
              onChange={({ target: { value } }) => setReviewBody(value)}
              disabled={updateReview.isLoading}
              value={reviewBody}
            />
            <button type="submit" disabled={updateReview.isLoading}>
              Update
            </button>
          </form>
        </div>
      );
    } else if (updateReview.isSuccess && updateReview.data) {
      return (
        <div className="centeredText">
          <div>Success! Review has been updated</div>
        </div>
      );
    } else {
      return (
        <RequestWrapper
          isLoading={updateReview.isLoading}
          isError={updateReview.isError}
          error={updateReview.error}
        />
      );
    }
  }

  return (
    <App authCheck={true} title="Review:Update">
      <div className="pageTitle">Update Review</div>
      {updateReviewForm()}
    </App>
  );
};

export default ReviewUpdate;

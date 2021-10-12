import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "react-query";
import App from "components/App";

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
    return Reviews.create({});
  });

  const submit = (event) => {
    event.preventDefault;
    createReview.mutate({
      incense_id: slug,
      year_purchased: yearPurchased,
    });
  };

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

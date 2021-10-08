import { NextPage } from "next";
import { useState } from "react";
import App from "components/App";
import Head from "next/head";
import Link from "next/link";
import Brands from "/lib/api/brands";
import { useMutation } from "react-query";
import { styles } from "/styles/Brands.module.css";

const BrandCreate: NextPage<{}> = () => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const createResult = useMutation(() => {
    return Brands.create({
      name: name,
      country: country,
      description: description,
      imageUrl: imageUrl,
    });
  });

  const submit = (event) => {
    event.preventDefault();
    console.log("success: ", event);
    createResult.mutate();
  };

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

  function createBrandBody() {
    if (createResult.isLoading) {
      return <div>Creating</div>;
    } else if (createResult.isError) {
      let error = createResult.error.body.error;
      let errorDetail = error.detail;

      return (
        <>
          <div>Error: {errorDetail}</div>
          {expandErrorReason(error.params)}
        </>
      );
    } else if (createResult.isSuccess) {
      let { data } = createResult;
      return (
        <div>
          <div>Success! {data.name} has been created</div>
          <div>
            See your new brand <Link href={`/brands/${data.slug}`}>Here</Link>
          </div>
        </div>
      );
    } else {
      return (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "500px",
          }}
          onSubmit={submit}
        >
          <label htmlFor="name">Brand Name</label>
          <input
            name="brand"
            onChange={({ target: { value } }) => setName(value)}
            type="text"
            disabled={createResult.isLoading}
            value={name}
          />
          <label htmlFor="country">Country</label>
          <input
            name="country"
            onChange={({ target: { value } }) => setCountry(value)}
            type="text"
            disabled={createResult.isLoading}
            value={country}
          />
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            onChange={({ target: { value } }) => setDescription(value)}
            type="text"
            disabled={createResult.isLoading}
            value={description}
          />
          <label htmlFor="imageUrl">Image</label>
          <input
            name="imageUrl"
            onChange={({ target: { value } }) => setImageUrl(value)}
            type="file"
            accept="img/*"
            disabled={createResult.isLoading}
          />
          <button type="submit" disabled={createResult.isLoading}>
            Create
          </button>
        </form>
      );
    }
  }

  return (
    <App>
      <Head>
        <title>IH::Brand:Create</title>
      </Head>
      <div className="pageTitle">Create a New Brand</div>
      <div className="centeredText">{createBrandBody()}</div>
    </App>
  );
};

export default BrandCreate;

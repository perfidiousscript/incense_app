import { NextPage } from "next";
import { useState } from "react";
import App from "components/App";
import Head from "next/head";
import Link from "next/link";
import Brands from "lib/api/brands";
import { MutationError, Brand } from "types";
import { useAuth } from "lib/auth";
import { useMutation } from "react-query";

const BrandCreate: NextPage<Record<string, never>> = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const createResult = useMutation<Brand, MutationError>(() => {
    return Brands.create({
      name: name,
      country: country,
      description: description,
      imageUrl: imageUrl,
    });
  });

  const submit = () => {
    createResult.mutate();
  };

  function invalidForm() {
    return (
      name.length === 0 || country.length === 0 || description.length === 0
    );
  }

  function expandErrorReason(errorParams: Record<string, string[]>) {
    let reasonHtml: JSX.Element[] = [];
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

  function userNotice() {
    if (user && user.role === "user") {
      return (
        <div>
          Please note that Brands must be approved by a moderator before they
          are visible. This may take 24-48 hours.
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  function createBrandBody() {
    if (createResult.isLoading) {
      return <div>Creating</div>;
    } else if (createResult.error) {
      const error = createResult.error.body?.error;
      const errorDetail = error.detail;

      return (
        <div className="centeredText">
          <div>Error: {errorDetail}</div>
          {expandErrorReason(error.params)}
        </div>
      );
    } else if (createResult.isSuccess) {
      const { data } = createResult;
      return (
        <div className="centeredText">
          <div>Success! {data.name} has been created</div>
          <div>
            See your new brand <Link href={`/brands/${data.slug}`}>Here</Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className="generalForm">
          {userNotice()}
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
            <button
              type="submit"
              disabled={invalidForm() || createResult.isLoading}
            >
              Create
            </button>
          </form>
        </div>
      );
    }
  }

  return (
    <App authCheck={true} title="Brand:Create">
      <div className="pageTitle">Create a New Brand</div>
      {createBrandBody()}
    </App>
  );
};

export default BrandCreate;

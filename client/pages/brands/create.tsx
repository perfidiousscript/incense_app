import { NextPage } from "next";
import { useState } from "react";
import App from "components/App";
import Head from "next/head";
import Link from "next/link";
import Incenses from "/lib/api/incenses";
import { useMutation } from "react-query";
import { styles } from "/styles/Brands.module.css";

const BrandCreate: NextPage<{}> = () => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const createResult = useMutation((event) => {});

  const submit = (event) => {
    event.preventDefault();
    console.log("succeess: ", event);
    // createBrand.mutate();
  };

  return (
    <App>
      <Head>
        <title>IH::Brand:Create</title>
      </Head>
      <div className="pageBody">
        <div className="pageTitle">Create a New Brand</div>
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
      </div>
    </App>
  );
};

export default BrandCreate;

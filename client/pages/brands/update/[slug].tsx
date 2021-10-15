import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import App from "components/App";
import Head from "next/head";
import Link from "next/link";
import Brands from "/lib/api/brands";
import { useAuth } from "lib/auth";
import { useMutation, useQuery } from "react-query";
import { styles } from "/styles/Brands.module.css";

const BrandUpdate: NextPage<{}> = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { isLoading, isError, data, error } = useQuery(
    ["brand", slug],
    Brands.get
  );

  useEffect(() => {
    if (data) {
      setName(data.name);
      setCountry(data.country);
      setDescription(data.description);
      setImageUrl(data.imageUrl);
    }
  }, [data]);

  const updateBrand = useMutation(() => {
    return Brands.update({
      name: name,
      country: country,
      description: description,
      imageUrl: imageUrl,
      slug: slug,
    });
  });

  const submit = (event) => {
    event.preventDefault();
    updateBrand.mutate();
  };

  function invalidForm() {
    return (
      name.length === 0 || country.length === 0 || description.length === 0
    );
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

  function createBrandBody() {
    if (updateBrand.isLoading) {
      return <div>Creating</div>;
    } else if (updateBrand.isError) {
      let error = updateBrand.error.body.error;
      let errorDetail = error.detail;

      return (
        <div className="centeredText">
          <div>Error: {errorDetail}</div>
          {expandErrorReason(error.params)}
        </div>
      );
    } else if (updateBrand.isSuccess) {
      let { data } = updateBrand;
      return (
        <div className="centeredText">
          <div>{data.name} has been sucessfully updated</div>
          <div>
            Return to <Link href={`/brands/${data.slug}`}>{data.name}</Link>
          </div>
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
            <label htmlFor="name">Brand Name</label>
            <input
              name="brand"
              onChange={({ target: { value } }) => setName(value)}
              type="text"
              disabled={updateBrand.isLoading}
              value={name}
            />
            <label htmlFor="country">Country</label>
            <input
              name="country"
              onChange={({ target: { value } }) => setCountry(value)}
              type="text"
              disabled={updateBrand.isLoading}
              value={country}
            />
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              onChange={({ target: { value } }) => setDescription(value)}
              type="text"
              disabled={updateBrand.isLoading}
              value={description}
            />
            <label htmlFor="imageUrl">Image</label>
            <input
              name="imageUrl"
              onChange={({ target: { value } }) => setImageUrl(value)}
              type="file"
              accept="img/*"
              disabled={updateBrand.isLoading}
            />
            <button
              type="submit"
              disabled={invalidForm() || updateBrand.isLoading}
            >
              Update
            </button>
          </form>
        </div>
      );
    }
  }

  return (
    <App authCheck={true} modOnly={true} title={"Brand:Update"}>
      <div className="pageTitle">Create a New Brand</div>
      {createBrandBody()}
    </App>
  );
};

export default BrandUpdate;

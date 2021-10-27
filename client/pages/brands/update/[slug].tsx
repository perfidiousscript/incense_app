import { NextPage } from "next";
import { useRouter } from "next/router";
import { BaseSyntheticEvent, useState, useEffect } from "react";
import App from "components/App";
import RequestWrapper from "components/RequestWrapper";
import Link from "next/link";
import Brands from "lib/api/brands";
import { QueryKeyObject, Brand, MutationError } from "types";
import { useMutation, useQuery } from "react-query";

const BrandUpdate: NextPage<Record<string, never>> = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  let slugString: string | undefined;

  if (typeof slug === "object") {
    slugString = slug[0];
  } else {
    slugString = slug;
  }

  const {
    isLoading,
    isError,
    data,
    error,
  }: {
    isLoading: boolean;
    isError: boolean;
    data: any;
    error: MutationError | null;
  } = useQuery(["brand", slug], Brands.get);

  const updateBrand = useMutation<Brand, MutationError>(() => {
    return Brands.update({
      name: name,
      country: country,
      description: description,
      imageUrl: imageUrl,
      slug: slugString,
    });
  });

  useEffect(() => {
    if (data) {
      setName(data.name);
      setCountry(data.country);
      setDescription(data.description);
      setImageUrl(data.imageUrl);
    }
  }, [data]);

  const submit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    updateBrand.mutate();
  };

  function invalidForm() {
    return (
      name.length === 0 || country.length === 0 || description.length === 0
    );
  }

  function createBrandBody() {
    if (data === undefined || isError) {
      return (
        <RequestWrapper isLoading={isLoading} isError={isError} error={error} />
      );
    } else if (updateBrand.isSuccess) {
      return (
        <div className="centeredText">
          <div>{updateBrand.data.name} has been sucessfully updated</div>
          <div>
            Return to{" "}
            <Link href={`/brands/${updateBrand.data.slug}`}>
              {updateBrand.data.name}
            </Link>
          </div>
        </div>
      );
    } else if (updateBrand.isIdle) {
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
            <button type="submit" disabled={invalidForm()}>
              Update
            </button>
          </form>
        </div>
      );
    } else {
      return (
        <RequestWrapper
          isLoading={updateBrand.isLoading}
          isError={updateBrand.isError}
          error={updateBrand.error}
        />
      );
    }
  }

  return (
    <App authCheck={true} modOnly={true} title={"Brand:Update"}>
      <div className="pageTitle">Update Brand {slugString}</div>
      {createBrandBody()}
    </App>
  );
};

export default BrandUpdate;

import { NextPageContext, NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import App from "components/App";
import Head from "next/head";
import Brands from "/lib/api/brands";
import { useAuth } from "lib/auth";
import { useQuery } from "react-query";

type InitialProps = {
  brand: Brand;
};

const BrandShow: NextPage<InitialProps> = ({ brand }) => {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, isError, data, error } = useQuery(
    ["brand", id],
    Brands.get
  );

  function showNewIncenseLink() {
    if (user) {
      return <Link href="/incenses/create">Create New Incense</Link>;
    }
  }

  function showUpdateButton() {
    return (
      <div>
        <Link href={`update/${data.slug}`}>Update Brand</Link>
      </div>
    );
  }

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error}</span>;
  }

  if (data) {
    return (
      <App title={`${data.name}`}>
        <div className="pageTitle">{data.name}</div>
        <div>{data.country}</div>
        <div>{data.imageUrl}</div>
        <div>{data.description}</div>
        {showUpdateButton()}
        {showNewIncenseLink()}
        <div>
          <p>Incenses</p>
        </div>
      </App>
    );
  }
};

export default BrandShow;

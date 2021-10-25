import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Request from "lib/request";
import App from "components/App";
import Brands from "lib/api/brands";
import { useAuth } from "lib/auth";
import { useQuery } from "react-query";
import { Brand, HttpMethod } from "types";
import Base from "lib/api/base";
import { GetStaticPropsResult, GetStaticProps } from "next";

const BrandShow = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { slug } = router.query;

  const { isLoading, isError, data, error } = useQuery(
    ["brand", slug],
    Brands.get
  );

  function showNewIncenseLink() {
    if (user) {
      return <Link href="/incenses/create">Create New Incense</Link>;
    } else {
      return <div></div>;
    }
  }

  function showUpdateButton() {
    if (data && user && user.role === ("moderator" || "admin")) {
      return (
        <div>
          <Link href={`update/${data.slug}`}>Update Brand</Link>
        </div>
      );
    } else {
      return <div></div>;
    }
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

// Work on getting static genereation in place at a later point.

// export const getStaticProps: GetStaticProps = async (context) => {
//   let slug = context?.params?.slug;
//   let data = Request.make({
//     method: HttpMethod.GET,
//     url: Base.url(`/brands/${slug}`),
//   }).then(({ body }) => Brand.parse(body));
//   return {
//     props: {
//       data,
//     },
//   };
// };

export default BrandShow;

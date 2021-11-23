import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Request from "lib/request";
import App from "components/App";
import Brands from "lib/api/brands";
import { useAuth } from "lib/auth";
import { useQuery } from "react-query";
import { Brand, HttpMethod, MutationError } from "types";
import Base from "lib/api/base";
import RequestWrapper from "components/RequestWrapper";
import { GetStaticPropsResult, GetStaticProps } from "next";
import styles from "styles/Brands.module.css";

const BrandShow = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { slug } = router.query;

  const { isLoading, isError, data, error } = useQuery<Brand, MutationError>(
    ["brand", slug] as const,
    Brands.get
  );

  function showNewIncenseLink() {
    if (user) {
      return (
        <div className="button">
          <Link href="/incenses/create">Add Incense</Link>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  function showUpdateButton() {
    if (data && user && user.role === ("moderator" || "admin")) {
      return (
        <div className="button">
          <Link href={`update/${data.slug}`}>Update Brand</Link>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  function displayImage(imageUrl: string | null) {
    if (imageUrl === (undefined || null)) {
      return <div>No Image</div>;
    } else {
      return <Image src={imageUrl} height={"300"} width={"300"} />;
    }
  }

  if (data) {
    return (
      <App title={`${data.name}`}>
        <div className="pageTitle">{data.name}</div>
        <div className={styles.brandImage}>{displayImage(data.imageUrl)}</div>
        <div className={styles.brandBox}>{data.country}</div>
        <div className={styles.brandBox}>{data.description}</div>
        {showUpdateButton()}
        {showNewIncenseLink()}
        <div>
          <p>Incenses</p>
        </div>
      </App>
    );
  } else {
    return (
      <RequestWrapper isLoading={isLoading} isError={isError} error={error} />
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

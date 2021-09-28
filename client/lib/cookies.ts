import { parseCookies, setCookie } from "nookies";
import next, { NextPageContext } from "next";

export async function getServerSideProps(ctx) {
  // Parse
  const cookies = nookies.get(ctx);

  // Set
  nookies.set(ctx, "fromGetInitialProps", "value", {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });

  return { cookies };
}

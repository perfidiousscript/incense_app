import nookies, { parseCookies, setCookie } from "nookies";
import next, { NextPageContext } from "next";


let nextPageContext: NextPageContext | null = null;

export const getCookies = (): string | undefined => {
  return nextPageContext?.req?.headers.cookie;
};

export async function getServerSideProps(ctx: NextPageContext) {
  // Parse
  const cookies = nookies.get(ctx);

  // Set
  nookies.set(ctx, "fromGetInitialProps", "value", {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
    domain: process.env.NEXT_PUBLIC_CLIENT_DOMAIN as string
  });

  return { cookies };
}

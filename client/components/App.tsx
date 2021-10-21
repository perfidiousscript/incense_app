import { FC } from "react";
import { ThemeProvider } from "styled-components";
import Head from "next/head";
import Theme from "styles/theme";
import Link from "next/link";
import Config from "lib/config";
import { useAuth } from "lib/auth";

const App: FC<{
  authCheck: boolean;
  modOnly: boolean;
  title: string;
}> = ({ children, authCheck, modOnly, title }) => {
  const { user } = useAuth();

  if (authCheck && !user) {
    return (
      <div className="centeredText">
        Please <Link href="/sign-in">Sign In</Link> or{" "}
        <Link href="/sign-up">Sign Up</Link> to continue.
      </div>
    );
  } else if (modOnly && user["role"] !== ("moderator" || "admin")) {
    // Push 404
  } else {
    return (
      <>
        <Head>
          <title>{`IH::${title}`}</title>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <ThemeProvider theme={Theme}>{children}</ThemeProvider>
      </>
    );
  }
};

export default App;

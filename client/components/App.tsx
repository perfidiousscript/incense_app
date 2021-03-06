import { FC } from "react";
import { ThemeProvider } from "styled-components";
import Head from "next/head";
import Theme from "styles/theme";
import Link from "next/link";
import Config from "lib/config";
import { useAuth } from "lib/auth";

const App: FC<{
  children?: JSX.Element[];
  authCheck?: boolean;
  modOnly?: boolean;
  title: string;
}> = ({ children, authCheck = false, modOnly = false, title }) => {
  const { user } = useAuth();

  if (authCheck && !user) {
    return (
      <div className="centeredText">
        Please <Link href="/sign-in">Sign In</Link> or{" "}
        <Link href="/sign-up">Sign Up</Link> to continue.
      </div>
    );
  } else if (modOnly && user?.role !== ("moderator" || "admin")) {
    //Improve this to push a 404
    return <div>You must be a moderator to view this page</div>;
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

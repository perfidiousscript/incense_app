import { FC } from "react";
import { ThemeProvider } from "styled-components";

import Theme from "styles/theme";
import Link from "next/link";
import Config from "lib/config";
import { useAuth } from "lib/auth";

const App: FC<{}> = ({ children, authCheck }) => {
  const { user } = useAuth();

  if (authCheck && !user) {
    return (
      <div className="centeredText">
        Please <Link href="/sign-in">Sign In</Link> or{" "}
        <Link href="sign-up">Sign Up</Link> to continue.
      </div>
    );
  } else {
    return <ThemeProvider theme={Theme}>{children}</ThemeProvider>;
  }
};

export default App;

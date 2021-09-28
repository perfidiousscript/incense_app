import { FC } from "react";
import { ThemeProvider } from "styled-components";

import Theme from "styles/theme";
import Nav from "components/Nav";
import Config from "lib/config";

const App: FC<{}> = ({ children }) => {
  return (
    <ThemeProvider theme={Theme}>
      // <Nav />
      {children}
    </ThemeProvider>
  );
};

export default App;

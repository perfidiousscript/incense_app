import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "components/Nav";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "lib/auth";

const queryClient = new QueryClient();

export const App = ({ Component, pageProps }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Nav />
          <div className="container">
            <Component {...pageProps} />
          </div>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};
export default App;

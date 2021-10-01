import App from "components/App";
import { useState } from "react";
import Head from "next/head";
import Router from "next/router";
import Link from "next/link";
import { useMutation } from "react-query";
import { useAuth } from "lib/auth";

const Signin: NextPage<{}> = () => {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = useMutation((event) => {
    event.preventDefault();
    login({ email: email, password: password });
  });

  if (user) {
    return <div>Already logged in!</div>;
  } else if (signIn.isIdle || signIn.isSuccess) {
    return (
      <App>
        <Head>
          <title>IH::Signin</title>
        </Head>
        {signIn.isError ? <div>{signIn.error}</div> : null}
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "500px",
          }}
          onSubmit={signIn.mutate}
        >
          <label htmlFor="email">Email</label>
          <input
            name="email"
            onChange={({ target: { value } }) => setEmail(value)}
            type="text"
            disabled={signIn.isLoading}
            value={email}
          />
          <label htmlFor="password">Password</label>
          <input
            name="password"
            onChange={({ target: { value } }) => setPassword(value)}
            type="password"
            disabled={signIn.isLoading}
            value={password}
          />
          <button type="submit" disabled={signIn.isLoading}>
            Sign In
          </button>
        </form>
        <Link href={`/signup`}>
          <p>Sign Up</p>
        </Link>
      </App>
    );
  } else if (signIn.isLoading) {
    return <div>Loading</div>;
  }
};
export default Signin;

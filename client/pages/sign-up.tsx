import App from "components/App";
import { useState } from "react";
import Head from "next/head";
import Router from "next/router";
import Link from "next/link";
import { useMutation } from "react-query";
import { useAuth } from "lib/auth";

const SignUp: NextPage<{}> = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const signUp = useMutation((event) => {
    event.preventDefault();
    return register({ email: email, username: userName, password: password });
  });

  function signUpError() {
    if (signUp.isError) {
      let errorDetail = signUp.error.body.error.detail;
      return <div>Error:{errorDetail}</div>;
    }
  }

  if (signUp.isSuccess) {
    return (
      <div className="pageBody">
        <div>Success! Check your e-mail!</div>
      </div>
    );
  } else if (signUp.isIdle || signUp.isError) {
    return (
      <App>
        <Head>
          <title>IH::SignUp</title>
        </Head>
        <div className="pageBody">
          {signUpError()}
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "500px",
            }}
            onSubmit={signUp.mutate}
          >
            <label htmlFor="email">Email</label>
            <input
              name="email"
              onChange={({ target: { value } }) => setEmail(value)}
              type="text"
              disabled={signUp.isLoading}
              value={email}
            />
            <label htmlFor="username">User Name</label>
            <input
              name="username"
              onChange={({ target: { value } }) => setUserName(value)}
              type="text"
              disabled={signUp.isLoading}
              value={userName}
            />
            <label htmlFor="password">Password</label>
            <input
              name="password"
              onChange={({ target: { value } }) => setPassword(value)}
              type="password"
              disabled={signUp.isLoading}
              value={password}
            />
            <button type="submit" disabled={signUp.isLoading}>
              Sign In
            </button>
          </form>
        </div>
      </App>
    );
  } else if (signUp.isLoading) {
    return <div>Loading</div>;
  }
};
export default SignUp;

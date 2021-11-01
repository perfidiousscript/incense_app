import App from "components/App";
import type { NextPage } from "next";
import { BaseSyntheticEvent, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import RequestWrapper from "components/RequestWrapper";
import { User, MutationError } from "types";
import { useMutation } from "react-query";
import { useAuth } from "lib/auth";

const SignIn: NextPage<Record<string, never>> = () => {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = useMutation<User, MutationError>(() => {
    return login({ email: email, password: password });
  });

  function submit(event: BaseSyntheticEvent) {
    event.preventDefault();
    signIn.mutate();
  }

  if (signIn.isSuccess && user) {
    return <div>Welcome {user.username}!</div>;
  } else if (user) {
    return <div>Already logged in!</div>;
  } else {
    return (
      <App title={"Sign In"}>
        <div className="pageTitle">Sign In</div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "500px",
          }}
          onSubmit={submit}
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
        <RequestWrapper
          isLoading={signIn.isLoading}
          isError={signIn.isError}
          error={signIn.error}
        />
        <div>
          <p>
            Don't have an account? <Link href="/sign-up">Sign Up Here!</Link>
          </p>
        </div>
      </App>
    );
  }
};

export default SignIn;

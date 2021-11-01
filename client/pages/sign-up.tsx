import App from "components/App";
import type { NextPage } from "next";
import { useState, BaseSyntheticEvent } from "react";
import Head from "next/head";
import { useMutation } from "react-query";
import { useAuth } from "lib/auth";
import RequestWrapper from "components/RequestWrapper";
import { User, MutationError } from "types";

const SignUp: NextPage<Record<string, never>> = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const signUp = useMutation<User, MutationError>(() => {
    return register({ email: email, username: userName, password: password });
  });

  function submit(event: BaseSyntheticEvent) {
    event.preventDefault();
    signUp.mutate();
  }

  if (signUp.isSuccess) {
    return <div>Success! Check your e-mail!</div>;
  } else {
    return (
      <App title={"SignUp"}>
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
        <RequestWrapper
          isLoading={signUp.isLoading}
          isError={signUp.isError}
          error={signUp.error}
        />
      </App>
    );
  }
};
export default SignUp;

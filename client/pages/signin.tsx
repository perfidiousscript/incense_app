import App from "components/App";
import { useState } from "react";
import Head from "next/head";
import Router from "next/router";
import Link from "next/link";
import { useMutation } from "react-query";
import User from "/lib/api/user";

const Signin: NextPage<{}> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation((event) => {
    User.loginFn({ email: email, password: password });
  });

  return (
    <App>
      <Head>
        <title>IH::Signin</title>
      </Head>

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "500px",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate();
        }}
      >
        <label htmlFor="email">Email</label>
        <input
          name="email"
          onChange={({ target: { value } }) => setEmail(value)}
          type="text"
          disabled={false}
          value={email}
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          onChange={({ target: { value } }) => setPassword(value)}
          type="password"
          disabled={false}
          value={password}
        />
        <button type="submit" disabled={false}>
          Signin
        </button>
      </form>

      <Link href={`/signup`}>
        <p>Sign Up</p>
      </Link>
    </App>
  );
};

export default Signin;

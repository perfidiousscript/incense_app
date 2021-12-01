import App from "components/App";
import type { NextPage } from "next";
import { useEffect, useState, BaseSyntheticEvent } from "react";
import Head from "next/head";
import { useMutation } from "react-query";
import { useAuth } from "lib/auth";
import RequestWrapper from "components/RequestWrapper";
import { User, MutationError } from "types";
import styles from "styles/SignUp.module.css";

const SignUp: NextPage<Record<string, never>> = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [userNameValid, setUserNameValid] = useState(false);
  const [userNameError, setUserNameError] = useState("");

  const signUp = useMutation<User, MutationError>(() => {
    return register({ email: email, username: userName, password: password });
  });

  function submit(event: BaseSyntheticEvent) {
    event.preventDefault();
    signUp.mutate();
  }

  useEffect(() => {
    if (password.length < 6) {
      setPasswordValid(false);
      setPasswordError("Password must be more than 6 characters");
    } else if (password === userName) {
      setPasswordValid(false);
      setPasswordError("Password cannot be the same as username");
    } else {
      setPasswordValid(true);
    }
  }, [password]);

  useEffect(() => {
    if (userName.length < 4) {
      setUserNameValid(false);
      setUserNameError("Username must be more than 4 characters");
    }
    if (userName.match(/\s/)) {
      setUserNameValid(false);
      setUserNameError("Username cannot contain whitespace");
    } else {
      setUserNameValid(true);
    }
  }, [userName]);

  useEffect(() => {
    if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
      setEmailError("Please enter a valid e-mail address");
    }
  }, [email]);

  function validForm() {
    return !userNameValid || !passwordValid || !emailValid;
  }

  function showEmailError() {
    if (!emailValid) {
      return <div className={styles.password_error}>Error: {emailError}</div>;
    }
  }

  function showPasswordError() {
    if (!passwordValid) {
      return (
        <div className={styles.password_error}>Error: {passwordError}</div>
      );
    }
  }

  function showUserNameError() {
    if (!userNameValid) {
      return (
        <div className={styles.password_error}>Error: {userNameError}</div>
      );
    }
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
          {showEmailError()}
          <label htmlFor="username">User Name</label>
          <input
            name="username"
            onChange={({ target: { value } }) => setUserName(value)}
            type="text"
            disabled={signUp.isLoading}
            value={userName}
          />
          {showUserNameError()}
          <label htmlFor="password">Password</label>
          <input
            name="password"
            onChange={({ target: { value } }) => setPassword(value)}
            type="password"
            disabled={signUp.isLoading}
            value={password}
          />
          {showPasswordError()}
          <button type="submit" disabled={validForm()}>
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
